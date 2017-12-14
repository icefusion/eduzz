<?php

Route::get('/', 'CandidateController@manageVue');
Route::resource('candidate','CandidateController');