<?php

namespace Tests\Unit;

use App\Theme;
use App\User;
use Tests\TestCase;

class ApiTest extends TestCase
{

    public function testPublicQuestionsApi()
    {
        $response = $this->get('/api/public/questions');
        $response->assertStatus(200);
    }

    public function testPublicThemesApi()
    {
        $response = $this->get('/api/public/themes');
        $response->assertStatus(200);
    }

    public function testPublicThemeDetailApi()
    {
        $theme = Theme::first();
        $response = $this->get('/api/public/theme/' . $theme->id);
        $response->assertStatus(200);
    }

    public function testLoggedInApi()
    {
        $response = $this->get('/api/persons/functions');
        $response->assertStatus(302);

        $response = $this->get('api/questions/group/theme');
        $response->assertStatus(302);

        $response = $this->get('api/customers');
        $response->assertStatus(302);

        $response = $this->get('api/questiontypes');
        $response->assertStatus(302);

        $user = User::first();
        $response = $this->actingAs($user)->get('/api/persons/functions');
        $response->assertStatus(200);

        $response = $this->actingAs($user)->get('api/questions/group/theme');
        $response->assertStatus(200);

        $response = $this->actingAs($user)->get('api/customers');
        $response->assertStatus(200);

        $response = $this->actingAs($user)->get('api/questiontypes');
        $response->assertStatus(200);

    }

}
