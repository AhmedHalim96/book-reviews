<?php

namespace App\Http\Middleware;

use Exception;

use Closure;
use JWTAuth;

class jwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = JWTAuth::parseToken()->authenticate();
        // var_dump($request->token);
        // die();
        try {
           
            $user = JWTAuth::parseToken()->authenticate();
            
            
        } catch (Exception $e) {

            
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                
                return response()->json(['error'=>'Token is Invalid']);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                
                return response()->json(['error'=>'Token is Expired']);
            }else{
                
                return response()->json(['error'=>'Something is wrong']);
            }
        }
        return $next($request);
    }
}
