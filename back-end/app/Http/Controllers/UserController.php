<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
       return response()->json(User::paginate(10));
    }
    public function store(Request $request)
    {
        User::create([
            'name'=> $request['name'],
            'email'=> $request['email'],
            'password'=> bcrypt($request['password']),
        ]);
        return response()->json([
            'message' => 'User created successfully'
        ] , 201);
    }

    public function show(User $user)
    {
       return response()->json($user);
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);  // Find the user by id or throw 404
        $user->update([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ]);

        return response()->json([
            'message' => 'User updated successfully',
            'updated_user' => $user
        ], 200);  // Use 200 for update response
    }

    public function destroy(User $user )
    {
       $user->delete();
       return response()->json([
           'message' => 'User deleted successfully',
           'user deleted'=> $user
       ],
           201);
    }
}
