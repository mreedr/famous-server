/*global famous*/
// import dependencies
var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var ImageSurface = famous.surfaces.ImageSurface;
var Surface = famous.core.Surface;
var StateModifier = famous.modifiers.StateModifier;

// create the main context
var mainContext = Engine.createContext();

// your app here
var logo = new ImageSurface({
    size: [200, 200],
    content: 'http://code.famo.us/assets/famous_logo.png',
    classes: ['double-sided'],
    properties: {
        'backface-visibility': 'visible'
    }
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform : function () {
        return Transform.rotateY(0.003 * (Date.now() - initialTime));
    }
});

function surfaceContent() {
    return '<h5>Famo.us</h5>' +
        '<a href="/university">Lessions</a>' +
        '<br><a href="/timbre">Timbre</a>' +
        '<br><a href="/slide-show">Camera</a><br><br>' +
        '<h5>Index</h5>' +
        '<a href="/sandbox">Sandbox</a>' +
        '<br><a href="/flappy-bird">Flappy Bird</a>' +
        '<br><a href="/white-tile">White Tile</a>' +
        '<br><a href="/examples">Examples</a>';
}

var linkSurface = new Surface({
    size: [200, null],
    content: surfaceContent(),
    properties: {
        backgroundColor: '#fff',
        textAlign: 'center',
        paddingTop: '10px',
        zIndex: 2
    }
});

var surfaceModifier = new StateModifier({
    opacity: 100,
    transform: Transform.translate(0,0,2)
});

console.log(surfaceModifier.getOpacity());

mainContext.add(centerSpinModifier).add(logo);
mainContext.add(surfaceModifier).add(linkSurface);
