<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNumberSelectTexts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('number_select_texts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('question_id');
            $table->string('key');
            $table->string('text');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('number_select_texts', function (Blueprint $table) {
            //
        });
    }
}
