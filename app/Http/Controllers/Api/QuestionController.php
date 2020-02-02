<?php

namespace App\Http\Controllers\Api;

use App\Question;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Question::with('questionType')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $question = new Question();
        $question['title'] = $request['title'];
        $question['theme_id'] = $request['theme_id'];
        $question['question_type_id'] = $request['question_type_id'];
        $question->save();
        return "";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        $question = Question::with(['answerPossibilities', 'questionType'])->find($question['id']);
        return $question;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        $question['title'] = $request['title'];
        $question['theme_id'] = $request['theme_id'];
        $question['question_type_id'] = $request['question_type_id'];
        $question->save();
        return "updated";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->delete();
        return "deleted";
    }

}
