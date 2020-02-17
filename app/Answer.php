<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Answer extends Model
{
    use SoftDeletes;

    public function person()
    {
        return $this->belongsTo('App\Person');
    }

    public function question()
    {
        return $this->belongsTo('App\Question');
    }

    public function questionType()
    {
        return $this->belongsTo('App\QuestionType');
    }

}
