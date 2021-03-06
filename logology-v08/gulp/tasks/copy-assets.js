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

var merge = require("merge-stream"),
    gulp = require("gulp"),
    config = require("../config"),
    paths = require("../utils/paths"),
    changedInPlace = require('gulp-changed-in-place'),
    copyConfig = require("./copy-config").task,
    browserSync = require("browser-sync").get("www");

function copyAssets() {
    return merge.apply(merge, config.assets.copy.map(function (asset) {
        var fqSourcePath = paths.makeFullPath(asset.src, paths.SRC);
        var fqTargetPath = paths.makeFullPath(asset.dest, paths.DEST);
        return gulp.src([fqSourcePath])
//                   .pipe(changedInPlace())
                   .pipe(gulp.dest(fqTargetPath));
    }).concat(copyConfig()))
    .pipe(browserSync.stream());
}

module.exports = {
    task: copyAssets,
    desc: "Copies non-transformable assets",
    help: ["Copies files that don't need transformations to the build directory.",
            "Equivalent to 'cp' or 'copy' command."]
}
