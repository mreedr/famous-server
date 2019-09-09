var Engine = famous.core.Engine;
var Surface = famous.core.Surface;
var Transform = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;
var Easing = famous.transitions.Easing;
var SpringTransition = famous.transitions.SpringTransition;
var Transitionable = famous.transitions.Transitionable;
Transitionable.registerMethod('spring', SpringTransition);

var mainContext = Engine.createContext();

var spinnerSurface = new Surface({
    size: [undefined, 20],
    properties: {
        backgroundColor: '#FA5C4F'
    }
});

var spinnerModifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
});

// spinnerSurface.on('touch', function() {
//     spinnerModifier.setTransform(
//         transform: Transform.rotatez(Math.PI/e.)
//     )
// });

mainContext.add(spinnerModifier).add(spinnerSurface);
