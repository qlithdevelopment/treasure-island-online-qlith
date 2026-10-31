<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class ContactController extends Controller
{
    // Get all contacts
    public function index(Request $request)
    {
        try {
            $perPage = $request->per_page ?? 10;

            $contacts = Contact::latest()->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Contacts fetched successfully',
                'data' => $contacts
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch contacts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Store contact
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'message' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $contact = Contact::create($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Contact created successfully',
                'data' => $contact
            ], 201);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Get single contact
    public function show(string $id)
    {
        try {
            $contact = Contact::find($id);

            if (!$contact) {
                return response()->json([
                    'success' => false,
                    'message' => 'Contact not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Contact fetched successfully',
                'data' => $contact
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Update contact
    public function update(Request $request, string $id)
    {
        try {
            $contact = Contact::find($id);

            if (!$contact) {
                return response()->json([
                    'success' => false,
                    'message' => 'Contact not found'
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'email' => 'sometimes|required|email|max:255',
                'phone' => 'sometimes|required|string|max:20',
                'message' => 'sometimes|required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $contact->update($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Contact updated successfully',
                'data' => $contact->fresh()
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Delete contact
    public function destroy(string $id)
    {
        try {
            $contact = Contact::find($id);

            if (!$contact) {
                return response()->json([
                    'success' => false,
                    'message' => 'Contact not found'
                ], 404);
            }

            $contact->delete();

            return response()->json([
                'success' => true,
                'message' => 'Contact deleted successfully'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}