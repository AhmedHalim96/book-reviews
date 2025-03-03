<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRoleTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('role_user', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->timestamps();
      $table->bigInteger('user_id');
      $table->bigInteger('role_id');

    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('role_user');
  }
}
