<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject {
  use Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $_fillable = [
    'name', 'email', 'password', 'auth_token',
  ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $_hidden = [
    'password', 'remember_token',
  ];

  /**
   * The attributes that should be cast to native types.
   *
   * @var array
   */
  protected $_casts = [
    'email_verified_at' => 'datetime',
  ];
  /**
   * Get the identifier that will be stored in the subject claim of the JWT.
   *
   * @return mixed
   */
  public function getJWTIdentifier() {
    return $this->getKey();
  }
  /**
   * Return a key value array, containing any custom claims to be added to the JWT.
   *
   * @return array
   */
  public function getJWTCustomClaims() {
    return [];
  }
  public function favouriteBooks() {
    return $this->morphedByMany(Book::class, 'favouriteable')
      ->withPivot(['created_at'])
      ->orderBy('pivot_created_at', 'desc');
  }
  public function roles() {
    return $this->belongsToMany('App\Role');
  }

  public function hasAnyRole($roles) {
    if (is_array($roles)) {
      foreach ($roles as $role) {
        if ($this->hasRole($role)) {
          return true;
        }
      }
    } else {
      if ($this->hasRole($roles)) {
        return true;
      }
    }
    return false;
  }

  public function hasRole($role) {
    if ($this->roles()->where('name', $role)->first()) {
      return true;
    }
    return false;
  }

  public function books()
  {
      return $this->hasMany('App\Book');
  }
}
