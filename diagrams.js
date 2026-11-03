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
  "knot-clove": [{
    file: "knots/clove-hitch-slipped.webp",
    alt: "Slipped clove hitch on a pole: two turns crossing over each other, with the working end tucked under the second turn as a loop instead of straight through.",
    caption: "Quick-release (slipped) version: the end is tucked under the second wrap as a loop, so one pull on the loose end unties it. For the plain clove hitch, push the end straight through instead.",
    author: "Hella (German Wikipedia)", licence: "CC BY-SA 3.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Clove_hitch_with_draw-loop.png", changes: "Converted to WebP.",
  }],
  "knot-sheet": [{
    file: "knots/sheet-bend-check.webp",
    alt: "Two sheet bends side by side. Left, correct: both short ends finish on the same side. Right, faded and marked with a skull: the left-handed version with short ends on opposite sides, labelled unsafe.",
    caption: "Check your knot. Left: correct, with both short ends on the same side. Right: the left-handed version, with short ends on opposite sides. It can slip, so untie it and redo it.",
    author: "Buz11", licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Bowline_knot_family.png", changes: "Cropped to the sheet bend panels and converted to WebP.",
  }],
  "knot-taut": [{
    file: "knots/taut-line-hitch.webp",
    alt: "Four photos of a taut-line hitch on a bar: the end passes over the bar and wraps twice round the standing part on the bar side, then crosses and makes one wrap further from the bar, and is pulled snug.",
    caption: "The bar is the anchor. 1–2: two wraps round the standing part, working towards the bar · 3: cross over and make one wrap further from the bar, then tuck · 4: pull snug, then slide the knot to tighten the line.",
    author: "David J. Fred", licence: "CC BY-SA 2.5", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.5/",
    source: "https://commons.wikimedia.org/wiki/File:TautlineHitch-ABOK-1800.jpg", changes: "Resized and converted to WebP.",
  }],
};
