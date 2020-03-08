<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExportController extends Controller
{
    public function confluence(int $id)
    {

        $user = Auth::user();
        $customer = Customer::find($id);

        $data = array(
            "type" => "page",
            "title" => "TEST API GEIL",
            "space" => array("key" => $customer['confluence_space']),
            "body" => array(
                "storage" => array(
                    "value" => "<p>This is <br /> a new page</p>",
                    "representation" => "storage"
                )
            )
        );

        $payload = json_encode($data);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_USERPWD, $user['confluence_email'].":".$user['confluence_token']);
        curl_setopt($ch, CURLOPT_URL, $customer['confluence_url'] . "/wiki/rest/api/content/");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            'Content-Length: ' .strlen($payload)
        ));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

        $data = curl_exec($ch);
        curl_close($ch);

        return json_decode($data);

    }
}
