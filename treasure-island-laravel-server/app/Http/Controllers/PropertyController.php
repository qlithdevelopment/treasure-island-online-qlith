<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Throwable;

class PropertyController extends Controller
{
    // Get all properties
    public function index(Request $request)
    {
        try {
            $perPage = max(1, min((int) $request->per_page, 100));

            $query = Property::query();

            if ($request->filled('search')) {
                $search = $request->search;

                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('locality', 'like', "%{$search}%");
                });
            }

            if ($request->filled('listing_type')) {
                $query->where('listing_type', $request->listing_type);
            }

            if ($request->filled('category')) {
                $query->where('category', $request->category);
            }

            if ($request->filled('listing_status')) {
                $query->where('listing_status', $request->listing_status);
            }

            if ($request->filled('property_type')) {
                $query->where('property_type', $request->property_type);
            }

            $properties = $query->latest()->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Properties fetched successfully',
                'data' => $properties
            ], 200);

        } catch (Throwable $e) {

            Log::error('Property index error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch properties'
            ], 500);
        }
    }


    // Create property
    public function store(Request $request)
    {
        $uploadedFiles = [];

        try {
            $this->prepareJsonFields($request);

            $validator = Validator::make(
                $request->all(),
                $this->validationRules()
            );

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            $data = $validator->validated();

            // Generate unique slug
            $baseSlug = Str::slug($data['title']);
            $slug = $baseSlug;
            $count = 1;

            while (Property::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count++;
            }

            $data['slug'] = $slug;

            // Cover image
            $data['cover_image'] = $request->file('cover_image')
                ->store('properties/cover', 'public');

            $uploadedFiles[] = $data['cover_image'];

            // Gallery images
            $data['gallery_images'] = $this->uploadFiles(
                $request->file('gallery_images', []),
                'properties/gallery',
                $uploadedFiles
            );

            // Floor plan images
            $data['floor_plan_images'] = $this->uploadFiles(
                $request->file('floor_plan_images', []),
                'properties/floor-plans',
                $uploadedFiles
            );

            // Amenities images
            $data['amenities_images'] = $this->uploadFiles(
                $request->file('amenities_images', []),
                'properties/amenities',
                $uploadedFiles
            );

            // Brochure
            if ($request->hasFile('brochure')) {
                $data['brochure'] = $request->file('brochure')
                    ->store('properties/brochures', 'public');

                $uploadedFiles[] = $data['brochure'];
            }

            $property = Property::create($data);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Property created successfully',
                'data' => $property
            ], 201);

        } catch (Throwable $e) {

            DB::rollBack();

            // Clean uploaded files if database operation fails
            Storage::disk('public')->delete($uploadedFiles);

            Log::error('Property store error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to create property'
            ], 500);
        }
    }


    // Get single property
    public function show(string $id)
    {
        try {
            $property = Property::find($id);

            if (!$property) {
                return response()->json([
                    'success' => false,
                    'message' => 'Property not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Property fetched successfully',
                'data' => $property
            ], 200);

        } catch (Throwable $e) {

            Log::error('Property show error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch property'
            ], 500);
        }
    }


    // Update property
    public function update(Request $request, string $id)
    {
        $uploadedFiles = [];
        $oldFiles = [];

        try {
            $property = Property::find($id);

            if (!$property) {
                return response()->json([
                    'success' => false,
                    'message' => 'Property not found'
                ], 404);
            }

            $this->prepareJsonFields($request);

            $validator = Validator::make(
                $request->all(),
                $this->validationRules(true)
            );

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            DB::beginTransaction();

            $data = $validator->validated();

            // Update slug if title changes
            if (isset($data['title'])) {
                $baseSlug = Str::slug($data['title']);
                $slug = $baseSlug;
                $count = 1;

                while (
                    Property::where('slug', $slug)
                        ->where('id', '!=', $id)
                        ->exists()
                ) {
                    $slug = $baseSlug . '-' . $count++;
                }

                $data['slug'] = $slug;
            }

            // Replace cover image
            if ($request->hasFile('cover_image')) {

                $newPath = $request->file('cover_image')
                    ->store('properties/cover', 'public');

                $uploadedFiles[] = $newPath;

                if ($property->cover_image) {
                    $oldFiles[] = $property->cover_image;
                }

                $data['cover_image'] = $newPath;
            }

            // Replace multiple image collections
            $mediaFields = [
                'gallery_images' => 'properties/gallery',
                'floor_plan_images' => 'properties/floor-plans',
                'amenities_images' => 'properties/amenities',
            ];

            foreach ($mediaFields as $field => $directory) {

                if ($request->hasFile($field)) {

                    $newFiles = $this->uploadFiles(
                        $request->file($field),
                        $directory,
                        $uploadedFiles
                    );

                    foreach ($property->$field ?? [] as $oldFile) {
                        $oldFiles[] = $oldFile;
                    }

                    $data[$field] = $newFiles;
                }
            }

            // Replace brochure
            if ($request->hasFile('brochure')) {

                $newPath = $request->file('brochure')
                    ->store('properties/brochures', 'public');

                $uploadedFiles[] = $newPath;

                if ($property->brochure) {
                    $oldFiles[] = $property->brochure;
                }

                $data['brochure'] = $newPath;
            }

            $property->update($data);

            DB::commit();

            // Delete old files only after successful DB commit
            Storage::disk('public')->delete($oldFiles);

            return response()->json([
                'success' => true,
                'message' => 'Property updated successfully',
                'data' => $property->fresh()
            ], 200);

        } catch (Throwable $e) {

            DB::rollBack();

            Storage::disk('public')->delete($uploadedFiles);

            Log::error('Property update error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update property'
            ], 500);
        }
    }


    // Delete property
    public function destroy(string $id)
    {
        try {
            $property = Property::find($id);

            if (!$property) {
                return response()->json([
                    'success' => false,
                    'message' => 'Property not found'
                ], 404);
            }

            // Collect all stored files
            $files = [
                $property->cover_image,
                ...($property->gallery_images ?? []),
                ...($property->floor_plan_images ?? []),
                ...($property->amenities_images ?? []),
                $property->brochure,
            ];

            DB::beginTransaction();

            $property->delete();

            DB::commit();

            // Delete media after successful database deletion
            Storage::disk('public')->delete(
                array_values(array_filter($files))
            );

            return response()->json([
                'success' => true,
                'message' => 'Property deleted successfully'
            ], 200);

        } catch (Throwable $e) {

            DB::rollBack();

            Log::error('Property delete error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete property'
            ], 500);
        }
    }


    // Upload multiple files
    private function uploadFiles(
        array $files,
        string $directory,
        array &$uploadedFiles
    ): array {
        $paths = [];

        foreach ($files as $file) {

            $path = $file->store($directory, 'public');

            $paths[] = $path;
            $uploadedFiles[] = $path;
        }

        return $paths;
    }


    // Convert JSON strings from FormData into arrays
    private function prepareJsonFields(Request $request): void
    {
        foreach (['amenities', 'nearby_places'] as $field) {

            $value = $request->input($field);

            if (is_string($value)) {

                $decoded = json_decode($value, true);

                if (json_last_error() === JSON_ERROR_NONE) {
                    $request->merge([
                        $field => $decoded
                    ]);
                }
            }
        }
    }


    // Validation rules
    private function validationRules(bool $partial = false): array
    {
        $required = $partial ? 'sometimes|required' : 'required';
        $nullable = 'nullable';

        return [

            // Basic Information
            'title' => "$required|string|max:255",
            'property_type' => "$required|string",
            'listing_type' => [
                $partial ? 'sometimes' : 'required',
                'string',
                Rule::in(['For Sale', 'For Rent', 'For Lease'])
            ],
            'category' => [
                $partial ? 'sometimes' : 'required',
                'string',
                Rule::in(['Residential', 'Commercial', 'Land'])
            ],
            'short_description' => "$required|string",
            'description' => "$required|string",
            'listing_status' => [
                $partial ? 'sometimes' : 'required',
                'string',
                Rule::in([
                    'Draft', 'Published', 'Sold', 'Rented',
                    'Leased', 'Under Offer', 'Archived'
                ])
            ],
            'is_featured' => 'sometimes|boolean',

            // Pricing
            'listing_price' => "$required|numeric|min:0",
            'price_type' => [
                $partial ? 'sometimes' : 'required',
                'string',
                Rule::in(['Total Price', 'Per Sq. Ft.'])
            ],
            'is_negotiable' => 'sometimes|boolean',
            'maintenance_charges' => "$nullable|numeric|min:0",

            // Specifications
            'property_area' => "$required|numeric|min:0",
            'area_unit' => [
                $partial ? 'sometimes' : 'required',
                'string',
                Rule::in(['Sq. Ft.', 'Sq. M.', 'Acre', 'Decimal'])
            ],
            'bedrooms' => "$nullable|string",
            'bathrooms' => "$nullable|string",
            'balconies' => "$nullable|string",
            'floor_number' => "$nullable|integer|min:0",
            'total_floors' => "$nullable|integer|min:0",
            'furnishing_status' => [
                'nullable',
                Rule::in(['Furnished', 'Semi-Furnished', 'Unfurnished'])
            ],
            'property_age' => [
                'nullable',
                Rule::in(['New', '0–5 Years', '5–10 Years', '10+ Years'])
            ],
            'facing_direction' => [
                'nullable',
                Rule::in([
                    'North', 'South', 'East', 'West',
                    'North-East', 'North-West',
                    'South-East', 'South-West'
                ])
            ],
            'possession_status' => [
                $partial ? 'sometimes' : 'required',
                'string',
                Rule::in(['Ready to Move', 'Under Construction'])
            ],

            // Location
            'country' => "$required|string",
            'state' => "$required|string",
            'city' => "$required|string",
            'locality' => "$required|string",
            'full_address' => "$required|string",
            'pin_code' => "$required|string|max:10",
            'landmark' => "$nullable|string",
            'google_maps_url' => "$nullable|url",
            'latitude' => "$nullable|numeric|between:-90,90",
            'longitude' => "$nullable|numeric|between:-180,180",

            // Media
            'cover_image' => [
                $partial ? 'sometimes' : 'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120'
            ],
            'gallery_images' => [
                $partial ? 'sometimes' : 'required',
                'array',
                $partial ? 'min:1' : 'min:1'
            ],
            'gallery_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',

            'floor_plan_images' => 'sometimes|nullable|array',
            'floor_plan_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',

            'amenities_images' => 'sometimes|nullable|array',
            'amenities_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:5120',

            'video_url' => "$nullable|url",
            'virtual_tour_url' => "$nullable|url",
            'brochure' => 'sometimes|nullable|file|mimes:pdf|max:10240',

            // Building Details
            'project_name' => "$nullable|string|max:255",
            'builder_name' => "$nullable|string|max:255",
            'construction_status' => [
                $partial ? 'sometimes' : 'required',
                'string',
                Rule::in([
                    'Under Construction',
                    'Ready to Move',
                    'Completed'
                ])
            ],
            'year_of_completion' => "$nullable|integer|min:1900|max:2100",
            'total_units' => "$nullable|integer|min:0",
            'available_units' => "$nullable|integer|min:0",
            'parking_availability' => [
                'nullable',
                Rule::in(['Available', 'Not Available'])
            ],
            'rera_number' => "$nullable|string|max:255",

            // Amenities JSON
            'amenities' => 'nullable|array',
            'amenities.*' => 'required|string|max:255',

            // Nearby Places JSON
            'nearby_places' => 'nullable|array',
            'nearby_places.*.place_name' => 'required|string|max:255',
            'nearby_places.*.place_category' => [
                'required',
                Rule::in([
                    'School',
                    'College',
                    'Hospital',
                    'Shopping Mall',
                    'Railway Station',
                    'Airport',
                    'Bus Stop',
                    'Market',
                    'Other'
                ])
            ],
            'nearby_places.*.distance' => 'required|numeric|min:0',
            'nearby_places.*.distance_unit' => [
                'required',
                Rule::in(['m', 'km'])
            ],
        ];
    }
}