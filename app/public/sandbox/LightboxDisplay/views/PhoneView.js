/*** PhoneView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require("famous/views/GridLayout");
    var RenderNode = require('famous/core/RenderNode');

    var ScreenView = require('views/ScreenView');

    PhoneView.DEFAULT_OPTIONS = {
        phoneSize: [67, 130],
        screenSize: [58, 104],
        scaleFactor: 5.5
    };

    function PhoneView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.PhoneSize,
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });

        this.mainNode = this.add(this.rootModifier);
        _createPhone.call(this);
        _createApp.call(this);
    }

    function _createApp() {
        var self = this;
        var ScreenView = new ScreenView({
            screenSize: this.options.screenSize.map(function(size){return size * self.options.scaleFactor;}),
        });

        var modifier = new StateModifier({
            transform: Transform.translate(0, -10, 0),
            size: this.options.screenSize.map(function(size){return size * self.options.scaleFactor;})
        });

        var renderNode = new RenderNode();
        renderNode.add(modifier).add(ScreenView);

        this.mainNode.add(renderNode);
    }

    function _createPhone() {
        var self = this;
        var phone = new Surface({
            size: this.options.phoneSize.map(function(size){return size * self.options.scaleFactor;}),
            properties: {
                backgroundColor: 'white',
                borderRadius: '20px'
            }
        });

        this.mainNode.add(phone);
    }

    PhoneView.prototype = Object.create(View.prototype);
    PhoneView.prototype.constructor = PhoneView;

    module.exports = PhoneView;
});
