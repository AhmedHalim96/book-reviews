<?php

namespace App\Http\Controllers;

use App\Book;
use App\User;
use Illuminate\Http\Request;

class FavouriteController extends Controller {
  public function index(Request $request) {

    $user = User::find($request->user_id);
    $favourite_books = $user->favouriteBooks()->get();
    return $favourite_books;
  }
  public function store(Request $request, Book $book) {

    $user = User::find($request->user_id);
    $user->favouriteBooks()->syncWithoutDetaching([$book->id]);

    return response()->json([
      'success' => true,
    ]);
  }
  public function destroy(Request $request, Book $book) {
    User::find($request->user_id)->favouriteBooks()->detach($book);
    return response()->json([
      'success' => true,
    ]);

  }
  public function isFavourited(Request $request, Book $book) {
    if ($book->favouritedBy(User::find($request->user_id))) {
      return response()->json([
        'success' => true,
      ]);
    } else {
      return response()->json([
        'success' => false,
      ]);
    }
  }
}
