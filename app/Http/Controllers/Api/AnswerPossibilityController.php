<?php

namespace App\Http\Controllers\Api;

use App\AnswerPossibility;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnswerPossibilityController extends Controller
{

    public function index()
    {
        return AnswerPossibility::all();
    }

    public function store(Request $request)
    {
        $answerPossibility = new AnswerPossibility();
        $answerPossibility['title'] = $request['title'];
        $answerPossibility['question_id'] = $request['question_id'];
        $answerPossibility->save();
        return "saved";
    }

    public function show(int $id)
    {
        return AnswerPossibility::find($id);
    }

    public function update(Request $request, int $id)
    {
        $answerPossibility = AnswerPossibility::find($id);
        $answerPossibility['title'] = $request['title'];
        $answerPossibility->save();
        return "updated";
    }

    public function destroy(int $id)
    {
        $answerPossibility = AnswerPossibility::find($id);
        $answerPossibility->delete();
        $answerPossibility->save();
        return "deleted";
    }
}
