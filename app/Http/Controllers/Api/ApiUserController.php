<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ApiUserController extends Controller
{
    public function show()
    {

        // reCaptcha AuthKey = 6LfWU-QUAAAAAAucANvV5QixnQ7kZNLH02GaHq3Y
        // reCaptcha Secret = 6LfWU-QUAAAAAKDjS7mftdZy27OLcf9gSnAm5oBW

        return Auth::user();
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $user['name'] = $request['name'];
        $user['email'] = $request['email'];
        $user['confluence_email'] = $request['confluenceEmail'];
        $user['confluence_token'] = $request['confluenceToken'];
        if($request['password']) {
            $user['password'] = bcrypt($request['password']);
        }
        $saved = $user->save();

        if($saved) {
            return [
                "status" => "success",
                "message" => "Die Benutzerdaten wurden erfolgreich gespeichert!"
            ];
        } else {
            return [
                "status" => "error",
                "message" => "Die Benutzerdaten konnten nicht gespeichert werden!"
            ];
        }

    }

}
