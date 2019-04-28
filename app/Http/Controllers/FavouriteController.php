<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Favourite;
class FavouriteController extends Controller
{
    public function index(Request $request)
    {
        
        // return $request;
         $user_id = $request->user_id;
        $favourite_books = Favourite::where('user_id',$user_id)->orderBy('created_at','DESC')->get();
        return $favourite_books;
    }
    public function create(Request $request)
    {
        // return $request;
        $favourite = new Favourite;
        $favourite->book_id = $request->book_id;
        $favourite->user_id = $request->user_id;
        $favourite->save();
        return "Success";

    }
    public function destroy(Request $request)
    {
        // return $request;
        $favourite = Favourite::where([['user_id',"=",$request->user_id],['book_id', "=",$request->book_id]])->first();
        $favourite->delete();
        return "Deleted";

    }
}
