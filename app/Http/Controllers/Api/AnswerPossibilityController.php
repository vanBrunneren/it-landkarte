<?php

namespace App\Http\Controllers\Api;

use App\AnswerPossibility;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnswerPossibilityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AnswerPossibility::all();
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $answerPossibility = new AnswerPossibility();
        $answerPossibility['title'] = $request['title'];
        $answerPossibility['question_id'] = $request['question_id'];
        $answerPossibility->save();
        return "saved";
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return AnswerPossibility::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $answerPossibility = AnswerPossibility::find($id);
        $answerPossibility['title'] = $request['title'];
        $answerPossibility->save();
        return "updated";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AnswerPossibility  $answerPossibility
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $answerPossibility = AnswerPossibility::find($id);
        $answerPossibility->delete();
        $answerPossibility->save();
        return "deleted";
    }
}
