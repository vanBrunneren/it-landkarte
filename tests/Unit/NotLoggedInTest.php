<?php

namespace Tests\Unit;

use Tests\TestCase;

class NotLoggedInTest extends TestCase
{

    public function testLoginPage()
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }

    public function testRegisterPage()
    {
        $response = $this->get('/register');
        $response->assertStatus(302);
    }

    public function testPasswordResetPage()
    {
        $response = $this->get('/password/reset');
        $response->assertStatus(200);
    }

    public function testFrontPage()
    {
        $response = $this->get('/');
        $response->assertStatus(302);
    }

    public function testCustomerPage()
    {
        $response = $this->get('/customers');
        $response->assertStatus(302);
    }

    public function testPersonfunctionsPage()
    {
        $response = $this->get('/personfunctions');
        $response->assertStatus(302);
    }

    public function testThemesPage()
    {
        $response = $this->get('/themes');
        $response->assertStatus(302);
    }

    public function testQuestionsPage()
    {
        $response = $this->get('/questions');
        $response->assertStatus(302);
    }

    public function testResultsPage()
    {
        $response = $this->get('/results');
        $response->assertStatus(302);
    }

    public function testUserPage()
    {
        $response = $this->get('/user');
        $response->assertStatus(302);
    }

    public function testLogoutPage()
    {
        $response = $this->get('/logout');
        $response->assertStatus(302);
    }

    public function testPublicPage()
    {
        $response = $this->get('/public');
        $response->assertStatus(200);
    }

}
