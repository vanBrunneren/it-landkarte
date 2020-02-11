<?php

namespace App\Http\Controllers\Api;

use App\Question;
use App\Theme;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PublicController extends Controller
{

    public function questions()
    {
        return Question::with(['answerPossibilities', 'questionType', 'numberSelectTexts', 'textinputFields', 'theme'])->get();
    }

    public function themes()
    {
        return Theme::all();
    }

}
