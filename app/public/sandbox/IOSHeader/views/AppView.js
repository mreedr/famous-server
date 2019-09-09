define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var SequentialLayout = require("famous/views/SequentialLayout");
    var RenderNode = require('famous/core/RenderNode');

    var SwipeView = require('views/SwipeView');
    var HeaderView = require('views/HeaderView');

    function AppView() {
        View.apply(this, arguments);
        this.mainNode = this.add();

        var swipeView = _createSwipeView.call(this);
        var headerView = _createHeaderView.call(this);

        headerView.subscribe(swipeView);

        var sequentialLayout = new SequentialLayout();
        sequentialLayout.sequenceFrom([headerView, swipeView]);

        this.add(sequentialLayout);
    }

    function _createHeaderView() {
        return new HeaderView({size: this.options.headerSize});
    }

    function _createSwipeView() {
        return new SwipeView({size: this.getContentHeight()});
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.contructor  = AppView;

    AppView.prototype.getContentHeight = function() {
        var height = this.options.height;
        var headerHeight = this.options.headerSize;
        return height - headerHeight;
    };

    AppView.DEFAULT_OPTIONS = {
        headerSize: 50
    };

    module.exports = AppView;
});

//
// var swipeView = new SwipeView();
//
//
// var sequentialLayout = new SequentialLayout();
// var sequence = [];
// sequence.push(addHeader());
// sequence.push(swipeView);
// sequentialLayout.sequenceFrom(sequence);
//
// mainContext.add(sequentialLayout);
//
// function addHeader() {
//     return new Surface({
//         size:[undefined, 50],
//         properties: {
//             backgroundColor: '"red"'
//         }
//     });
// }
