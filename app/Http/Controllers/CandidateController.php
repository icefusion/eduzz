<?php

namespace App\Http\Controllers;
 
use App\Candidate;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
 
class CandidateController extends Controller{

    public function createCandidate(Request $request){
 
        $candidate = Candidate::create($request->all());
 
        return response()->json($candidate);
 
    }
 
    public function updateCandidate(Request $request, $id){

        $candidate  = Candidate::find($id);
        $candidate->name = $request->input('name');
        $candidate->email = $request->input('email');        
        $candidate->save();
 
        return response()->json($candidate);
    }  

    public function deleteCandidate($id){
        $candidate  = Candidate::find($id);
        $candidate->delete();
 
        return response()->json('Removed successfully.');
    }

    public function index(){
 
        $candidates  = Candidate::all();
 
        return response()->json($candidates);
 
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        $items = Candidate::orderBy('id','asc')->paginate(5);

        $response = [
            'pagination' => [
                'total' => $items->total(),
                'per_page' => $items->perPage(),
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'from' => $items->firstItem(),
                'to' => $items->lastItem()
            ],
            'data' => $items
        ];

        return response()->json($response);
    }
}
