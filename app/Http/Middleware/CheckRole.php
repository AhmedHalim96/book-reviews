<?php
namespace App\Http\Middleware;
use Closure;
use App\User;


class CheckRole {
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next) {
    $user = User::find($request->user_id);
    if ($user === null) {
      return response("Insufficient permissions", 401);
    }
    $actions = $request->route()->getAction();
    $roles = isset($actions['roles']) ? $actions['roles'] : null;
    if ($user->hasAnyRole($roles) || !$roles) {
      return $next($request);
    }
    return response("Insufficient permissions", 401);
  }
}