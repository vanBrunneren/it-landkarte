<?php

namespace App\Http\Controllers\Api;

use App\QuestionType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QuestionTypeController extends Controller
{
    public function index()
    {
        return QuestionType::all();
    }

    public function getQuestionsByType(int $type)
    {
        return QuestionType::find($type)->questions;
    }

}
