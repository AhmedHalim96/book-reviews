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

Route::get('/', function () {
  return view('home');
});

// Auth::routes();

Route::resource('books', 'BookController');
// Route::get('/dashboard', 'DashboardController@index')->name('dashboard');
Route::post('books/favourites', 'FavouriteController@index');
Route::post('books/{book}/favourites', 'FavouriteController@store');
Route::post('books/{book}', 'FavouriteController@isFavourited');
Route::delete('books/{book}/favourites', 'FavouriteController@destroy');

Route::view('/{path?}', 'home')
  ->where('path', '.*')
  ->name('react');
