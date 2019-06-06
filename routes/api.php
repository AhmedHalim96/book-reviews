<?php

use Illuminate\Http\Request;
use App\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group(['middleware' => ['jwt-auth','api-header','roles'], "roles"=>"Admin"], function () {

    // all routes to protected resources are registered here  
    Route::get('users/list',function(){
            $users = App\User::all()->toArray();
            $users =  array_map(function($user){
               $role=User::find($user['id'])->roles->first()->name;
                return ['id'=>$user['id'], 'name' =>$user['name'], 'email' =>$user['email'],"role" =>$role];
            }, $users);
            $response = ['success'=>true, 'users'=>$users];
            return response()->json($response, 201);
        });
    Route::post('user/role','UserController@adminAssignRoles');
});

Route::group(['middleware' => 'api-header'], function () {
  
    // The registration and login requests doesn't come with tokens 
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});