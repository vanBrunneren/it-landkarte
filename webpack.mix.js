const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .version()
    .sourceMaps();


mix.react('resources/js/app_public.js', 'public/js')
    .sass('resources/sass/app_public.scss', 'public/css')
    .version()
    .sourceMaps();

//mix.browserSync('it-landkarte.test');
