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

Route::get('/', function ()
{
  return view('home');
});

// Auth::routes();
Route::resource('books', 'BookController');
// Route::get('/dashboard', 'DashboardController@index')->name('dashboard');
Route::post('favourites/view', 'FavouriteController@index');
Route::post('favourites/create', 'FavouriteController@create');
Route::post('favourites/delete', 'FavouriteController@destroy');


Route::view('/{path?}', 'home')
     ->where('path', '.*')
     ->name('react');
