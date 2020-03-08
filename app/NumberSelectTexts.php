<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NumberSelectTexts extends Model
{
    use SoftDeletes;

    public function question()
    {
        return $this->belongsTo('App\Question');
    }
}
