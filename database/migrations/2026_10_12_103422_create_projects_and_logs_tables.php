<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('status')->default('новый');
            $table->date('start_date')->nullable();
            $table->date('deadline')->nullable();
            $table->decimal('budget', 15, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('logs', function (Blueprint $table) {
            $table->id();
            $table->string('action');
            $table->string('entity_type')->default('Project');
            $table->unsignedBigInteger('entity_id')->nullable();
            $table->string('user_name')->default('Гость');
            $table->json('before_state')->nullable();
            $table->json('after_state')->nullable();
            $table->text('details')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('logs');
        Schema::dropIfExists('projects');
    }
};
