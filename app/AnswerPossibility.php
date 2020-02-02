<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnswerPossibility extends Model
{
    use SoftDeletes;

    protected $table = 'answer_possibilities';
}
