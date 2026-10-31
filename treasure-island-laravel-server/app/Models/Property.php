<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        // Basic Information
        'title',
        'slug',
        'property_type',
        'listing_type',
        'category',
        'short_description',
        'description',
        'listing_status',
        'is_featured',

        // Pricing
        'listing_price',
        'price_type',
        'is_negotiable',
        'maintenance_charges',

        // Specifications
        'property_area',
        'area_unit',
        'bedrooms',
        'bathrooms',
        'balconies',
        'floor_number',
        'total_floors',
        'furnishing_status',
        'property_age',
        'facing_direction',
        'possession_status',

        // Location
        'country',
        'state',
        'city',
        'locality',
        'full_address',
        'pin_code',
        'landmark',
        'google_maps_url',
        'latitude',
        'longitude',

        // Media
        'cover_image',
        'gallery_images',
        'floor_plan_images',
        'amenities_images',
        'video_url',
        'virtual_tour_url',
        'brochure',

        // Building
        'project_name',
        'builder_name',
        'construction_status',
        'year_of_completion',
        'total_units',
        'available_units',
        'parking_availability',
        'rera_number',

        // JSON
        'amenities',
        'nearby_places',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_negotiable' => 'boolean',

        'listing_price' => 'decimal:2',
        'maintenance_charges' => 'decimal:2',
        'property_area' => 'decimal:2',

        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',

        'gallery_images' => 'array',
        'floor_plan_images' => 'array',
        'amenities_images' => 'array',

        'amenities' => 'array',
        'nearby_places' => 'array',

        'year_of_completion' => 'integer',
        'floor_number' => 'integer',
        'total_floors' => 'integer',
        'total_units' => 'integer',
        'available_units' => 'integer',
    ];
}