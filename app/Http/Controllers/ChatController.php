<?php

namespace App\Http\Controllers;

use App\User;
use App\Events\ChatEvent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function chat(){
        return view('chat');
    }

    public function send(Request $request){
        // return $request->all();
        $user=User::find(Auth::id());
        $this->saveTosession($request);
        event(new ChatEvent($request->message,$user));
    }

    public function saveTosession($request){
        session()->put('chat',$request->message);
    }
}
