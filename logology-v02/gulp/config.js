"use strict";

var config = {
    paths: {
        base: process.cwd(),
        dest: "build",
        src: "src",
        config: "config"
    },
    assets: {
        copy: [
                {src: "www/*.*",            dest: "www"},
                {src: "www/html/**/*",      dest: "www/html"},
                {src: "www/img/**/*",       dest: "www/img"},
                //{src: "www/js/lib/**/*",    dest: "www/js/lib"},
                {src: "res/**/*",           dest: "res"},
                {src: "../node_modules/open-iconic/sprite/sprite.svg",
                dest: "www/img/open-iconic"}
              ],
        code: {src: "www/js/app/index.js", dest: "www/js/app"}
    },
    lint: "src/www/js/app/**/*.js",
    "code-style": "src/www/js/app/**/*.js",
    serve: "build/www",
    watch: ["src/www/**/*"],
    reload: ["src/www/**/*.js"],
    aliases: {
        "$APP": "src/www/js/app",
        "$LIB": "src/www/js/lib",
        "$WIDGETS": "src/www/js/lib/templates/widgets",
        "$MODELS": "src/www/js/app/models",
        "$VIEWS": "src/www/js/app/views",
        "$CONTROLLERS": "src/www/js/app/controllers"
    }
}

module.exports = config;
