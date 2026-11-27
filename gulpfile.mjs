import { src, dest, watch, series, parallel } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import terser from "gulp-terser";
import plumber from "gulp-plumber";

const sass = gulpSass(dartSass);

// Configuración moderna para Dart Sass silenciando advertencias de Bootstrap
const sassOptions = {
  outputStyle: "compressed",
  silenceDeprecations: ["import", "color-functions", "global-builtin", "if-function"],
  loadPaths: ["node_modules"],
  includePaths: ["node_modules"],
};

// 1. Compilar SCSS a CSS
export function compileCss(done) {
  src("src/scss/app.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(dest("dist/css", { sourcemaps: "." }));
  done();
}

// 2. Procesar JavaScript
export function compileJs(done) {
  src("src/js/**/*.js", { allowEmpty: true })
    .pipe(plumber())
    .pipe(dest("dist/js"))
    .pipe(terser())
    .pipe(dest("dist/js"));
  done();
}

// 3. Watcher de desarrollo
export function watchFiles() {
  watch("src/scss/**/*.scss", compileCss);
  watch("src/js/**/*.js", compileJs);
}

// Tareas exportadas
export const build = parallel(compileCss, compileJs);
export const dev = series(build, watchFiles);
export default dev;
