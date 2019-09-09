/*** GameView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require("famous/views/GridLayout");

    GameView.DEFAULT_OPTIONS = {
        size: [500, 500],
        gameBorder: 15
    };

    function GameView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size,
            origin: [0.5, 0.5],
            align: [0.5, 0.5]
        });

        this.mainNode = this.add(this.rootModifier);
        _createBackground.call(this);
        _createGrid.call(this);
    }

    function _createGrid() {
        var border = this.options.gameBorder;
        var xSize = this.options.size[0];
        var ySize = this.options.size[1];

        var grid = new GridLayout({
            dimensions: [4, 4],
            gutterSize: [border, border]
        });

        var sequence = [];
        for( var i = 0; i < 16; i++) {
            sequence.push(new Surface({
                size: [undefined, undefined],
                properties: {
                    backgroundColor: '#ccc0b3'
                }
            }));
        }

        var modifier = new StateModifier({
            transform: Transform.translate(border, border, 2)
        });

        grid.sequenceFrom(sequence);
        this.mainNode.add(modifier).add(grid);
    }

    function _createBackground() {
        var border = this.options.gameBorder;
        var xSize = this.options.size[0];
        var ySize = this.options.size[1];

        var background = new Surface({
            size: [(xSize + border*2), (ySize + border*2)],
            properties: {
                backgroundColor: '#bbada0',
                borderRadius: '15px'
            }
        });

        this.mainNode.add(background);
    }

    GameView.prototype = Object.create(View.prototype);
    GameView.prototype.constructor = GameView;

    module.exports = GameView;
});
