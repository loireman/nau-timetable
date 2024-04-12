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
        Schema::table('timetables', function ($table) {
            $table->string('auditory')->nullable()->change();
            $table->string('auditory_link')->after('auditory')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('timetables', function ($table) {
            $table->integer('auditory')->nullable()->change();
            $table->dropColumn('auditory_link');
        });
    }
};
