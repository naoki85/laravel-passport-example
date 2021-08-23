<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';

Route::get('logout', '\App\Http\Controllers\Auth\AuthenticatedSessionController@destroy');

Route::get('/redirect', function (Request $request) {
    $request->session()->put('state', $state = Str::random(40));

    $query = http_build_query([
        'client_id' => config('app.oauth2_client_id'),
        'redirect_uri' => 'http://localhost:3000/auth/callback',
        'response_type' => 'code',
        'scope' => '',
        'state' => $state,
    ]);

    return redirect('http://localhost:8080/oauth/authorize?'.$query);
});

Route::get('/auth/callback', function (Request $request) {
    $state = $request->session()->pull('state');

    throw_unless(
        strlen($state) > 0 && $state === $request->state,
        InvalidArgumentException::class
    );

    $response = Http::asForm()->post('http://nginx/oauth/token', [
        'grant_type' => 'authorization_code',
        'client_id' => config('app.oauth2_client_id'),
        'client_secret' => config('app.oauth2_client_secret'),
        'redirect_uri' => 'http://localhost:3000/auth/callback',
        'code' => $request->code,
    ]);

    return $response->json();
});
