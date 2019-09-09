/*** ContentView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require("famous/views/GridLayout");
    var Lightbox = require('famous/views/Lightbox');
    var Transitionable = require("famous/transitions/Transitionable");
    var RenderNode = require('famous/core/RenderNode');

    var SnapTransition = require("famous/transitions/SnapTransition");
    Transitionable.registerMethod("spring", SnapTransition);

    var GenericSync = require('famous/inputs/GenericSync');
    var MouseSync = require('famous/inputs/MouseSync');
    var TouchSync = require('famous/inputs/TouchSync');

    ContentView.DEFAULT_OPTIONS = {
        lightbox: {
            // 'in' state
            inTransform: undefined,
            inOpacity: 0,
            inOrigin: [0.5, 0.5],

            // 'show' state
            showTransform: Transform.identity,
            showOpacity: 1,
            showOrigin: [0.5, 0.5],

            // 'out' state
            outTransform: Transform.scale(0.001, 0.001, 0.001),
            outOpacity: 0,
            outOrigin: [0.5, 0.5],

            // transition parameters
            inTransition: true,
            outTransition: true,
            overlap: true
        },
        transitionStartX: window.innerWidth
    };

    function ContentView() {
        View.apply(this, arguments);

        GenericSync.register({
            'mouse': MouseSync,
            'touch': TouchSync
        });

        this.options.lightbox.inTransform = Transform.translate(this.options.transitionStartX, 0.001, 0.001);

        this.rootTransitionable = new Transitionable([0,0]);
        this.mainNode = this.add(this.rootTransitionable);


        _createLightbox.call(this);
        _createSlides.call(this);
        // var self = this;
        // setInterval( function() {
        //     self.showNextSlide.call(self);
        // }, 1000);
    }

    ContentView.prototype = Object.create(View.prototype);
    ContentView.prototype.constructor = ContentView;

    function _createSlides() {
        var self = this;
        this.slides = [];
        this.currentIndex = 0;

        var indexLoop = [];
        var N = 10;
        indexLoop = Array.apply(null, {length: N}).map(Number.call, Number);

        indexLoop.forEach(function(i) {
            var slide = new Surface({
                content: 'test:' + i,
                size: [undefined, undefined],
                properties: {
                    backgroundColor: _randomColor(),
                    textAlign: "center"
                }
            });

            var renderNode = new RenderNode();

            var genSync = new GenericSync(['mouse', 'touch']);
            slide.pipe(genSync);

            var position = new Transitionable([0,0]);

            genSync.on('update', function(data) {
                var currentPosition = position.get();
                position.set([
                    currentPosition[0] + data.delta[0],
                    currentPosition[1] + data.delta[1]
                ]);
            });

            genSync.on('end', function(data) {
                var currentPosition = position.get();
                var velocity = data.velocity;
                position.set([0, 0], {
                    method : 'spring',
                    period : 150,
                    velocity : velocity
                });
                self.showNextSlide.call(self);
            });


            var positionModifier = new Modifier({
                transform : function(){
                    var currentPosition = position.get();
                    return Transform.translate(currentPosition[0], 0, 0);
                }
            });

            renderNode.add(positionModifier).add(slide);
            self.slides.push(renderNode);
        });

        this.showCurrentSlide();
    }

    function _createLightbox() {
        this.lightbox = new Lightbox(this.options.lightbox);
        this.mainNode.add(this.lightbox);
    }

    ContentView.prototype.showCurrentSlide = function() {
        var slide = this.slides[this.currentIndex];
        this.lightbox.show(slide);
    };

    ContentView.prototype.showNextSlide = function() {
        this.currentIndex++;
        if (this.currentIndex === this.slides.length) this.currentIndex = 0;
        this.showCurrentSlide();
    };

    function _randomColor() {
        return '#' + (function co(lor){   return (lor +=
      [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (lor.length == 6) ?  lor : co(lor); })('');
    }

    function getMethods(obj) {
      var result = [];
      for (var id in obj) {
        try {
          if (typeof(obj[id]) == "function") {
            result.push(id + ": " + obj[id].toString());
          }
        } catch (err) {
          result.push(id + ": inaccessible");
        }
      }
      return result;
    }

    module.exports = ContentView;
});
