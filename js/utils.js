modules.utils = (function() {
  function copy(src, dst) {
    for (var k in src) { dst[k] = src[k]; }
  }

  function on(k, f) {
    if (this.addEventListener) {
      this.addEventListener(k, f, false);
    } else if (this.attachEvent) {
      this.attachEvent("on" + k, f);
    } else {
      this["on" + k] = f;
    }
  }

  var requestAnimFrame = (function() {
    return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           window.oRequestAnimationFrame      ||
           window.msRequestAnimationFrame     ||
           function(callback, element) {
             window.setTimeout(callback, 1000 / 60);
           };
  })();

  return {copy: copy,
          on: on,
          requestAnimFrame: requestAnimFrame};
});
