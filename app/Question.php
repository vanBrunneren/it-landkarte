<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes;

    public function theme()
    {
        return $this->belongsTo('App\Theme');
    }

    public function questionType()
    {
        return $this->belongsTo('App\QuestionType');
    }

    public function answerPossibilities()
    {
        return $this->hasMany('App\AnswerPossibility');
    }

    public function numberSelectTexts()
    {
        return $this->hasMany('App\NumberSelectTexts');
    }

    public function textinputFields()
    {
        return $this->hasMany('App\TextinputFields');
    }

}
