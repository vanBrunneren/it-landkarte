<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Theme;

class ThemeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Theme::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $theme = new Theme();
        $theme['title'] = $request['title'];
        $theme['description'] = $request['description'];
        $theme->save();

        $id = $theme['id'];
        $uploadedFile = $request->file('file');
        $fileName = "intro-image-theme-" . $id . "." . strtolower($uploadedFile->getClientOriginalExtension());
        $uploadedFile->storeAs('themes', $fileName);

        $theme['img'] = 'themes/' . $fileName;
        $theme->save();

        return "";

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return Theme::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $uploadedFile = $request->file('file');
        $fileName = "intro-image-theme-" . $id . "." . strtolower($uploadedFile->getClientOriginalExtension());
        $uploadedFile->storeAs('themes', $fileName);

        $theme = Theme::find($id);
        $theme['title'] = $request['title'];
        $theme['description'] = $request['description'];
        $theme['img'] = 'themes/' . $fileName;
        $theme->save();

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
        $theme = Theme::find($id);
        $theme->delete();
        return "deleted";
    }

    public function showImage($id)
    {
        $theme = Theme::find($id);
        $contents = \Storage::get($theme['img']);
        header("Content-Type: image/jpg");
        echo $contents;
    }

}
