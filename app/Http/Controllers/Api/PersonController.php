<?php

namespace App\Http\Controllers\Api;

use App\Person;
use App\Customer;
use App\PersonFunction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index()
    {
        return Person::all();
    }

    public function customer($customer_id)
    {
        $people = Person::with('personFunction')->where('customer_id', '=', $customer_id)->get();
        return $people;
    }

    public function store(Request $request)
    {
        $person = new Person();
        $person['customer_id'] = $request['customer_id'];
        $person['sex'] = $request['sex'];
        $person['prename'] = $request['prename'];
        $person['name'] = $request['name'];
        $person['email'] = $request['email'];
        $person['function_id'] = $request['function_id'];
        $person['hash'] = md5($request['email']);
        $person->save();
        return "ja";
    }

    public function show(int $id)
    {
        return Person::with('personFunction')->find($id);
    }

    public function update(Request $request, $id)
    {
        $person = Person::find($id);
        $person['sex'] = $request['sex'];
        $person['prename'] = $request['prename'];
        $person['name'] = $request['name'];
        $person['email'] = $request['email'];
        $person['function_id'] = $request['function_id'];
        $person['hash'] = md5($request['email']);
        $person->save();
        return "";
    }

    public function destroy($id)
    {
        $person = Person::find($id);
        $person->delete();
        return "deleted";
    }

    public function personFunctions()
    {
        return PersonFunction::all();
    }

}
