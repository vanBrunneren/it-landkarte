<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExportController extends Controller
{

    public function shortenUrl($url)
    {
        $data = array(
            "domain" => 'bit.ly',
            "long_url" => $url
        );

        $payload = json_encode($data);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://api-ssl.bitly.com/v4/shorten");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type: application/json",
            "Authorization: Bearer 70e5e6c7b94fdc6e5235f4a53b481c8ea203bb83",
            'Content-Length: ' .strlen($payload)
        ));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

        $data = curl_exec($ch);
        curl_close($ch);

        $output = json_decode($data);

        return $output->link;

    }

    public function confluence(Request $request, int $id)
    {

        $user = Auth::user();
        $customer = Customer::find($id);

        if(!$customer['confluence_space']) {
            return [
                "status" => "error",
                "message" => "Die Auswertung konnte nicht exportiert werden! Es ist kein Confluence Space gesetzt"
            ];
        }

        if(!$customer['confluence_url']) {
            return [
                "status" => "error",
                "message" => "Die Auswertung konnte nicht exportiert werden! Es ist keine Confluence Url gesetzt"
            ];
        }

        if(!$user['confluence_email']) {
            return [
                "status" => "error",
                "message" => "Die Auswertung konnte nicht exportiert werden! Es ist keine Confluence Email gesetzt"
            ];
        }

        if(!$user['confluence_token']) {
            return [
                "status" => "error",
                "message" => "Die Auswertung konnte nicht exportiert werden! Es ist kein Confluence Token gesetzt"
            ];
        }

        $outputHtml = '';

        $exportData = $request['exportData'];

        $textFields = $exportData['textFields'];
        $textSelects = $exportData['textSelects'];
        $smallNumberSelects = $exportData['smallNumberSelects'];
        $bigNumberSelects = $exportData['bigNumberSelects'];

        foreach($textSelects as $textSelect) {
            $outputHtml .= '<table><thead><tr>';
            foreach($textSelect['tableHeaders'] as $tableHeader) {
                $outputHtml .= '<th>'.htmlentities($tableHeader).'</th>';
            }
            $outputHtml .= '</tr></thead><tbody>';
            foreach($textSelect['tableRows'] as $tableRow) {
                $outputHtml .= '<tr>';
                foreach($tableRow as $tr) {
                    $outputHtml .= '<td>'.htmlentities($tr).'</td>';
                }
                $outputHtml .= '</tr>';
            }
            $outputHtml .= '</tbody></table>';
        }

        foreach($textFields as $textField) {

            $outputHtml .= '<table><thead><tr>';
            foreach($textField['tableHeaders'] as $tableHeader) {
                $outputHtml .= '<th>'.$tableHeader.'</th>';
            }

            $outputHtml .= '</tr></thead><tbody><tr>';
            foreach($textField['tableRows'] as $tableRow) {
                $outputHtml .= '<td>'.htmlentities($tableRow).'</td>';
            }
            $outputHtml .= '</tr></tbody></table>';

        }

        foreach($smallNumberSelects as $smallNumberSelect) {

            $outputHtml .= '<img src="'.$this->shortenUrl($smallNumberSelect['graph']).'" />';

            $outputHtml .= '<table><thead><tr>';
            foreach($smallNumberSelect['tableHeaders'] as $tableHeader) {
                $outputHtml .= '<th>' . $tableHeader . '</th>';
            }
            $outputHtml .= '</tr></thead><tbody>';

            foreach($smallNumberSelect['tableRows'] as $tableRow) {
                $outputHtml .= '<tr>';
                foreach($tableRow as $row) {
                    $outputHtml .= '<td>'.htmlentities($row).'</td>';
                }
                $outputHtml .= '</tr>';
            }
            $outputHtml .= '</tbody></table>';

        }

        foreach($bigNumberSelects as $bigNumberSelect) {

            $outputHtml .= '<table><thead><tr>';
            foreach($bigNumberSelect['tableHeaders'] as $tableHeader) {
                $outputHtml .= '<th>' . htmlentities($tableHeader) . '</th>';
            }
            $outputHtml .= '</tr></thead><tbody>';

            foreach($bigNumberSelect['tableRows'] as $tableRow) {
                $outputHtml .= '<tr>';
                foreach($tableRow as $row) {
                    $outputHtml .= '<td>'.htmlentities($row).'</td>';
                }
                $outputHtml .= '</tr>';
            }
            $outputHtml .= '</tbody></table>';

            $outputHtml .= '<img src="'.$this->shortenUrl($bigNumberSelect['graph']).'" />';

        }

        $outputHtml = str_replace("\r\n", "", $outputHtml);

        $data = array(
            "type" => "page",
            "title" => "Auswertung " . $customer['name'],
            "space" => array("key" => $customer['confluence_space']),
            "body" => array(
                "storage" => array(
                    "value" => $outputHtml,
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
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

        $data = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($data);

        if($data->statusCode == 400) {
            return [
                "status" => "error",
                "message" => "Die Auswertung konnte nicht exportiert werden! Es besteht bereits eine Auswertung mit demselben Namen"
            ];
        } else {
            return [
                "status" => "success",
                "message" => "Die Auswertung wurde erfolgreich exportiert!"
            ];
        }

    }
}
