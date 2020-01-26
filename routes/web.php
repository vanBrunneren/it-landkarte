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
    return "Public Test";
});

Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Auth::routes();

Route::middleware('auth')->group(function () {

    Route::apiResource('api/customers', 'Api\CustomerController');

    Route::get('api/persons/customer/{id}', 'Api\PersonController@customer');
    Route::apiResource('api/persons', 'Api\PersonController');

    // Has to be the last entry ========
    Route::get( '{any}', function () {
        return view('app');
    })->where('any', '.*');
});
