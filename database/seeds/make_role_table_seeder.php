<?php

use App\Role;
use Illuminate\Database\Seeder;

class make_role_table_seeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $role_admin = new Role();
    $role_admin->name = "Admin";
    $role_admin->description = "Admin account";
    $role_admin->save();

    $role_editor = new Role();
    $role_editor->name = "Editor";
    $role_editor->description = "Editor account";
    $role_editor->save();

    $role_subscriber = new Role();
    $role_subscriber->name = "Subscriber";
    $role_subscriber->description = "Subscriber account";
    $role_subscriber->save();

  }
}
