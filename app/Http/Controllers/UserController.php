<?php
namespace App\Http\Controllers;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use JWTAuth;
use JWTAuthException;
use JWTFactory;

class UserController extends Controller {
  private function getToken($email, $password, $rememberMe = false) {
    $token = null;
    //$credentials = $request->only('email', 'password');

    try {
      if ($rememberMe) {
        JWTFactory::setTTL(10080);
        $token = JWTAuth::attempt(['email' => $email, 'password' => $password]);

      } else {
        $token = JWTAuth::attempt(['email' => $email, 'password' => $password]);

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
      $token = self::getToken($request->email, $request->password, $request->rememberMe);
      $user->auth_token = $token;
      $user->save();
      $response = ['success' => true, 'data' => ['id' => $user->id, 'token' => $user->auth_token, 'name' => $user->name, 'email' => $user->email, "role" => $user->roles->first()->name]];
    } else {
      $response = ['success' => false, 'msg' => 'Wrong Email or Password'];
    }

    return response()->json($response, 201);
  }

  public function register(Request $request) {
    // Verifying Email is not used
    if (User::where('email', $request->email)->get()->first()) {
      return ['success' => false, 'msg' => 'Email is Already Used!'];
    };
    $user = new User();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = \Hash::make($request->password);
    if ($user->save()) {
      $token = self::getToken($request->email, $request->password); // generate user token

      if (!is_string($token)) {
        return response()->json(['success' => false, 'msg' => 'Token generation failed'], 201);
      }

      $user = \App\User::where('email', $request->email)->get()->first();

      $user->auth_token = $token; // update user token

      $user->save();
      $user->roles()->attach(Role::where('name', 'Subscriber')->first());

      $response = ['success' => true, 'data' => ['name' => $user->name, 'id' => $user->id, 'email' => $request->email, 'auth_token' => $token, "role" => $user->roles->first()->name]];
    } else {
      $response = ['success' => false, 'msg' => 'Couldnt register user'];
    }

    return response()->json($response, 201);
  }

  public function adminAssignRoles(Request $request) {
    $user = User::find($request->targeted_user);
    $user->roles()->detach();
    $user->roles()->attach(Role::where('name', $request->role)->first());
    return ["success" => true];
  }

}