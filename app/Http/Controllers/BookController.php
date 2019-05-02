<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $books = Book::orderBy('created_at', 'desc')->get();
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
    $path = $img->storeAs('public/featured_images', $filename);
    $book = new Book;
    $book->name = $request->name;
    $book->book_author = $request->book_author;
    $book->book_score = $request->book_score;
    $book->review_text = $request->review_text;
    $book->featured_image = $filename;
    $book->save();
    return $book;

  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $book = Book::find($id);
    return $book;
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
    $book->delete();
    return $book;
  }

}
