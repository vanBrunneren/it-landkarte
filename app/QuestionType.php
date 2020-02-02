<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuestionType extends Model
{
    use SoftDeletes;

    public function questions()
    {
        return $this->hasMany('App\Question');
    }

}
