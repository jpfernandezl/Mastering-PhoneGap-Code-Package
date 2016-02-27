/*
 * Logology Task Runner
 * 
 * Executes tasks common for building and testing Logology. Tasks can be found in
 * ./gulp/tasks. Configuration and settings can be found in ./gulp/config.js and
 * ./gulp/settings.js.
 * 
 * Author: Kerri Shotts <kerrishotts@gmail.com> 
 *         http://www.photokandy.com/books/mastering-phonegap
 *
 * Copyright (c) 2016 Packt Publishing, except where otherwise indicated. Dependencies
 * are copyright their respective owners. For license information, see /LICENSE and the
 * licenses of dependencies.
 * 
 * MIT LICENSED
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
 */

/*globals require, __dirname */
"use strict";
require ("babel/register");

var gulp = require("gulp");                         // Gulp itself
var browserSync = require("browser-sync").create("www");

var tasks = require("./gulp/tasks");

//
// register tasks with gulp
Object.keys(tasks).forEach(function(taskName) {
    var taskOpts = tasks[taskName];
    if (typeof taskOpts === "function") {
        gulp.task(taskName, taskOpts);
    } else {
        gulp.task(taskName, taskOpts.deps, taskOpts.task);
    }
});
