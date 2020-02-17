<?php

namespace App\Http\Controllers\Api;

use App\Answer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class AnswerController extends Controller
{
    public function store(Request $request)
    {
        $answer = new Answer();
        $answer['person_id'] = $request['person_id'];
        $answer['question_id'] = $request['question_id'];
        $answer['question_type_id'] = $request['question_type_id'];
        $answer['number_answer'] = $request['number_answer'];
        $answer['text_answer'] = $request['text_answer'];
        $answer->save();
        return "stored";
    }
}
