<?php

namespace App\Http\Controllers\Api;

use App\NumberSelectTexts;
use App\Question;
use App\Http\Controllers\Controller;
use App\TextinputFields;
use App\Theme;
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
        $question = Question::with(['answerPossibilities', 'questionType', 'numberSelectTexts', 'textinputFields'])->find($question['id']);
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

    public function changeNumberSelectText(Request $request)
    {
        $text = NumberSelectTexts::find($request['id']);
        if(!$text) {
            $text = new NumberSelectTexts();
            $text['question_id'] = $request['questionId'];
            $text['key'] = $request['key'];
        }
        $text['text'] = $request['text'];
        $text->save();
        return "yes";
    }

    public function addTextField(Request $request)
    {
        $textField = new TextinputFields();
        $textField['question_id'] = $request['questionId'];
        $textField['title'] = $request['text'];
        $textField->save();
        return "yes";
    }

    public function removeTextField(Request $request, int $id)
    {
        $textField = TextinputFields::find($id);
        $textField->delete();
        return "yes";
    }

    public function getQuestionsGroupByTheme()
    {
        return Theme::with(['questions', 'questions.questionType'])->get();
    }

}
