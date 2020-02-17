<?php

namespace App\Http\Controllers\Api;

use App\Person;
use App\Customer;
use App\PersonFunction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Person::all();
    }

    public function customer($customer_id)
    {
        $people = Person::with('personFunction')->where('customer_id', '=', $customer_id)->get();
        return $people;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return Person::with('personFunction')->find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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
