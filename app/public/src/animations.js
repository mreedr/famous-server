var Engine = famous.core.Engine;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;
var SpringTransition = famous.transitions.SpringTransition;
var Transitionable = famous.transitions.Transitionable;
Transitionable.registerMethod('spring', SpringTransition);

var mainContext = Engine.createContext();

var surface1 = new Surface({
  size: [100, 100],
  properties: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#FA5C4F'
  }
});

var stateModifier1 = new StateModifier();

mainContext.add(stateModifier1).add(surface1);

stateModifier1.setTransform(
  Transform.translate(0, 300, 0),
  { duration : 1000, curve: Easing.inExpo }
);

stateModifier1.setTransform(
  Transform.translate(100, 300, 0),
  { duration : 800, curve: Easing.outElastic },
  function() {
    surface1.setContent('finished');
  }
);

var surface2 = new Surface({
  size: [100, 100],
  content: 'click me to halt',
  properties: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#FA5C4F'
  }
});

var stateModifier2 = new StateModifier({
  origin: [0.5, 0],
  align: [0.5, 0]
});

mainContext.add(stateModifier2).add(surface2);

stateModifier2.setTransform(
  Transform.translate(0, 300, 0),
  { duration : 8000, curve: 'linear' }
);

surface2.on('click', function() {
  stateModifier2.halt();
  surface2.setContent('Moving');
  stateModifier2.setTransform(
      Transform.translate(300, 0, 0),
      { duration: 3000, curve: 'linear'},
      function() {
          surface2.setContent('Done');
      }
  );
});

var surface3 = new Surface({
  size: [100, 100],
  content: 'click me to drop',
  properties: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#FA5C4F'
  }
});

var stateModifier3 = new StateModifier({
  origin: [0.5, 0],
  align: [0.8, 0]
});

mainContext.add(stateModifier3).add(surface3);

stateModifier3.setTransform(
  Transform.translate(0, 400, 0),
  { duration : 8000, curve: 'linear' }
);

surface3.on('click', function() {
  stateModifier3.halt();
  surface3.setContent('halted');
  stateModifier3.setTransform(
    Transform.translate(0, 400, 0),
    { duration : 400, curve: Easing.outBounce }
  );
});

var sringSurface = new Surface({
  size: [100, 100],
  properties: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#FA5C4F'
  }
});

var springModifier = new StateModifier({
  origin: [0.5, 0],
  align: [0.3, 0]
});

mainContext.add(springModifier).add(sringSurface);

var spring = {
  method: 'spring',
  period: 1000,
  dampingRatio: 0.3
};

springModifier.setTransform(
  Transform.translate(0, 300, 0), spring
);
