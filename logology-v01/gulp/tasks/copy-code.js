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

var cordovaTasks = require("../utils/cordova-tasks"),
    gulp = require("gulp"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    path = require("path"),
    notify = require("gulp-notify"),
    sourcemaps = require("gulp-sourcemaps"),
    gutil = require("gulp-util"),
    replace = require("gulp-replace-task"),
    config = require("../config"),
    settings = require("../settings"),
    paths = require("../utils/paths"),
    performSubstitutions = require("../utils/performSubstitutions"),
    browserSync = require("browser-sync").get("www");

// section performing substitutions
var pkg = require("../../package.json");

// simple replace
/*
function performSubstitutions() {
  return replace({
    patterns: [
      {
        match: /{{{VERSION}}}/g,
        replacement: pkg.version
      }
    ]
  });
}

function copyCode() {
    return gulp.src([paths.makeFullPath(config.assets.code.src, paths.SRC)])
               .pipe(performSubstitutions())
               .pipe(concat("app.js"))
               .pipe(gulp.dest(paths.makeFullPath(config.assets.code.dest, paths.DEST)));
}
*/

// final copyCode for chapter 1
function copyCode() {
    var isRelease = (settings.BUILD_MODE === "release");
    return gulp.src([paths.makeFullPath(config.assets.code.src, paths.SRC)])
               .pipe(cordovaTasks.performSubstitutions())
               .pipe(settings.BUILD_MODE === "debug" ? sourcemaps.init() : gutil.noop())
               .pipe(babel())
               .pipe(concat("app.js"))
               .pipe(settings.BUILD_MODE === "debug" ? sourcemaps.write() : gutil.noop())
               .pipe(settings.BUILD_MODE === "release" ? uglify({preserveComments:"some"}) : gutil.noop())
               .pipe(gulp.dest(paths.makeFullPath(config.assets.code.dest, paths.DEST)))
               .pipe(browserSync.stream());
}

module.exports = {
    task: copyCode,
    desc: "Transforms JS and ES2015 code",
    help: ["Transforms the JS and ES2015 code in the source directory and writes the",
            "result to the build directory. ES2015 is transpiled using",
            "Babel. The output is controlled by various flags:",
            "    --mode=release | debug",
            "        debug: generates debugging information and source maps. DEFAULT",
            "        release: removes debugging information, source maps, and also",
            "                 uglifies the code automatically."]
};
