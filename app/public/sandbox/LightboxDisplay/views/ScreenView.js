/*** ScreenView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require("famous/views/GridLayout");
    var SequentialLayout = require("famous/views/SequentialLayout");
    var RenderNode = require('famous/core/RenderNode');


    var ContentView = require('views/ContentView');


    ScreenView.DEFAULT_OPTIONS = {
        menuSize: 50,
        toolBarSize: 25
    };

    function ScreenView() {
        View.apply(this, arguments);
        var ops = this.options;


        var sequentialLayout = new SequentialLayout();
        var renderables = [];

        renderables.push(_createToolBar.call(this));
        renderables.push(_createMenu.call(this));
        renderables.push(_createContent.call(this));

        sequentialLayout.sequenceFrom(renderables);

        this.add(sequentialLayout);
    }

    function _createContent() {
        var screenSize = this.options.screenSize;

        var fullSize = (screenSize) ? screenSize[1] : window.innerHeight;
        var menuSize = this.options.menuSize;
        var toolBarSize = this.options.toolBarSize;

        var size = fullSize - menuSize - toolBarSize;

        var modifierNode = new RenderNode();

        var stateModifier = new StateModifier({
            size: [undefined, size]
        });

        var contentView = new ContentView();
        modifierNode.add(stateModifier).add(contentView);
        return modifierNode;
    }

    function _createToolBar() {
        return new Surface({
            size: [undefined, this.options.toolBarSize],
            properties: {
                backgroundColor: 'silver'
            }
        });
    }

    function _createMenu() {
        var IOSHeaderView = require('views/IOSHeaderView');
        var modifierNode = new RenderNode();

        var modifier = new StateModifier({
            size: [undefined, this.options.menuSize]
        });

        modifierNode.add(modifier).add(new IOSHeaderView());
        return modifierNode;
    }

    ScreenView.prototype = Object.create(View.prototype);
    ScreenView.prototype.constructor = ScreenView;

    module.exports = ScreenView;
});
