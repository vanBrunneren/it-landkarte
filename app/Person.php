<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Person extends Model
{
    use SoftDeletes;

    protected $table = 'people';

    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }

    public function personFunction()
    {
        return $this->belongsTo('App\PersonFunction', 'function_id');
    }

}
