<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EventTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event', function (Blueprint $table) {
            //
            $table->bigIncrements('id');
            $table->string('DAY_TYPE', 3);
            $table->string('STR_STAFF_NBR', 255);
            $table->date('DATE');
            $table->dateTime('STARTTIME');
            $table->dateTime('ENDTIME');
            $table->text('TXT_DAY_DESCRIPTION');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('event', function (Blueprint $table) {
            //
        });
    }
}
