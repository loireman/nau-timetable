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
        Schema::table('groups', function ($table) {
            $table->boolean('single_week')->after('substream_id')->default(false);
            $table->boolean('single_group')->after('single_week')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('groups', function ($table) {
            $table->dropColumn('single_week');
            $table->dropColumn('single_group');
        });
    }
};
