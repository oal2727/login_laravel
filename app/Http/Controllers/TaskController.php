<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
class TaskController extends Controller
{
    public function __construct()
    {
          $this->middleware(['jwt.verify'], ['except' => ['login']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $task = Task::where('user_id',auth()->id())->get();
        return response()->json($task);
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $this->validate($request,[
        //     'name'=>'required|max:20',
        //     'details'=>'required|max:200'
        // ]);
        $task = new Task();
        $task->name=$request->name;
        $task->details=$request->details;
        $task->user_id=auth()->id();
        $task->save();
        return response()->json($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       $task = Task::where("user_id",auth()->id())->findOrFail($id);
       return response()->json($task);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = Task::find($id);
        $task->name=$request->name;
        $task->details=$request->details;
        $task->user_id=auth()->id();
        $task->save();
        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json($task);
    }
    public function destroy_User(){
      
        $id = auth()->id();
        // return response()->json($id);
        $user = User::findOrFail($id);
        $user->delete();
        auth()->logout();
        return response()->json($user);
    }
}
