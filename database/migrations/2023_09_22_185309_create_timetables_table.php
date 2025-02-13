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
        Schema::create('timetables', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('teacher')->nullable();
            $table->integer('type');
            $table->integer('week');
            $table->integer('day');
            $table->integer('lesson');
            $table->integer('auditory')->nullable();
            $table->integer('pgroup')->nullable();
            $table->timestamps();
        });

        // Create the pivot table for many-to-many relation
        Schema::create('group_timetable', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_id');
            $table->unsignedBigInteger('timetable_id');
            $table->timestamps();

            // Define foreign keys
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign('timetable_id')->references('id')->on('timetables')->onDelete('cascade');
        });

    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_timetable');
        Schema::dropIfExists('timetables');
    }
};
