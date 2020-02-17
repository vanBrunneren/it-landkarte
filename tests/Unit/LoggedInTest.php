<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;

class LoggedInTest extends TestCase
{

    public function testLoginPage()
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }

    public function testPasswordResetPage()
    {
        $response = $this->get('/password/reset');
        $response->assertStatus(200);
    }

    public function testFrontPage()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/');
        $response->assertStatus(200);
    }

    public function testCustomerPage()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/customers');
        $response->assertStatus(200);
    }

    public function testPersonfunctionsPage()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/personfunctions');
        $response->assertStatus(200);
    }

    public function testThemesPage()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/themes');
        $response->assertStatus(200);
    }

    public function testQuestionsPage()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/questions');
        $response->assertStatus(200);
    }

    public function testResultsPage()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/results');
        $response->assertStatus(200);
    }

    public function testUserPage()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/user');
        $response->assertStatus(200);
    }

    public function testLogoutPage()
    {
        $user = User::first();
        $response = $this->actingAs($user)->get('/logout');
        $response->assertStatus(302);
    }
}
