// Step-by-step diagrams shown above a guide's written steps, keyed by guide id.
// Every image is from Wikimedia Commons under the licence listed, and is credited in the app.
// "changes" notes any edits made (required by CC BY-SA). The service worker caches every file listed here.
const DIAGRAMS = {
  "knot-bowline": [{
    file: "knots/bowline.webp",
    alt: "Bowline in 5 steps: make a small loop in the standing part, pass the end up through it, around behind the standing part, and back down through the small loop, then tighten.",
    caption: "Green = standing part, red = working end. Pictures 1–2: make the small loop · 3: end up through it · 4: around behind the standing part · 5: back down through the loop, then tighten.",
    author: "Buz11", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Bowline_tying.png", changes: "Trimmed, resized and converted to WebP.",
  }],
};
