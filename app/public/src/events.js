var Engine = famous.core.Engine;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;
var SpringTransition = famous.transitions.SpringTransition;
var EventHandler = famous.core.EventHandler;
var Transitionable = famous.transitions.Transitionable;
Transitionable.registerMethod('spring', SpringTransition);


var mainContext = Engine.createContext();


function randomColor() {
    return '#' + (function co(lor){   return (lor +=
  [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })('');
}

var moveableSurface = new Surface({
  size: [undefined, 100],
  content: 'press a key in the preview window',
  properties: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#FA5C4F'
  }
});

var moveableModifier = new StateModifier({
    opacity: 50
});

mainContext.add(moveableModifier).add(moveableSurface);

var y = 0;

var eventHandler = new EventHandler();

Engine.on('keydown', function(e) {
  moveableModifier.halt();
  moveableSurface.setContent(e.which);
  if (e.which === 40) {
      moveableSurface.setContent('Down');
      y += 75;
      if (y > window.innerHeight - 100) {
          y = 0;
      }
  } else if (e.which === 38) {
      moveableSurface.setContent('Up');
      y -= 75;
      if (y < 0) {
          y = window.innerHeight - 100;
      }
  }

  eventHandler.emit('update');

  moveableModifier.setTransform(
      Transform.translate(0, y, 0),
      { duration : 200, curve: Easing.outBounce }
  );
});


var listenSurface = new Surface({
    size: [100, 100],
    content: 'Listening...',
    properties: {
      color: 'white',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
});

eventHandler.on('update', function() {
    listenSurface.setProperties({
        backgroundColor: randomColor()
    });
});

var listenModifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
});

mainContext.add(listenModifier).add(listenSurface);


var surfaceA, surfaceB;
createSurfaces();

var eventHandlerA = new EventHandler();
var eventHandlerB = new EventHandler();

surfaceA.on('click', function() {
  eventHandlerA.emit('hello');
  surfaceA.setContent('said hello');
});

eventHandlerA.pipe(eventHandlerB);

eventHandlerB.subscribe(eventHandlerA);

// or
// eventHandlerB.subscribe(eventHandlerA);

eventHandlerB.on('hello', function() {
  surfaceB.setContent('heard hello');
});

function createSurfaces() {
  surfaceA = new Surface({
    size: [100, 100],
    content: 'A<br>click me to say hello',
    properties: {
      color: 'white',
      textAlign: 'center',
      backgroundColor: '#FA5C4F'
    }
  });

  surfaceB = new Surface({
    size: [100, 100],
    content: 'B',
    properties: {
      color: 'white',
      textAlign: 'center',
      backgroundColor: '#FA5C4F'
    }
  });

  var modifierB = new StateModifier({
    origin: [1, 1],
    align: [1, 1]
  });

  mainContext.add(surfaceA);
  mainContext.add(modifierB).add(surfaceB);
}
