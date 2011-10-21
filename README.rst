===========
 Cosmonaut
===========

click
  set center of gravity
right
  increase time multiplier by one
left
  decrease time multiplier by one
up
  double time multiplier
down
  half time multiplier

An experiment mainly in the behavior of Newtonian universal gravitation, but
also how to approach maintainable JavaScript codebases.

An attempt has been made to make modules separated via the global ``modules``
object. Each module is a function that returns an object which is the module
itself. Caching might be desirable here, but this is a quick solution.

If anybody knows how to do inheritance (or the equivalent in a prototyping
language) feel free to tell me.
