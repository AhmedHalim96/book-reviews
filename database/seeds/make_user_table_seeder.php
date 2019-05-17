<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;

class make_user_table_seeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $role_subscriber = Role::where('name', 'Subscriber')->first();
    $role_editor = Role::where('name', 'Editor')->first();
    $role_admin = Role::where('name', 'Admin')->first();

    $user = new User();
    $user->name = 'Victor';
    $user->email = 'visitor@example.com';
    $user->password = bcrypt('visitor');
    $user->save();
    $user->roles()->attach($role_subscriber);

    $user = new User();
    $user->name = 'Visitor';
    $user->email = 'tetst@example.com';
    $user->password = bcrypt('visitor');
    $user->save();
    $user->roles()->attach($role_editor);

    $user = new User();
    $user->name = 'ahemd';
    $user->email = 'ahmed@example.com';
    $user->password = bcrypt('123');
    $user->save();
    $user->roles()->attach($role_admin);

  }
}
