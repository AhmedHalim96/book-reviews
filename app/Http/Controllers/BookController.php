<?php

namespace App\Http\Controllers;

use App\Book;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $books = Book::orderBy('created_at', 'desc')->get()->toArray();

    $books = array_map(function ($book) {
      $review_author = Book::find($book['id'])->user()->first()->name;
      $book['review_author'] = $review_author;
      return $book;
    }, $books);

    return $books;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $img = $request->file('featured_image');
    $filename = time() . $img->getClientOriginalName();
    $filename = str_replace(' ', '-', $filename);
    if ($img->storeAs('public/featured_images', $filename)) {
      $book = new Book;
      $book->name = $request->name;
      $book->book_author = $request->book_author;
      $book->book_score = $request->book_score;
      $book->review_text = $request->review_text;
      $book->featured_image = $filename;
      $book->user_id = $request->user_id;
      $book->save();
      return $book;
    } else {
      return ['status' => 500, "msg" => "Internal Server Error"];
    }

  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    if ($book = Book::find($id)) {
      $review_author = $book->user()->first()->name;
      $book->review_author = $review_author;

      // REMOVING USER_ID FROM BOOK FOR SECURITY REASONS
      // unset($book->user_id);

      return ['status' => 'found', 'book' => $book];
    };
    return ['status' => 404, "msg" => "Book Not Found"];

  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $book = Book::find($id);
    $book->name = $request->name;
    $book->book_author = $request->book_author;
    $book->book_score = $request->book_score;
    $book->review_text = $request->review_text;
    if ($request->file('featured_image')) {

      $img = $request->file('featured_image');
      $filename = time() . $img->getClientOriginalName();
      $filename = str_replace(' ', '-', $filename);
      $path = $img->storeAs('public/featured_images', $filename);
      $book->featured_image = $filename;
    }

    $book->save();
    return $book;

  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $book = Book::find($id);
    // return unlink(storage_path("public/featured_images/".$book->featured_image));
    Storage::delete("public/featured_images/" . $book->featured_image);
    if ($book->delete()) {
      return $book;
    }

  }

}
