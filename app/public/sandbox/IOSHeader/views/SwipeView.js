define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Modifier   = require("famous/core/Modifier");
    var Transitionable = require("famous/transitions/Transitionable");
    var Scrollview = require("famous/views/Scrollview");
    var RenderNode = require('famous/core/RenderNode');
    var GridLayout = require("famous/views/GridLayout");
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var EventHandler = require('famous/core/EventHandler');
    var Easing = require('famous/transitions/Easing');

    var GenericSync = require('famous/inputs/GenericSync');
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');

    var ANIMATION_CURVE = {duration: 400, curve: Easing.inSine};

    function SwipeView() {
        View.apply(this, arguments);
        GenericSync.register({
            'mouse': MouseSync,
            'touch': TouchSync
        });

        this.rootModifier = new StateModifier({
            size: [undefined, this.options.size]
        });
        this.mainNode = this.add(this.rootModifier);

        this.eventHandler = new EventHandler();

        this.scrollview = new Scrollview();
        var sequence = _createSurfaces.call(this);
        this.scrollview.sequenceFrom(sequence);
        this.mainNode.add(this.scrollview);

        var view = _createOverlayView.call(this);

        // Add off screen surface
        this.mainNode.add(view);
    }

    function _createOverlayView() {
        var self = this;
        var surface = new Surface({
            size:[undefined, undefined],
            properties: {
                backgroundColor: 'red'
            }
        });

        var stateModifier = new StateModifier({
            align: [1, 0]
        });

        this.eventHandler.on('viewClick', function (data) {
            console.log(data);
            stateModifier.setAlign([0,0], ANIMATION_CURVE);
            self._eventOutput.emit('viewClick', {animationCurve: ANIMATION_CURVE});
        });

        var renderNode = new RenderNode();
        renderNode.add(stateModifier).add(surface);
        return renderNode;
    }

    function _createSurfaces() {
        var surfaces = [];

        for(var i = 0; i < 100; i++) {
            surfaces.push(_createViewEntry.call(this, i));
        }

        return surfaces;
    }

    function _createViewEntry(i) {
        var renderNode = new RenderNode();
        var view = new View();

        var temp = _createEntry.call(this, i);


        var stateModifier = new StateModifier({
            size: [undefined, 70],
            origin: [0.5, 0.0],
            align:  [0.5, 0.0],
            transform: Transform.scale(1, 1, 1)
        });
        renderNode.add(stateModifier).add(temp);

        return renderNode;
    }

    function _createEntry(i) {
        var surface = new Surface({
            size:[undefined, undefined],
            properties: {
                backgroundColor: 'red'
            }
        });

        var gridLayout = new GridLayout({
            dimensions: [3, 1]
        });
        var sequence = [];
        gridLayout.sequenceFrom(sequence);

        var icon = _createIcon.call(this);
        var text = _createText.call(this);
        var arrow = _createArrow.call(this);

        sequence.push(icon);
        sequence.push(text);
        sequence.push(arrow);

        return gridLayout;
    }

    function _createIcon() {
        var icon = new Surface({
            content: '<i class="fa fa-apple"></i>',
            properties: {
                backgroundColor: 'white',
                borderTop: '2px solid black',
                borderBottom: '2px solid black',
                borderLeft: '2px solid black',
            }
        });
        icon.pipe(this.scrollview);
        icon.pipe(this.eventHandler);
        icon.on('click', __handleClick.bind(this));
        return icon;
    }

    function _createText() {
        var self = this;
        var text = new Surface({
            content: 'Some Cool Text',
            classes: ['scroll-view-text'],
            properties: {
                backgroundColor: 'white',
                borderTop: '2px solid black',
                borderBottom: '2px solid black',
                textAlign: 'center'
            }
        });
        text.pipe(this.scrollview);
        text.pipe(this.eventHandler);
        text.on('click', function (data) {
            self.eventHandler.emit('viewClick', 'message');
        });
        return text;
    }

    function _createArrow() {
        var arrow = new Surface({
            content: '<i class="fa fa-chevron-right"></i>',
            properties: {
                backgroundColor: 'white',
                borderTop: '2px solid black',
                borderBottom: '2px solid black',
                borderRight: '2px solid black',
                textAlign: 'right'
            }
        });
        arrow.pipe(this.scrollview);
        arrow.pipe(this.eventHandler);
        arrow.on('click', __handleClick.bind(this));
        return arrow;
    }

    function __handleClick(data) {
        this.eventHandler.emit('viewClick', 'message');
    }

    SwipeView.prototype = Object.create(View.prototype);
    SwipeView.prototype.contructor  = SwipeView;

    SwipeView.DEFAULT_OPTIONS = {};

    module.exports = SwipeView;
});
