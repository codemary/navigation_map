var gulp = require("gulp"),
    browserify = require("browserify"),
    stringify = require("stringify"),
    uglify = require('gulp-uglify'),
    source = require("vinyl-source-stream"),
    buffer = require('vinyl-buffer');

gulp.task("browserify", function () {
    var bundleMethod = browserify; //global.isWatching ? watchify : browserify;

    var bundler = bundleMethod({
        // Specify the entry point of your app
        entries: ["./src/app.js"]
    });

    var bundle = function () {
        return (
            bundler
                .transform(stringify([".html"]))
                // Enable source maps!
                .bundle()
                // Use vinyl-source-stream to make the
                // stream gulp compatible. Specifiy the
                // desired output filename here.
                .pipe(source("app.min.js"))
                .pipe(buffer())
                .pipe(uglify())
                // Specify the output destination
                .pipe(gulp.dest("./dest/"))
        );
    };

    return bundle();
});

gulp.task("default", ["browserify"]);