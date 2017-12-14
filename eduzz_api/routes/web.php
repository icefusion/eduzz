<?php

$router->group(['prefix' => 'api/v1'], function($router)
{
	$router->post('candidate','CandidateController@createCandidate');

	$router->put('candidate/{id}','CandidateController@updateCandidate');
 	 
	$router->delete('candidate/{id}','CandidateController@deleteCandidate');

	$router->get('candidate','CandidateController@index');
});
