<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PersonFunction extends Model
{
    use SoftDeletes;

    protected $table = 'functions';

    public function person()
    {
        return $this->hasMany('App\Person');
    }

}
