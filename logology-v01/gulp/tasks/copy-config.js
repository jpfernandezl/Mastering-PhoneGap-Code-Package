/*****************************************************************************
 *
 * Author: Kerri Shotts <kerrishotts@gmail.com> 
 *         http://www.photokandy.com/books/mastering-phonegap
 *
 * MIT LICENSED
 * 
 * Copyright (c) 2016 Packt Publishing
 * Portions Copyright (c) 2016 Kerri Shotts (photoKandy Studios LLC)
 * Portions Copyright various third parties where noted.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 *****************************************************************************/

"use strict";

// performing substitutions version
var gulp = require("gulp"),
//    performSubstitutions = require("../utils/performSubstitutions"),
    config = require("../config"),
    paths = require("../utils/paths");
/*
function copyConfig() {
    return gulp.src([paths.makeFullPath("config.xml", paths.SRC)])
               .pipe(performSubstitutions())
               .pipe(gulp.dest(paths.makeFullPath(".", paths.DEST)));
}
*/

// final version
var cordovaTasks = require("../utils/cordova-tasks");

function copyConfig() {
    return cordovaTasks.copyConfig();
}

module.exports = {
    task: copyConfig,
    desc: "Transforms 'config.xml'",
    help: ["Copies and populates the 'config.xml' template in the source directory and",
            "writes the result to the build directory. Most of the parameters are stored",
            "in 'package.json'."]
}
