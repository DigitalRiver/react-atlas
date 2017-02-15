/** constants.js taken from Elemental UI.
 * mainly used for Grid functionality, Col & Row components
 * Copyright (c) 2016 Thinkmill Pty Ltd
 */
let canUseDOM = !!(typeof window !== "undefined" &&
  window.document &&
  window.document.createElement);

exports.canUseDOM = canUseDOM;

// breakpoints
exports.breakpoint = {
  "xs": 480,
  "sm": 768,
  "md": 992,
  "lg": 1200
};

// border radii
exports.borderRadius = {
  "xs": 2,
  "sm": 4,
  "md": 8,
  "lg": 16,
  "xl": 32
};

// spacing
exports.spacing = {
  "xs": 5,
  "sm": 10,
  "md": 20,
  "lg": 40,
  "xl": 80
};

// widths
exports.width = {
  "container": 1170,
  "gutter": 20
};

// fractions (for col widths)

function perc(n) {
  return n * 100 + "%";
}

function denominators(n) {
  for (let d = 2; d <= 20; d++) {
    if (n < d) {
      exports.fractions[n + "/" + d] = perc(n / d);
    }
  }
}

exports.fractions = {
  "1": "100%"
};

for (let numerator = 1; numerator <= 19; numerator++) {
  denominators(numerator);
}
