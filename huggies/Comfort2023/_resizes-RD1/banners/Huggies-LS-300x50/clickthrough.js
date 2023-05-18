"use strict";

(function () {
  // Source/scripts/clickthrough.js
  function clickthroughH(ev) {
    ev.preventDefault();

    try {
      if (window["APPNEXUS"]) {
        window.open(window["APPNEXUS"].getClickTag(), "_blank");
      } else if (window["myFT"]) {
        window["myFT"].clickTag(1, window["myFT"].instantAds.clickTag);
      } else {
        window.open(window["clickTag"]);
      }
    } catch (err) {
      console.error("CLICKTAG ERROR");
    }
  }

  var clickthroughs = document.querySelectorAll(".clickthrough");

  for (i = 0; i < clickthroughs.length; i++) {
    el = clickthroughs[i];
    el.addEventListener("click", clickthroughH);
  }

  var el;
  var i;
  document.querySelector("#banner").addEventListener("click", clickthroughH);
})();