<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Question;
use Illuminate\Http\Request;
use App\Theme;
use Illuminate\Support\Facades\Storage;

class ThemeController extends Controller
{
    public function index()
    {
        return Theme::all();
    }

    public function store(Request $request)
    {
        $theme = new Theme();
        $theme['title'] = $request['title'];
        $theme['description'] = $request['description'];
        $theme->save();

        if($request->file('file')) {
            $id = $theme['id'];
            $uploadedFile = $request->file('file');
            $fileName = "intro-image-theme-" . $id . "." . strtolower($uploadedFile->getClientOriginalExtension());
            $uploadedFile->storeAs('themes', $fileName);
            $theme['img'] = 'themes/' . $fileName;
        }

        $theme->save();

        return "";

    }

    public function show(int $id)
    {
        return Theme::find($id);
    }

    public function update(Request $request, int $id)
    {

        $theme = Theme::find($id);
        $theme['title'] = $request['title'];
        $theme['description'] = $request['description'];

        if($request->file('file')) {
            $uploadedFile = $request->file('file');
            $fileName = "intro-image-theme-" . $id . "." . strtolower($uploadedFile->getClientOriginalExtension());
            $uploadedFile->storeAs('themes', $fileName);
            $theme['img'] = 'themes/' . $fileName;
        }

        $theme->save();
        return "";
    }

    public function destroy($id)
    {

        $question = Question::where("theme_id", "=", $id)->first();

        if($question) {
            return [
                'status' => 'error',
                'message' => 'Das Thema konnte nicht gelöscht werden, da es mit Fragen verknüpft ist!'
            ];
        } else {
            $theme = Theme::find($id);
            $theme->delete();
            return [
                'status' => 'success',
                'message' => 'Das Thema wurde erfolgreich gelöscht!'
            ];
        }

    }

    public function showImage($id)
    {
        $theme = Theme::find($id);
        if($theme['img']) {
            $contents = Storage::get($theme['img']);
            header("Content-Type: image/jpg");
            echo $contents;
        } else {
            return "no Image found!";
        }
    }

    public function getQuestionsByTheme(int $theme)
    {
        return Theme::find($theme)->questions;
    }

}
