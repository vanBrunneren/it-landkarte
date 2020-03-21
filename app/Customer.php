<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    public function people()
    {
        return $this->hasMany('App\Person');
    }

    public function questions()
    {
        return $this->belongsToMany('App\Question');
    }

}
