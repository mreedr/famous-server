/*
 * Copyright (c) 2014 Gloey Apps
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author: Hein Rutjes (IjzerenHein)
 * @license MIT
 * @copyright Gloey Apps, 2014
 */

/*jslint browser:true, nomen:true, vars:true, plusplus:true, bitwise: true*/
/*global define*/

define(function (require, exports, module) {
    'use strict';

    // import dependencies
    var Engine = require('famous/core/Engine');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var AppView = require('./AppView');

    // create the main context
    var mainContext = Engine.createContext();

    mainContext.setPerspective(200);

    var viewSwitchSurface = new Surface({
        size: [null, null],
        content: 'Change View',
        properties: {
            backgroundColor: 'gray',
            padding: '10px',
            zIndex: 5
        }
    });

    var rotateModifier = new StateModifier();
    var appView = new AppView();

    viewSwitchSurface.on('click', function() {
        rotateModifier.setOrigin([0.5, 3.5]);
        rotateModifier.setAlign([0.5, 1]);
        rotateModifier.setTransform(
            Transform.rotate(Math.PI/4, 0, 0),
            {duration: 2000, curve: 'linear'}
        );
    });

    mainContext.add(viewSwitchSurface);
    mainContext.add(rotateModifier).add(appView);

});
