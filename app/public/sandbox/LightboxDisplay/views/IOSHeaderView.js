/*** IOSHeaderView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require("famous/views/GridLayout");
    var SequentialLayout = require("famous/views/SequentialLayout");
    var RenderNode = require('famous/core/RenderNode');


    IOSHeaderView.DEFAULT_OPTIONS = {
        menuSize: 50,
        toolBarSize: 25
    };

    function IOSHeaderView() {
        View.apply(this, arguments);

        var modifier = new StateModifier();
        this.mainNode = this.add(modifier);

        _createToolbar.call(this);
        _createText.call(this);

    }

    function _createToolbar() {
        var surface = new Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'white',
                textAlign: 'center'
            }
        });

        this.mainNode.add(surface);
    }

    function _createText() {
        var textSurface = new Surface({
            size: [70, null],
            content: 'TITLE',
            properties: {
                backgroundColor: 'white',
                textAlign: 'center'
            }
        });

        var modifier = new StateModifier({
            origin: [0.5, 0.5],
            align: [0.5, 0.3]
        });
        this.mainNode.add(modifier).add(textSurface);
    }

    IOSHeaderView.prototype = Object.create(View.prototype);
    IOSHeaderView.prototype.constructor = IOSHeaderView;

    module.exports = IOSHeaderView;
});
