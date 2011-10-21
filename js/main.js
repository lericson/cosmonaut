modules.main = (function() {
  var utils = modules.utils();

  function Universe(el) {
    this.canvas = el;
    this.frameCount = 0;
    this.timeCoeff = 1;
    this.particles = [];
    this.started = this.absoluteClock();
    this._tPrev = this.started;
  }
  Universe.prototype.absoluteClock = function() {
    return (new Date()).getTime();
  };
  Universe.prototype.step = function() {
    var tNow = this.absoluteClock(),
        tDiff = tNow - this._tPrev;
    for (var i in this.particles) {
      var p = this.particles[i];
      p.simulate(tDiff / 1000 * this.timeCoeff);
    }
    this._tPrev = tNow;
  };
  Universe.prototype.run = function() {
    console.log("simulating universe", this.canvas);
    var self = this;
    (function go() {
      var t0 = self.absoluteClock();

      utils.requestAnimFrame.call(window, go);
      self.step();
      self.render(self.canvas);

      var tDiff = self.absoluteClock() - t0;
      if (self.averageStepTime)
        self.averageStepTime = (self.averageStepTime + tDiff) / 2;
      else
        self.averageStepTime = tDiff;
    })();
  };
  Universe.prototype.render = function(c) {
    var canvas = (c !== undefined) ? c : this.canvas,
        ctx = c.getContext("2d");

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();

    for (var i in this.particles) {
      var p = this.particles[i],
          pos = p.getPosition();
      ctx.moveTo(pos.x + p.mass, pos.y);
      ctx.arc(pos.x, pos.y, p.mass, 0, Math.PI * 2, true);
      if (true) {
        var vel = p.getVelocity();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(pos.x + vel.x, pos.y + vel.y);
      }
    }

    ctx.closePath();
    ctx.stroke()

    this.frameCount++;
  };

  return {Universe: Universe};
});
