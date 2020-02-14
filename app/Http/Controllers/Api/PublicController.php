<?php

namespace App\Http\Controllers\Api;

use App\Question;
use App\Theme;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class PublicController extends Controller
{

    public function questions()
    {
        return Question::with(['answerPossibilities', 'questionType', 'numberSelectTexts', 'textinputFields', 'theme'])->get();
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

}
