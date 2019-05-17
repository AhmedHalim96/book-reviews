<?php
namespace App\Http\Controllers;
use App\User;
use App\Role;
use Illuminate\Http\Request;
use JWTAuth;
use JWTAuthException;

class UserController extends Controller {
  private function getToken($email, $password) {
    $token = null;
    //$credentials = $request->only('email', 'password');
    try {
      if (!$token = JWTAuth::attempt(['email' => $email, 'password' => $password])) {
        return response()->json([
          'response' => 'error',
          'message' => 'Password or email is invalid',
          'token' => $token,
        ]);
      }
    } catch (JWTAuthException $e) {
      return response()->json([
        'response' => 'error',
        'message' => 'Token creation failed',
      ]);
    }
    return $token;
  }
  public function login(Request $request) {
    $user = \App\User::where('email', $request->email)->get()->first();
    if ($user && \Hash::check($request->password, $user->password)) // The passwords match...
    {
      $token = self::getToken($request->email, $request->password);
      $user->auth_token = $token;
      $user->save();
    $response = ['success' => true, 'data' => ['id' => $user->id, 'auth_token' => $user->auth_token, 'name' => $user->name, 'email' => $user->email, "role" =>$user->roles->first()->name]];
    } else {
      $response = ['success' => false, 'data' => 'Record doesnt exists'];
    }

    return response()->json($response, 201);
  }
  public function register(Request $request) {    
    $user = new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = \Hash::make($request->password);


    if ($user->save()) {
      $token = self::getToken($request->email, $request->password); // generate user token

      if (!is_string($token)) {
        return response()->json(['success' => false, 'data' => 'Token generation failed'], 201);
      }

      $user = \App\User::where('email', $request->email)->get()->first();

      $user->auth_token = $token; // update user token

      $user->save();
      $user->roles()->attach(Role::where('name', 'Subscriber')->first());

      $response = ['success' => true, 'data' => ['name' => $user->name, 'id' => $user->id, 'email' => $request->email, 'auth_token' => $token , "role" =>$user->roles->first()->name]];
    } else {
      $response = ['success' => false, 'data' => 'Couldnt register user'];
    }

    return response()->json($response, 201);
  }
  public function getUserInfo(Request $request)
  {
    $user = User::find($request->user_id);
    $response = ['success' => true, 'data' => ['name' => $user->name, 'id' => $user->id, 'email' => $user->email, 'auth_token' => $user->token , "role" =>$user->roles->first()->name]];
    return $response;
  }
}