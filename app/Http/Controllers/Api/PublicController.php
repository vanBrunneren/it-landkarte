<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Theme;
use App\Person;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PublicController extends Controller
{

    public function questions($hash)
    {
        $person = Person::where('hash', '=', $hash)->first();
        return Customer::find($person['customer_id'])->questions()->with(['answerPossibilities', 'questionType', 'numberSelectTexts', 'textinputFields', 'theme'])->get();
    }

    public function themes()
    {
        return Theme::all();
    }

    public function theme(int $id)
    {
        return Theme::find($id);
    }

    public function showImage($id)
    {
        $theme = Theme::find($id);
        header("Content-Type: image/jpg");
        if($theme['img']) {
            $contents = Storage::get($theme['img']);
            echo $contents;
        } else {
            echo "";
        }
    }

    public function checkhash($hash)
    {
        $person = Person::where('hash', '=', $hash)->first();
        if($person) return $person;
        else return null;
    }

    public function getPersonByHash($hash)
    {
        return Person::where('hash', '=', $hash)->first();
    }

    public function saveComment(Request $request)
    {
        $person = Person::where('hash', '=', $request['hash'])->first();
        $person->comment = $request['comment'];
        $person->finished = true;

        // Bestätigungsmail Endkunde
        //Mail::to(array( 'email' => $person['email'], 'name' => $person['prename'] . " " . $person['name']))
        //->send();

        /*
         * Notification für Admin
        $adminUser = [
            [
                'email' => 'pascal.brunner@gmx.ch',
                'name' => 'Pascal Brunner'
            ]
        ];
        Mail::to($adminUser)->send();*/

        $saved = $person->save();

        if($saved) {
            return [
                "status" => "success"
            ];
        } else {
            return [
                "status" => "error"
            ];
        }

    }

    public function checkFinish($hash)
    {
        $person = Person::where('hash', '=', $hash)->first();
        return $person->finished;

    }

    public function checkActive($hash)
    {
        $person = Person::where('hash', '=', $hash)->first();
        $customer = Customer::find($person['customer_id']);
        return $customer->active;
    }

}















