<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Book extends Model
{
    public function favourites() 
{
    return $this->morphToMany(User::class, 'favouriteable');
}
public function favouritedBy(User $user)
{
	return $this->favourites->contains($user);
}
public function user()
{
    return $this->belongsTo('App\User');
}
}
