<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTovaryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tovaries', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('body');
            $table->string('slug');
            $table->integer('property1');
            $table->smallInteger('property2');
            $table->decimal('price', 6, 2);
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
        Schema::dropIfExists('tovaries');
    }
}
