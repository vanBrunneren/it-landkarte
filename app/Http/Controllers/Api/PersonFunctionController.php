<?php

namespace App\Http\Controllers\Api;

use App\PersonFunction;
use App\Person;
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
        $person = Person::where("function_id", "=", $id)->first();

        if($person) {
           return [
               "status" => "error",
               "message" => "Diese Funktion kann nicht gelöscht werden, da es Personen gibt, welche damit verknüpft sind!"
           ];
        } else {
            $personFunction = PersonFunction::find($id);
            $personFunction->delete();
            return [
                "status" => "success",
                "message" => "Diese Funktion wurde erfolgreich gelöscht!"
            ];
        }
    }
}
