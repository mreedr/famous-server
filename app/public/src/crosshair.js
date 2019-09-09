var Engine = famous.core.Engine;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var mainContext = Engine.createContext();
var Easing = famous.transitions.Easing;
var SpringTransition = famous.transitions.SpringTransition;
var MouseSync = famous.inputs.MouseSync;
var Modifier = famous.core.Modifier;

var mainContext = Engine.createContext();

var BIRD_NUM = 10;

function random(x, y){
    return (Math.random() * y) + x;
}

var backgroundSky = new Surface({
    size: [undefined, undefined],
    properties: {
        backgroundColor: '#7ec0ee'
    }
});

mainContext.add(backgroundSky);

var sun = new Surface({
    size: [200, 200],
    properties: {
        border: '1px solid yellow',
        borderRadius: '100px',
        backgroundColor: 'yellow'
    }
});

var sunModifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.3]
});

mainContext.add(sunModifier).add(sun);


function createMountain(size, possition, color) {
    var mountain = new Surface({
        size: size,
        properties: {
            backgroundColor: color
        }
    });

    var mountainRotate = new StateModifier({
        transform: Transform.rotateZ(Math.PI/4),
        origin: [0.5, 0.5],
        align: possition
    });

    mainContext.add(mountainRotate).add(mountain);
}


createMountain([400, 400], [0.25, 0.75], 'gray');
createMountain([600, 600], [0.6, 0.75], 'gray');
createMountain([400, 400], [0.8, 0.75], 'gray');
createMountain([400, 500], [0.9, 0.75], 'gray');
createMountain([500, 500], [0.01, 0.75], 'gray');


createMountain([200, 200], [0.05, 0.75], 'lightgray');
createMountain([200, 200], [0.9, 0.75], 'lightgray');
createMountain([300, 300], [0.5, 0.75], 'lightgray');
createMountain([100, 100], [0.8, 0.75], 'lightgray');
createMountain([350, 350], [0.67, 0.75], 'lightgray');


function createBird(position) {
    var bird = new Surface({
        size: [20, 10],
        properties: {
            backgroundColor: 'black'
        }
    });

    var birdModifier = new Modifier({
        origin: [0.5, 0.5],
        align: position
    });

    mainContext.add(birdModifier).add(bird);


    var angle = 0;
    function rotate() {
        angle += 0.01;
        return Transform.rotateZ(angle);
    }

    birdModifier.transformFrom(rotate);

    return birdModifier;
}

var birds = [];

for(var i = 0; i < BIRD_NUM; i++) {
    birds.push(createBird([random(0,0.6), random(0.01,0.45)]));
}


var groundSquare = new Surface({
  size: [undefined, 300],
  properties: {
    backgroundColor: '#458B00'
  }
});

var groundModifier = new StateModifier({
    origin: [0.5, 1],
    align: [0.5, 1]
});
mainContext.add(groundModifier).add(groundSquare);

var centerCircle = new Surface({
  size: [15, 15],
  properties: {
    border: '1px solid #000',
    borderRadius: '7px'
  }
});

var horizontalRule = new Surface({
  size: [undefined, 1],
  properties: {
    backgroundColor: '#ffffff'
  }
});

var verticalRule = new Surface({
  size: [1, undefined],
  properties: {
    backgroundColor: '#ffffff'
  }
});


var mouseSyncSurface = new Surface({ size: [undefined, undefined] });
var mouseSync = new MouseSync();
mouseSyncSurface.pipe(mouseSync);

mouseSyncSurface.on('click', function() {
    birds.forEach(function(bird) {
        bird.setAlign([random(0,0.6), random(0.01,0.45)]);
    });
});

var xOffset = window.innerWidth / 2.0;
var yOffset = window.innerHeight / 2.0;
var x = 0;
var y = 0;

function createOriginModifier() {
    return new StateModifier({
      transform: Transform.translate(x, y, 0),
      origin: [0.5, 0.5],
      align: [0.5, 0.5]
    });
}

var originModifier = new StateModifier({
  origin: [0.5, 0.5],
  align: [0.5, 0.5]
});

var verticalController = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
});

var horizontalController = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
});

mouseSync.on('start', function (e) {
    x = e.clientX;
    y = e.clientY;


    originModifier.setTransform(Transform.translate(x - xOffset, y - yOffset, 0));
    var xDistance = (x - window.innerWidth) / window.innerWidth ;
    verticalController.setAlign([xDistance + 1, 0.5]);
    var yDistance = (y - window.innerHeight) / window.innerHeight;
    horizontalController.setAlign([0.5, yDistance + 1]);
});
mouseSync.on('update', function (e) {
    x = e.clientX;
    y = e.clientY;

    originModifier.setTransform(Transform.translate(x - xOffset, y - yOffset, 0));
    var xDistance = (x - window.innerWidth) / window.innerWidth ;
    verticalController.setAlign([xDistance + 1, 0.5]);
    var yDistance = (y - window.innerHeight) / window.innerHeight;
    horizontalController.setAlign([0.5, yDistance + 1]);
});
mouseSync.on('end', function (e) {
    x = e.clientX;
    y = e.clientY;
    originModifier.setTransform(Transform.translate(x - xOffset, y - yOffset, 0));
    var xDistance = (x - window.innerWidth) / window.innerWidth ;
    verticalController.setAlign([xDistance + 1, 0.5]);
    var yDistance = (y - window.innerHeight) / window.innerHeight;
    horizontalController.setAlign([0.5, yDistance + 1]);
});




mainContext.add(mouseSyncSurface);

/* Bonus section! */
// Constructing this crosshair involves
// adding multiple surfaces to originModifier.
// To do this correctly, declare the modifier's
// place in the scene graph as a variable.

var node = mainContext.add(verticalController);
node.add(verticalRule);

var node = mainContext.add(horizontalController);
node.add(horizontalRule);

var node = mainContext.add(originModifier);
node.add(centerCircle);
