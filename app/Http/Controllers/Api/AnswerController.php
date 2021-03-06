<?php

namespace App\Http\Controllers\Api;

use App\Answer;
use App\Customer;
use App\Person;
use App\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class AnswerController extends Controller
{
    public function store(Request $request)
    {
        $person = Person::where('hash', '=', $request['hash'])->first();

        $answer = Answer::where([
            ['person_id', '=', $person['id']],
            ['question_id', '=', $request['question_id']]
        ])->first();

        if(!$answer) {
            $answer = new Answer();
            $answer['person_id'] = $person['id'];
            $answer['question_id'] = $request['question_id'];
            $answer['question_type_id'] = $request['question_type_id'];
        }

        $answer['number_answer'] = $request['number_answer'];
        $answer['text_answer'] = $request['text_answer'];
        $answer->save();
        return "stored";
    }

    public function index()
    {
        return Answer::with(['person', 'question', 'questionType'])->get();
    }

    public function getAnswerByHashAndId(int $questionId, string $hash)
    {
        $person = Person::where('hash', '=', $hash)->first();
        $answer = Answer::where([
            ['person_id', '=', $person['id']],
            ['question_id', '=', $questionId]
        ])->first();

        return $answer;

    }

    public function getAnswersGroupedByCustomers(string $id)
    {
        $customer = Customer::with('people')->find($id);
        $questions = Question::with(['questionType', 'answerPossibilities', 'theme'])->get();

        $answerArray = array();

        foreach($questions as $question) {

            foreach($customer['people'] as $person) {

                $answer = Answer::with(['person', 'person.personFunction'])->where([
                    ['question_id', '=', $question['id']],
                    ['person_id', '=', $person['id']]
                ])->first();

                if($answer) {
                    $answerArray[$question['id']]['question'] = $question;
                    $answerArray[$question['id']]['answers'][] = $answer;
                }

            }

        }

        $result = array();
        foreach($answerArray as $item) {
            $result[] = $item;
        }

        return $result;

    }

}






















