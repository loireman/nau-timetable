<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('zakazies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_klienta');
            $table->foreign('id_klienta')->references('id')->on('users');
            $table->unsignedBigInteger('id_tov');
            $table->foreign('id_tov')->references('id')->on('tovaries');
            $table->integer('count_tov')->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('zakazies');
    }
};
