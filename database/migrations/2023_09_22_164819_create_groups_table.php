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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();                       // КС-123 3к1п or КС-334
            $table->unsignedBigInteger('stream_id')->nullable();    // 1 (КС-123)
            $table->boolean('single_week')->default(false);
            $table->boolean('single_group')->default(false);

            $table->timestamps();

            $table->foreign('stream_id')->references('id')->on('streams')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
