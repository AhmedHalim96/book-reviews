<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run() {
    $this->call(make_role_table_seeder::class);
    $this->call(make_user_table_seeder::class);

  }
}
