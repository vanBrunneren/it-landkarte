<?php

namespace App\Http\Controllers\Api;

use App\PersonFunction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PersonFunctionController extends Controller
{

    public function index()
    {
        return PersonFunction::all();
    }

    public function store(Request $request)
    {
        $personFunction = new PersonFunction();
        $personFunction['name'] = $request['name'];
        $personFunction->save();
        return "saved";
    }

    public function destroy(int $id)
    {
        $personFunction = PersonFunction::find($id);
        $personFunction->delete();
        return "deleted";
    }
}
