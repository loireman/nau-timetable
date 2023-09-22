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
            $table->unsignedBigInteger('substream_id')->nullable(); // 0 (КС-123) or id (КС-123 3к1п)

            $table->timestamps();

            $table->foreign('stream_id')->references('id')->on('streams')->onDelete('cascade');
            $table->foreign('substream_id')->references('id')->on('groups')->onDelete('cascade');
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
