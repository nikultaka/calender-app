<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'id';
    protected $table = 'event';
    protected $fillable = [
        'DAY_TYPE', 'STR_STAFF_NBR', 'DATE', 'STARTTIME', 'ENDTIME', 'TXT_DAY_DESCRIPTION'
    ];
}
