<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{

    public function index()
    {
        return Customer::all();
    }

    public function create()
    {
        return response()->json([
            'create customer'
        ]);
    }

    public function store(Request $request)
    {
        $customer = new Customer();
        $customer['name'] = $request['name'];
        $customer['street'] = $request['street'];
        $customer['house_number'] = $request['houseNumber'];
        $customer['plz'] = $request['plz'];
        $customer['city'] = $request['city'];
        $customer->save();
        return $customer;
    }

    public function show(customer $customer)
    {
        return Customer::with(['people', 'people.personFunction'])->find($customer['id']);
    }

    public function edit(customer $customer)
    {
        return $customer;
    }

    public function update(Request $request, int $id)
    {

        $customer = Customer::find($id);

        $customer['name'] = $request['name'];
        $customer['street'] = $request['street'];
        $customer['house_number'] = $request['houseNumber'];
        $customer['plz'] = $request['plz'];
        $customer['city'] = $request['city'];
        $customer['confluence_space'] = $request['confluenceSpace'];
        $customer['confluence_url'] = $request['confluenceUrl'];

        if($request->file('file')) {
            $uploadedFile = $request->file('file');
            $fileName = "customer-logo-image-" . $customer['id'] . "." . strtolower($uploadedFile->getClientOriginalExtension());
            $uploadedFile->storeAs('customers', $fileName);
            $customer['img'] = 'customers/' . $fileName;
        }

        $customer->save();
        return $customer;
    }

    public function destroy(customer $customer)
    {
        $customer->delete();
        return "deleted";
    }

    public function showImage($id)
    {
        $customer = Customer::find($id);
        if($customer['img']) {
            $contents = Storage::get($customer['img']);
            header("Content-Type: image/jpg");
            echo $contents;
        } else {
            return "no Image found!";
        }
    }

}
