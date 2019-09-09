var Engine = famous.core.Engine;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;

var mainContext = Engine.createContext();

createSurface();
createModifiedSurface();

function createSurface() {
    var surface = new Surface({
        size: [100, 100],
        content: 'surface',
        properties: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: '#FA5C4F'
        }
    });
    mainContext.add(surface);
}

function createModifiedSurface() {
    var modifiedSurface = new Surface({
      size: [100, 100],
      content: 'modified surface',
      properties: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#FA5C4F'
      }
    });

    var stateModifier = new StateModifier({
      transform: Transform.translate(150, 100, 0)
    });

    mainContext.add(stateModifier).add(modifiedSurface);
}

var downMod = new StateModifier({
    transform: Transform.translate(0, 150, 0)
});

var rightMod = new StateModifier({
  transform: Transform.translate(150, 0, 0)
});

var leftSurface = new Surface({
  size: [120, 100],
  content: 'left surface',
  properties: {
    color: 'white',
    backgroundColor: '#FA5C4F'
  }
});

var rightSurface = new Surface({
  size: [120, 100],
  content: 'right surface',
  properties: {
    color: 'white',
    backgroundColor: '#404040'
  }
});

var node = mainContext.add(downMod);
node.add(leftSurface);
node.add(rightMod).add(rightSurface);
