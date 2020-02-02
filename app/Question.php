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

    public function type()
    {
        return $this->belongsTo('App\QuestionType');
    }

}
