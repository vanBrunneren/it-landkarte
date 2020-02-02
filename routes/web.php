<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('public/test', function() {
    // /storage/test.txt
    return Storage::url('test.txt');
});

Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Auth::routes();

Route::middleware('auth')->group(function () {

    /*
    Route::post('api/testupload', function() {
        dd(request()->all());
        request()->file('file')->store('test');
        return "hallo";
    });*/

    // Custom Routes
    Route::get('api/persons/functions', 'Api\PersonController@personFunctions');
    Route::get('api/persons/customer/{id}', 'Api\PersonController@customer');

    // WTF why is PUT not working with Images? -____-
    //Route::apiResource('api/themes', 'Api\ThemeController');
    Route::get('api/themes', 'Api\ThemeController@index');
    Route::get('api/themes/{id}', 'Api\ThemeController@show');
    Route::post('api/themes', 'Api\ThemeController@store');
    Route::get('api/themes/{id}/image', 'Api\ThemeController@showImage');
    Route::post('api/themes/{id}', 'Api\ThemeController@update');
    Route::delete('api/themes/{id}', 'Api\ThemeController@destroy');

    // CRUD Routes (must be under the custom routes)
    Route::apiResource('api/customers', 'Api\CustomerController');
    Route::apiResource('api/persons', 'Api\PersonController');


    // Has to be the last entry ========
    Route::get( '{any}', function () {
        return view('app');
    })->where('any', '.*');
});
