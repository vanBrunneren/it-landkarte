<?php

namespace App\Http\Controllers\Api;

use App\Answer;
use App\NumberSelectTexts;
use App\Question;
use App\Http\Controllers\Controller;
use App\TextinputFields;
use App\Theme;
use Illuminate\Http\Request;


class QuestionController extends Controller
{
    public function index()
    {
        return Question::with('questionType')->get();
    }

    public function store(Request $request)
    {
        $question = new Question();
        $question['header'] = $request['header'];
        $question['title'] = $request['title'];
        $question['theme_id'] = $request['theme_id'];
        $question['question_type_id'] = $request['question_type_id'];
        $question->save();
        return $question;
    }

    public function show(Question $question)
    {
        $question = Question::with(['answerPossibilities', 'questionType', 'numberSelectTexts', 'textinputFields'])->find($question['id']);

        if($question) {

            $answer = Answer::where('question_id', '=', $question['id'])->first();
            if($answer) {
                $question['disabled'] = true;
            } else {
                $question['disabled'] = false;
            }

            return [
                "status" => "success",
                "data" => $question
            ];
        } else {
            return [
                "status" => "error",
                "data" => array("message" => "Die Frage konnte nicht gefunden werden!")
            ];
        }


    }

    public function update(Request $request, Question $question)
    {
        $question['header'] = $request['header'];
        $question['title'] = $request['title'];
        $question['theme_id'] = $request['theme_id'];
        $question['question_type_id'] = $request['question_type_id'];
        $question->save();

        return "updated";
    }

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
