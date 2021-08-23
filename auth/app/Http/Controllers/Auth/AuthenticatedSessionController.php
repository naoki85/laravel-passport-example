<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\TokenRepository;
use Laravel\Passport\RefreshTokenRepository;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $tokenRepository = app(TokenRepository::class);
        $refreshTokenRepository = app(RefreshTokenRepository::class);

        if (!empty($request->user()) && !empty($request->user()->getAuthIdentifier())) {
            $tokens = $tokenRepository->forUser($request->user()->getAuthIdentifier());
            // @see Laravel\Passport\Http\Controllers\AuthorizedAccessTokenController@forUser
            $accessTokens = $tokens->filter(function ($token) {
                return ! $token->revoked;
            })->values();
            if (!empty($accessTokens)) {
                foreach ($accessTokens as $accessToken) {
                    $tokenRepository->revokeAccessToken($accessToken->id);
                    $refreshTokenRepository->revokeRefreshTokensByAccessTokenId($accessToken->id);
                }
            }
        }
        
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
