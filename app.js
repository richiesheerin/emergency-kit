"use strict";

const $ = (s, el = document) => el.querySelector(s);
const view = $("#view");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const byId = Object.fromEntries(GUIDES.map((g) => [g.id, g]));
const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

// ---------- storage (may be unavailable in private mode) ----------
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
};

// ---------- screen wake lock ----------
let wakeLock = null;
async function keepAwake(on) {
  try {
    if (on && "wakeLock" in navigator && !wakeLock) wakeLock = await navigator.wakeLock.request("screen");
    if (!on && wakeLock) { await wakeLock.release(); wakeLock = null; }
  } catch { /* not supported */ }
}

// ---------- audio ----------
let audioCtx = null;
function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function beep(ms, freq = 3000, vol = 1) {
  const c = ctx(), o = c.createOscillator(), g = c.createGain();
  o.type = "square"; o.frequency.value = freq;
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.setValueAtTime(vol, c.currentTime + ms / 1000 - 0.01);
  g.gain.linearRampToValueAtTime(0, c.currentTime + ms / 1000);
  o.connect(g).connect(c.destination);
  o.start(); o.stop(c.currentTime + ms / 1000 + 0.02);
}

// ---------- torch ----------
let torchTrack = null;
async function getTorch() {
  if (torchTrack) return torchTrack;
  try {
    const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } });
    const t = s.getVideoTracks()[0];
    const caps = t.getCapabilities ? t.getCapabilities() : {};
    if (!caps.torch) { t.stop(); return null; }
    torchTrack = t;
    return t;
  } catch { return null; }
}
async function setTorch(on) {
  if (!torchTrack) return;
  try { await torchTrack.applyConstraints({ advanced: [{ torch: on }] }); } catch { /* ignore */ }
}
function releaseTorch() {
  if (torchTrack) { setTorch(false); torchTrack.stop(); torchTrack = null; }
}

// ---------- signalling (Morse) ----------
function morseTimeline(text) {
  // returns [[on:boolean, units], ...]
  const out = [];
  const words = text.toUpperCase().trim().split(/\s+/).filter(Boolean);
  words.forEach((w, wi) => {
    [...w].forEach((ch, ci) => {
      const code = MORSE[ch];
      if (!code) return;
      [...code].forEach((sym, si) => {
        out.push([true, sym === "." ? 1 : 3]);
        if (si < code.length - 1) out.push([false, 1]);
      });
      if (ci < w.length - 1) out.push([false, 3]);
    });
    out.push([false, 7]);
  });
  return out;
}

const signal = { running: false, timer: null, mode: null };
async function startSignal(mode, text) {
  stopSignal();
  const timeline = morseTimeline(text || "SOS");
  if (!timeline.length) return alert("Nothing to send: use letters and numbers only.");
  const unit = mode === "sound" ? 150 : 250;
  if (mode === "torch") {
    const t = await getTorch();
    if (!t) {
      alert("This phone's browser can't control the torch (iPhones can't). Using a screen flash instead. Turn brightness up.");
      mode = "screen";
    }
  }
  if (mode === "sound") ctx();
  signal.running = true; signal.mode = mode;
  keepAwake(true);
  const flash = $("#flash");
  if (mode === "screen") { $("#flash-text").textContent = text.toUpperCase(); flash.hidden = false; }
  updateSignalButtons();
  let i = 0;
  const step = () => {
    if (!signal.running) return;
    const [on, units] = timeline[i];
    const ms = units * unit;
    if (mode === "torch") setTorch(on);
    else if (mode === "screen") flash.classList.toggle("lit", on);
    else if (mode === "sound" && on) beep(ms);
    i = (i + 1) % timeline.length;
    signal.timer = setTimeout(step, ms);
  };
  step();
}
function stopSignal() {
  signal.running = false;
  clearTimeout(signal.timer);
  if (signal.mode === "torch") setTorch(false);
  const flash = $("#flash");
  flash.hidden = true; flash.classList.remove("lit");
  signal.mode = null;
  keepAwake(false);
  updateSignalButtons();
}
function updateSignalButtons() {
  document.querySelectorAll("[data-signal]").forEach((b) => {
    const on = signal.running && signal.mode === b.dataset.signal;
    b.classList.toggle("on", on);
    b.textContent = on ? "Stop" : b.dataset.label;
  });
}
$("#flash").addEventListener("click", stopSignal);

// plain torch on/off
let torchOn = false;
async function toggleTorch(btn) {
  if (!torchOn) {
    const t = await getTorch();
    if (!t) return alert("This browser can't control the torch. Use your phone's built-in torch, or the screen flash.");
    await setTorch(true); torchOn = true;
  } else { await setTorch(false); torchOn = false; }
  btn.classList.toggle("on", torchOn);
  btn.textContent = torchOn ? "Torch off" : "Torch on";
}

// ---------- CPR metronome ----------
const metro = { timer: null, count: 0, start: 0, pause: 0, clock: null };
function startMetronome() {
  ctx(); keepAwake(true);
  $("#metro").hidden = false;
  metro.count = 0; metro.pause = 0; metro.start = Date.now();
  const countEl = $("#metro-count"), prompt = $("#metro-prompt");
  prompt.innerHTML = "&nbsp;";
  metro.clock = setInterval(() => {
    const s = Math.floor((Date.now() - metro.start) / 1000);
    $("#metro-time").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    if (s > 0 && s % 120 === 0) prompt.textContent = "2 minutes: swap rescuer if you can";
  }, 1000);
  const tick = () => {
    if (metro.pause > 0) {
      metro.pause--;
      if (metro.pause === 0) prompt.innerHTML = "&nbsp;";
    } else {
      metro.count++;
      countEl.textContent = metro.count;
      countEl.classList.add("beat"); setTimeout(() => countEl.classList.remove("beat"), 120);
      beep(60, 1200, 0.6);
      if (metro.count === 30) {
        metro.count = 0;
        if (!$("#metro-handsonly").checked) {
          prompt.textContent = "Give 2 breaths";
          metro.pause = 9; // ~5 s
          beep(300, 600, 0.6);
        }
      }
    }
  };
  metro.timer = setInterval(tick, 60000 / 110);
}
function stopMetronome() {
  clearInterval(metro.timer); clearInterval(metro.clock);
  $("#metro").hidden = true; keepAwake(false);
}
$("#metro-stop").addEventListener("click", stopMetronome);

// ---------- location ----------
function dms(v, pos, neg) {
  const h = v >= 0 ? pos : neg; v = Math.abs(v);
  const d = Math.floor(v), mf = (v - d) * 60, m = Math.floor(mf), s = ((mf - m) * 60).toFixed(1);
  return `${d}°${m}'${s}"${h}`;
}
let lastFix = null;
function locate() {
  const out = $("#loc-out");
  if (!("geolocation" in navigator)) { out.textContent = "Location isn't available on this device."; return; }
  out.innerHTML = "<p>Getting GPS fix… (can take a minute outdoors, works without signal)</p>";
  navigator.geolocation.getCurrentPosition((p) => {
    const { latitude: la, longitude: lo, accuracy: acc, altitude: alt } = p.coords;
    lastFix = { la, lo, acc, alt, t: new Date() };
    renderFix();
  }, (e) => {
    out.innerHTML = `<p class="warn">Couldn't get a location (${esc(e.message)}). Turn on Location/GPS for your browser, go outside with a clear view of the sky, and try again.</p>`;
  }, { enableHighAccuracy: true, timeout: 60000, maximumAge: 0 });
}
function fixMessage() {
  const f = lastFix, me = store.get("medical", {});
  const who = me.name ? ` This is ${me.name}.` : "";
  return `EMERGENCY: I need help.${who} My location: ${f.la.toFixed(5)}, ${f.lo.toFixed(5)} (±${Math.round(f.acc)} m) at ${f.t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}. https://maps.google.com/?q=${f.la.toFixed(5)},${f.lo.toFixed(5)}`;
}
function renderFix() {
  const f = lastFix, msg = fixMessage();
  $("#loc-out").innerHTML = `
    <div class="coords">${f.la.toFixed(5)}, ${f.lo.toFixed(5)}</div>
    <div>${dms(f.la, "N", "S")} &nbsp; ${dms(f.lo, "E", "W")}</div>
    <div class="small">Accuracy ±${Math.round(f.acc)} m${f.alt != null ? ` · Altitude ${Math.round(f.alt)} m` : ""} · ${f.t.toLocaleTimeString()}</div>
    <div class="row" style="margin-top:10px">
      <a class="btn red" href="sms:112?&body=${encodeURIComponent(msg)}">Text 112</a>
      <a class="btn" href="sms:?&body=${encodeURIComponent(msg)}">Text a contact</a>
      <button class="btn" id="loc-copy">Copy</button>
    </div>
    <p class="small">Read the numbers out slowly to the call-taker. Texting 112/999 may need prior registration in some countries; if it fails, call.</p>`;
  $("#loc-copy").onclick = async () => {
    try { await navigator.clipboard.writeText(msg); $("#loc-copy").textContent = "Copied"; }
    catch { prompt("Copy this:", msg); }
  };
}

// ---------- views ----------
function setTab(name) {
  document.querySelectorAll(".tabs a").forEach((a) => a.classList.toggle("active", a.dataset.tab === name));
}

function homeView() {
  setTab("home");
  const me = store.get("medical", {});
  return `
  <a class="call" href="tel:112">Call 112<small>Emergency, works on any network. 999 / 911 also work in their regions.</small></a>
  <div class="urgent">
    <a href="#g/cpr">Not breathing → CPR</a>
    <a href="#g/bleeding">Severe bleeding</a>
    <a href="#g/choking">Choking</a>
    <a href="#tools">SOS signal &amp; my location</a>
  </div>
  <div class="cards">
    ${CATEGORIES.map((c) => `<a class="card" href="#cat/${c.id}"><b>${c.title}</b><span>${c.blurb}</span></a>`).join("")}
    <a class="card" href="#g/primary"><b>First on scene?</b><span>Start here: Danger, Response, Send for help…</span></a>
    <a class="card" href="#me"><b>${me.name ? esc(me.name) + "'s medical info" : "My medical info"}</b><span>${me.name ? "Show to paramedics" : "Add blood group, allergies, ICE contact"}</span></a>
  </div>
  <h3>Emergency numbers</h3>
  <table>${NUMBERS.map(([w, n]) => `<tr><td>${w}</td><td><b>${n}</b></td></tr>`).join("")}</table>
  <p class="footer">Everything here works without signal once the app has loaded once. It's a reference, not a replacement for a first aid course. When in doubt, call for help. Based on Red Cross, European Resuscitation Council, WHO and CDC guidance. <span id="app-version"></span></p>`;
}

function guidesView() {
  setTab("guides");
  return `<h2>Guides</h2>` + CATEGORIES.map((c) => `
    <h3>${c.title}</h3>
    <div class="list">${GUIDES.filter((g) => g.cat === c.id).map((g) => `<a href="#g/${g.id}">${g.title}</a>`).join("")}</div>`).join("");
}

function catView(id) {
  const c = catById[id]; if (!c) return homeView();
  setTab("guides");
  return `<div class="crumb"><a href="#guides">Guides</a></div><h2>${c.title}</h2>
    ${id === "field" ? `<p class="small">Adapted from the US Army survival manuals FM 21-76 and FM 3-05.70 (public domain). For injuries, use the <a href="#cat/aid">First aid</a> section: the manual's medical advice is out of date.</p>${pdfPanel()}` : ""}
    <div class="list">${GUIDES.filter((g) => g.cat === id).map((g) => `<a href="#g/${g.id}">${g.title}</a>`).join("")}</div>`;
}

// ---------- your own PDF, stored on the phone (IndexedDB) ----------
const pdfDb = () => new Promise((res, rej) => {
  const r = indexedDB.open("emergency-kit", 1);
  r.onupgradeneeded = () => r.result.createObjectStore("files");
  r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
});
async function pdfOp(mode, fn) {
  const db = await pdfDb();
  return new Promise((res, rej) => {
    const tx = db.transaction("files", mode), req = fn(tx.objectStore("files"));
    tx.oncomplete = () => res(req && req.result); tx.onerror = () => rej(tx.error);
  });
}
const pdfGet = () => pdfOp("readonly", (s) => s.get("manual")).catch(() => null);
const pdfPut = (file) => pdfOp("readwrite", (s) => s.put({ name: file.name, size: file.size, blob: file }, "manual"));
const pdfDel = () => pdfOp("readwrite", (s) => s.delete("manual"));

function pdfPanel() {
  return `<div class="panel" id="pdf-panel">
    <h3>Full manual (PDF)</h3>
    <div id="pdf-status" class="small">Checking…</div>
    <div class="row" id="pdf-actions"></div>
    <label class="btn" style="width:100%">Choose PDF from your phone…
      <input type="file" id="pdf-file" accept="application/pdf,.pdf" hidden></label>
    <p class="small">Download FM 3-05.70 or FM 21-76 once while you have signal (search “FM 3-05.70 pdf”), then choose it here. It's kept inside this app on your phone so it opens with no signal.</p>
  </div>`;
}
async function wirePdf() {
  const st = $("#pdf-status"); if (!st) return;
  const acts = $("#pdf-actions");
  const rec = await pdfGet();
  if (rec) {
    st.innerHTML = `Saved: <b>${esc(rec.name)}</b> (${(rec.size / 1048576).toFixed(1)} MB)`;
    acts.innerHTML = `<button class="btn red" id="pdf-open">Open manual</button><button class="btn" id="pdf-del">Remove</button>`;
    $("#pdf-open").onclick = () => {
      const url = URL.createObjectURL(rec.blob);
      const w = window.open(url, "_blank");
      if (!w) { const a = document.createElement("a"); a.href = url; a.download = rec.name; a.click(); }
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    };
    $("#pdf-del").onclick = async () => { if (confirm("Remove the saved manual?")) { await pdfDel(); wirePdf(); } };
  } else {
    st.textContent = "No PDF saved yet.";
    acts.innerHTML = "";
  }
  $("#pdf-file").onchange = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    st.textContent = "Saving…";
    try {
      await pdfPut(f);
      if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
    } catch { alert("Couldn't save the PDF (storage full or private browsing?)."); }
    wirePdf();
  };
}

function diagramsHtml(id) {
  const list = (typeof DIAGRAMS !== "undefined" && DIAGRAMS[id]) || [];
  return list.map((d) => `<figure class="diagram">
      <a class="zoom" href="${d.file}" target="_blank" rel="noopener" aria-label="Open full-size diagram">
        <img src="${d.file}" alt="${esc(d.alt)}" loading="lazy"></a>
      <figcaption>${esc(d.caption || "")}<span class="small credit">Tap to enlarge · Diagram: ${esc(d.author)},
        <a href="${d.licenceUrl}" target="_blank" rel="noopener">${esc(d.licence)}</a>, via
        <a href="${d.source}" target="_blank" rel="noopener">Wikimedia Commons</a>${d.changes ? ` (${esc(d.changes.replace(/\.$/, "").toLowerCase())})` : ""}</span></figcaption>
    </figure>`).join("");
}

function guideView(id) {
  const g = byId[id]; if (!g) return homeView();
  setTab("guides");
  const sibs = GUIDES.filter((x) => x.cat === g.cat), i = sibs.indexOf(g), next = sibs[i + 1];
  return `<div class="crumb"><a href="#cat/${g.cat}">${catById[g.cat].title}</a></div>
    <h2>${g.title}</h2>${diagramsHtml(g.id)}${g.body}
    <div class="panel ask" id="ask-ai" data-guide="${g.id}">
      <h3>Ask AI about this</h3>
      <p class="small">Sends this guide plus your question to your offline AI app (e.g. PocketPal), so it answers from this checked text instead of from memory.</p>
      <textarea class="f" id="ask-q" placeholder="Your question (optional), e.g. “What if they're a child?”"></textarea>
      <div class="row" style="margin-top:8px">
        ${navigator.share ? `<button class="btn red" id="ask-share">Share to AI app</button>` : ""}
        <button class="btn${navigator.share ? "" : " red"}" id="ask-copy">Copy for AI</button>
      </div>
      <p class="small" id="ask-msg"></p>
    </div>
    ${next ? `<a class="card" style="margin-top:20px" href="#g/${next.id}"><span>Next</span><b>${next.title}</b></a>` : ""}`;
}

function toolsView() {
  setTab("tools");
  return `<h2>SOS tools</h2>
  <div class="panel">
    <h3>Flash or sound SOS</h3>
    <p class="small">Repeats <span class="mono">··· ––– ···</span> until you stop it. The torch works on Android (Chrome). iPhones use a full-screen flash instead.</p>
    <div class="row">
      <button class="btn red" data-signal="torch" data-label="SOS torch">SOS torch</button>
      <button class="btn" data-signal="screen" data-label="SOS screen">SOS screen</button>
      <button class="btn" data-signal="sound" data-label="SOS whistle">SOS whistle</button>
    </div>
    <div class="row"><button class="btn" id="torch-toggle">Torch on</button></div>
  </div>
  <div class="panel">
    <h3>My location</h3>
    <p class="small">GPS works with no phone signal. Get your coordinates to read out or text.</p>
    <button class="btn big" id="loc-btn">Get my coordinates</button>
    <div id="loc-out"></div>
  </div>
  <div class="panel">
    <h3>CPR metronome</h3>
    <p class="small">Beeps at 110 per minute and counts to 30.</p>
    <button class="btn big red" id="cpr-btn">Start CPR metronome</button>
  </div>
  <div class="panel">
    <h3>Send a message in Morse</h3>
    <input class="f" id="morse-text" value="SOS" maxlength="40" aria-label="Message">
    <div id="morse-preview" class="mono small" style="margin:8px 0"></div>
    <div class="row">
      <button class="btn" data-signal="torch" data-label="Torch" data-custom>Torch</button>
      <button class="btn" data-signal="screen" data-label="Screen" data-custom>Screen</button>
      <button class="btn" data-signal="sound" data-label="Sound" data-custom>Sound</button>
    </div>
  </div>
  <p><a href="#g/signals">Rescue signals: ground-to-air, whistle, mirror →</a></p>
  <p><a href="#g/phone">Make your phone last &amp; get through →</a></p>`;
}

const MED_FIELDS = [
  ["name", "Name"], ["dob", "Date of birth"], ["blood", "Blood group"], ["allergies", "Allergies"],
  ["conditions", "Medical conditions"], ["meds", "Medications"],
  ["ice1", "Emergency contact 1 (name)"], ["ice1tel", "Contact 1 phone"],
  ["ice2", "Emergency contact 2 (name)"], ["ice2tel", "Contact 2 phone"], ["notes", "Other notes (organ donor, implants, etc.)"],
];
function meView() {
  setTab("me");
  const m = store.get("medical", {});
  const has = Object.values(m).some(Boolean);
  const card = has ? `<div class="panel medcard"><h3>Medical information</h3><dl>
    ${MED_FIELDS.filter(([k]) => m[k] && !k.endsWith("tel")).map(([k, l]) => {
      const tel = m[k + "tel"];
      return `<dt>${esc(l.replace(" (name)", ""))}</dt><dd>${esc(m[k])}${tel ? ` · <a href="tel:${esc(tel.replace(/[^\d+]/g, ""))}">${esc(tel)}</a>` : ""}</dd>`;
    }).join("")}</dl></div>` : "";
  return `<h2>My info</h2>${card}
  <div class="panel">
    <h3>${has ? "Edit" : "Add your details"}</h3>
    <p class="small">Saved only on this phone, never uploaded. Also set up your phone's built-in Medical ID (iPhone) or Emergency information (Android). Those show on the lock screen.</p>
    <form id="med-form">
      ${MED_FIELDS.map(([k, l]) => `<label class="f" for="m-${k}">${l}</label>
        ${k === "notes" || k === "conditions" || k === "meds"
          ? `<textarea class="f" id="m-${k}" name="${k}">${esc(m[k])}</textarea>`
          : `<input class="f" id="m-${k}" name="${k}" value="${esc(m[k])}" ${k.endsWith("tel") ? 'type="tel"' : ""}>`}`).join("")}
      <button class="btn big red" style="margin-top:14px" type="submit">Save</button>
    </form>
  </div>`;
}

function searchView(q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const text = (g) => (g.title + " " + g.tags + " " + g.body.replace(/<[^>]+>/g, " ")).toLowerCase();
  const scored = GUIDES.map((g) => {
    const t = text(g), title = (g.title + " " + g.tags).toLowerCase();
    if (!terms.every((w) => t.includes(w))) return null;
    return [g, terms.reduce((s, w) => s + (title.includes(w) ? 3 : 1), 0)];
  }).filter(Boolean).sort((a, b) => b[1] - a[1]);
  return `<h2>Results for “${esc(q)}”</h2>` + (scored.length
    ? `<div class="list">${scored.map(([g]) => `<a href="#g/${g.id}"><span>${g.title} <span class="small">· ${catById[g.cat].title}</span></span></a>`).join("")}</div>`
    : `<p>No matches. Try a simpler word.</p>`);
}

function render() {
  const h = decodeURIComponent(location.hash.slice(1)) || "home";
  const [route, arg] = h.split("/");
  let html;
  if (route === "g") html = guideView(arg);
  else if (route === "cat") html = catView(arg);
  else if (route === "guides") html = guidesView();
  else if (route === "tools") html = toolsView();
  else if (route === "me") html = meView();
  else html = homeView();
  view.innerHTML = html;
  window.scrollTo(0, 0);
  wire();
}

function wire() {
  const mt = $("#morse-table");
  if (mt) mt.innerHTML = Object.entries(MORSE).map(([k, v]) => `<div><b>${k}</b><span class="mono">${v.replace(/\./g, "·").replace(/-/g, "–")}</span></div>`).join("");

  document.querySelectorAll("[data-signal]").forEach((b) => {
    b.onclick = () => {
      if (signal.running && signal.mode === b.dataset.signal) return stopSignal();
      const text = b.hasAttribute("data-custom") ? $("#morse-text").value : "SOS";
      startSignal(b.dataset.signal, text);
    };
  });
  updateSignalButtons();

  const mtext = $("#morse-text");
  if (mtext) {
    const upd = () => { $("#morse-preview").textContent = mtext.value.toUpperCase().split("").map((c) => MORSE[c] ? MORSE[c].replace(/\./g, "·").replace(/-/g, "–") : (c === " " ? "/" : "")).join(" "); };
    mtext.oninput = upd; upd();
  }
  const tt = $("#torch-toggle"); if (tt) { tt.onclick = () => toggleTorch(tt); tt.classList.toggle("on", torchOn); tt.textContent = torchOn ? "Torch off" : "Torch on"; }
  const lb = $("#loc-btn"); if (lb) { lb.onclick = locate; if (lastFix) renderFix(); }
  const cb = $("#cpr-btn"); if (cb) cb.onclick = startMetronome;

  wirePdf();
  wireAsk();
  showVersion();

  const form = $("#med-form");
  if (form) form.onsubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    for (const k in data) data[k] = data[k].trim();
    if (!store.set("medical", data)) alert("Couldn't save (private browsing?).");
    render();
  };
}

// ---------- Ask AI: hand a guide to an offline AI app ----------
function guideText(g) {
  const root = document.createElement("div");
  root.innerHTML = g.body;
  root.querySelectorAll("a.btn, #morse-table").forEach((el) => el.remove());
  const out = [];
  const walk = (el) => {
    for (const n of el.childNodes) {
      if (n.nodeType === 3) { const t = n.textContent.replace(/\s+/g, " "); if (t.trim()) out.push(t); continue; }
      if (n.nodeType !== 1) continue;
      const tag = n.tagName;
      if (tag === "H3") { out.push(`\n\n${n.textContent.trim().toUpperCase()}\n`); continue; }
      if (tag === "LI") {
        const parent = n.parentElement, idx = [...parent.children].indexOf(n) + 1;
        out.push(`\n${parent.tagName === "OL" ? idx + "." : "-"} `); walk(n); continue;
      }
      if (tag === "TR") { out.push("\n- " + [...n.children].map((c) => c.textContent.trim()).join(" | ")); continue; }
      if (["P", "DIV", "UL", "OL", "TABLE"].includes(tag)) { out.push("\n"); walk(n); out.push("\n"); continue; }
      walk(n);
    }
  };
  walk(root);
  return out.join("").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").replace(/^ +/gm, "").trim();
}
function askPrompt(g, q) {
  return [
    "Answer using ONLY the emergency guide below. Give short numbered steps. If the guide doesn't cover the question, say so and give the safest option. If life is at risk, start with: call 112.",
    "",
    `QUESTION: ${q || "Summarise the key steps from this guide."}`,
    "",
    `GUIDE: ${g.title}`,
    guideText(g),
  ].join("\n");
}
function wireAsk() {
  const box = $("#ask-ai"); if (!box) return;
  const g = byId[box.dataset.guide], msg = $("#ask-msg");
  const text = () => askPrompt(g, $("#ask-q").value.trim());
  const copy = async () => {
    try { await navigator.clipboard.writeText(text()); }
    catch {
      const ta = document.createElement("textarea"); ta.value = text(); document.body.appendChild(ta);
      ta.select(); let ok = false; try { ok = document.execCommand("copy"); } catch {} ta.remove();
      if (!ok) { msg.textContent = "Couldn't copy on this browser."; return; }
    }
    msg.innerHTML = "<b>Copied.</b> Open PocketPal → your SOS chat → long-press the message box → Paste → Send.";
  };
  $("#ask-copy").onclick = copy;
  const sh = $("#ask-share");
  if (sh) sh.onclick = async () => {
    try { await navigator.share({ title: g.title, text: text() }); msg.textContent = "If PocketPal wasn't in the list, use Copy for AI instead."; }
    catch (e) { if (e && e.name !== "AbortError") copy(); }
  };
}

// links to the metronome from inside guides
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href="#cpr-metronome"]');
  if (a) { e.preventDefault(); startMetronome(); }
});

// search
const search = $("#search");
search.addEventListener("input", () => {
  const q = search.value.trim();
  if (q.length >= 2) { view.innerHTML = searchView(q); setTab(""); }
  else if (!q) render();
});
window.addEventListener("hashchange", () => { search.value = ""; render(); });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && (signal.running || !$("#metro").hidden)) { wakeLock = null; keepAwake(true); }
});

render();

// ---------- offline ----------
function showVersion() {
  if (!("caches" in window)) return;
  caches.keys().then((k) => {
    const v = k.filter((x) => x.startsWith("ek-v")).sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4))).pop();
    const el = $("#app-version"); if (el && v) el.textContent = `Version ${v.replace("ek-v", "")}`;
  }).catch(() => {});
}
if ("serviceWorker" in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).then((reg) => {
    reg.update().catch(() => {});
    return navigator.serviceWorker.ready;
  }).then(() => { $("#offline-badge").hidden = false; showVersion(); }).catch(() => {});

  // A new version has taken over: reload to show it, unless an SOS tool is running.
  let reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloading) return;
    if (signal.running || !$("#metro").hidden || torchOn) {
      const b = $("#offline-badge"); b.hidden = false; b.textContent = "Update ready: reopen app";
      return;
    }
    reloading = true; location.reload();
  });
}
