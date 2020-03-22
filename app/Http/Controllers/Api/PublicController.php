<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Theme;
use App\Person;
use App\Http\Controllers\Controller;
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

}
