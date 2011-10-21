modules.particles = (function() {
  var utils = modules.utils();

  // Particle which only keeps one position
  function FixedParticle(x, y) {
    this._x = (x !== undefined) ? x : 0.0;
    this._y = (y !== undefined) ? y : 0.0;
  }
  FixedParticle.prototype.getPosition = function() {
    return {x: this._x, y: this._y};
  };
  FixedParticle.prototype.getLength = function(p) {
    return Math.sqrt((p.x * p.x) + (p.y * p.y));
  };
  FixedParticle.prototype.getDistance = function(p) {
    return {x: p.x - this._x,
            y: p.y - this._y};
  };
  FixedParticle.prototype.move = function(p) {
    this._x = p.x;
    this._y = p.y;
  };
  FixedParticle.prototype.simulate = function(t) { };

  // Moves constantly
  function MovingParticle(x, y, dx, dy) {
    FixedParticle.prototype.constructor.apply(this, arguments);
    this._dx = (dx !== undefined) ? dx : 0.0;
    this._dy = (dy !== undefined) ? dy : 0.0;
  }
  utils.copy(FixedParticle.prototype, MovingParticle.prototype);
  MovingParticle.prototype.getVelocity = function() {
    return {x: this._dx, y: this._dy};
  };
  MovingParticle.prototype.getSpeed = function() {
    return Math.sqrt((this._dx * this._dx) + (this._dy * this._dy));
  };
  MovingParticle.prototype.accelerate = function(t, a) {
    this._dx += a.x * t;
    this._dy += a.y * t;
  };
  MovingParticle.prototype.simulate = function(t) {
    FixedParticle.prototype.simulate.apply(this, arguments);
    var vel = this.getVelocity();
    this._x += vel.x * t;
    this._y += vel.y * t;
  };

  // Sums given forces and integrates over time when simulated.
  function AcceleratingParticle() {
    MovingParticle.prototype.constructor.apply(this, arguments);
    this.forces = [];
  }
  utils.copy(MovingParticle.prototype, AcceleratingParticle.prototype);
  AcceleratingParticle.prototype.sumForces = function() {
    var sumAcc = {x: 0, y: 0};

    for (var i in this.forces) {
      var force = this.forces[i],
          a = force.apply(this, arguments);
      sumAcc = {x: sumAcc.x + a.x,
                y: sumAcc.y + a.y};
    }

    return sumAcc;
  }
  AcceleratingParticle.prototype.simulate = function(t) {
    this.accelerate(t, this.sumForces());
    MovingParticle.prototype.simulate.apply(this, arguments);
  }

  return {FixedParticle: FixedParticle,
          MovingParticle: MovingParticle,
          AcceleratingParticle: AcceleratingParticle,
          Particle: AcceleratingParticle};
});
