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


Route::get('books', 'BookController@index');
Route::get('books/{id}', 'BookController@show');

Route::group(['middleware'=> 'roles', 'roles'=>['Admin', 'Editor']], function () {
  Route::post('books', 'BookController@store');
  Route::delete('books/{id}', 'BookController@destroy');
  Route::patch('books/{id}', 'BookController@update');
});

  Route::group(['middleware'=> 'roles', 'roles'=>['Admin', 'Editor', 'Subscriber']], function () {
    Route::post('books/favourites', 'FavouriteController@index');
    Route::post('books/favourites/add', 'FavouriteController@store');
    Route::post('books/{book}', 'FavouriteController@isFavourited');
    Route::delete('books/favourites/remove', 'FavouriteController@destroy');
  });


Route::view('/{path?}', 'home')
  ->where('path', '.*')
  ->name('react');
