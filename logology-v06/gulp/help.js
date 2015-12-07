"use strict";

var gutil = require("gulp-util"),
    sprintf = require("sprintf-js").sprintf;
/**
 * Display some nicely formatted help in response to gulp help.
 * Also allow filtering with --filter
 */
module.exports = function showHelp(tasks) {
    var helpOnTask = gutil.env.filter ? gutil.env.filter : "";
    var task;
    var help;
    for (var taskTitle in tasks) {
        if (tasks.hasOwnProperty(taskTitle)) {
            task = tasks[taskTitle];
            if (helpOnTask !== "" && taskTitle.indexOf(helpOnTask) < 0) {
                continue;
            }
            if (typeof task !== "function" && task.desc) {
                console.log (sprintf("%-40s%40s", taskTitle, task.desc));
                if (task.help) {
                    help = task.help;
                    if (!(help instanceof Array)) {
                        help = [help];
                    }
                    help.forEach(function (text) {
                        console.log("    " + text);
                    });
                }
                if (task.examples) {
                    console.log();
                    task.examples.forEach( function (example) {
                        var lines;
                        if (example instanceof Array) {
                            lines = example;
                        } else {
                            lines = JSON.stringify(example, null, 4).split("\n");
                        }
                        lines.forEach(function (text) {
                            console.log("        " + text);
                        });
                    });
                }
                if (task.deps) {
                    console.log();
                    console.log("    Dependencies: ", task.deps.join(", "));
                }
                console.log();
            }
        }
    }
}
