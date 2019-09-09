define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var RenderNode = require('famous/core/RenderNode');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require("famous/views/GridLayout");

    HeaderView.DEFAULT_OPTIONS = {};

    function HeaderView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: [undefined, this.options.size]
        });

        this.mainNode = this.add(this.rootModifier);



        _createBackground.call(this);
        _createTitle.call(this);
        _createEventListener.call(this);
    }

    function _createEventListener() {
        var self = this;
        this._eventInput.on('viewClick', function (data) {
            var animation = data.animationCurve;
            self.titleModifier.setAlign([0,0], animation);
            self.titleModifier.setOrigin([0,0], animation);
        });
    }

    function _createTitle() {
        this.title = new Surface({
            content: 'TEST',
            properties: {
                textAlign: 'center',
                fontSize: '30px',
                paddingTop: '7px'
            }
        });
        this.titleModifier = new StateModifier({
            size:[70, undefined],
            origin: [0.5, 0],
            align: [0.5, 0]
        });

        var renderNode = new RenderNode();
        renderNode.add(this.titleModifier).add(this.title);
        this.mainNode.add(renderNode);
    }

    function _createBackground() {
        var background = new Surface({
            size:[undefined, undefined],
            properties: {
                backgroundColor: 'gray',
                borderBottom: '2px solid black'
            }
        });
        this.mainNode.add(background);
    }

    HeaderView.prototype = Object.create(View.prototype);
    HeaderView.prototype.contructor  = HeaderView;

    module.exports = HeaderView;
});
