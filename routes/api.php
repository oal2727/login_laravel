<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('/user',[UserController::class,'getUserAuthenticated']);
    Route::post('/logout',[UserController::class,'logout']);
    Route::resource('/task',TaskController::class);
    Route::delete('/user',[TaskController::class,'destroy_User']);
});