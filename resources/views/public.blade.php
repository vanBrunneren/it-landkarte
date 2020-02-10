<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
    />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>IT Landkarte</title>

    <!-- Scripts -->
    <script src="{{ asset(mix('js/app_public.js')) }}" defer></script>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

    <!-- Styles -->
    <link href="{{ asset('css/app_public.css') }}" rel="stylesheet">

    <style>
        html, body {
            height: 100%;
        }

        #app {
            height: 100%;
        }
    </style>

</head>
<body>
    <div id="app"></div>
</body>
</html>
