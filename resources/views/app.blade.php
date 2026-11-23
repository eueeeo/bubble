<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Bubble</title>
    @vite(['resources/css/style.css', 'resources/js/app.js'])
</head>
<body class="bg-bubble-cream text-bubble-dark font-sans m-0 antialiased">
    <div id="app"></div>
</body>
</html>
