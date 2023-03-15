(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    function clickthroughH(ev) {
      ev.preventDefault();

      try {
        if (window['APPNEXUS']) {
          window.open(window['APPNEXUS'].getClickTag(), '_blank');
        } else if (window['myFT']) {
          window['myFT'].clickTag(1, window['myFT'].instantAds.clickTag);
        } else {
          window.open(window['clickTag']);
        }
      } catch (err) {
        console.error('CLICKTAG ERROR');
      }
    }

    var clickthroughs = document.querySelectorAll('.clickthrough');

    for (var i = 0; i < clickthroughs.length; i++) {
      var el = clickthroughs[i];
      el.addEventListener('click', clickthroughH);
    }

    document.querySelector('#banner').addEventListener('click', clickthroughH);

}));
//# sourceMappingURL=clickthrough.js.map
