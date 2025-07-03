<?php
namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Http\Request;

class VisitorController extends Controller
{
    public function index()
    {
        return Visitor::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'fullname' => 'required|string|max:255',
            'society_name' => 'required|string|max:255',
            'category' => 'required|in:client,fournisseur',
            'description' => 'nullable|string'
        ]);

        return Visitor::create($request->all());
    }

    public function show($id)
    {
        return Visitor::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'fullname' => 'string|max:255',
            'society_name' => 'string|max:255',
            'category' => 'in:client,fournisseur',
            'description' => 'nullable|string'
        ]);

        $visitor = Visitor::findOrFail($id);
        $visitor->update($request->all());
        return $visitor;
    }

    public function destroy($id)
    {
        Visitor::destroy($id);
        return response()->noContent();
    }
}