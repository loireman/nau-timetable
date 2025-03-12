<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tguser_group_relations', function (Blueprint $table) {
            $table->id();
            $table->string('telegram_id')->unique();
            $table->unsignedBigInteger('group_id');
            $table->integer('pgroup');
            $table->timestamps();

            $table->foreign('group_id')->references('id')->on('groups');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tguser_group_relations');
    }
};
