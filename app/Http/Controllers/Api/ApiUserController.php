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
        return Auth::user();
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $user['name'] = $request['name'];
        $user['email'] = $request['email'];
        $user['confluence_email'] = $request['confluenceEmail'];
        $user['confluence_token'] = $request['confluenceToken'];
        $user->save();
        return "updated";
    }

}
