<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();

            // Basic Information
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('property_type');
            $table->string('listing_type');
            $table->string('category');
            $table->text('short_description');
            $table->longText('description');
            $table->string('listing_status')->default('Draft');
            $table->boolean('is_featured')->default(false);

            // Pricing Details
            $table->decimal('listing_price', 15, 2);
            $table->string('price_type');
            $table->boolean('is_negotiable')->default(false);
            $table->decimal('maintenance_charges', 12, 2)->nullable();

            // Property Specifications
            $table->decimal('property_area', 12, 2);
            $table->string('area_unit');
            $table->string('bedrooms')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('balconies')->nullable();
            $table->integer('floor_number')->nullable();
            $table->integer('total_floors')->nullable();
            $table->string('furnishing_status')->nullable();
            $table->string('property_age')->nullable();
            $table->string('facing_direction')->nullable();
            $table->string('possession_status');

            // Location Details
            $table->string('country')->default('India');
            $table->string('state');
            $table->string('city');
            $table->string('locality');
            $table->text('full_address');
            $table->string('pin_code', 10);
            $table->string('landmark')->nullable();
            $table->text('google_maps_url')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            // Property Media
            $table->string('cover_image');
            $table->json('gallery_images');
            $table->json('floor_plan_images')->nullable();
            $table->json('amenities_images')->nullable();
            $table->string('video_url')->nullable();
            $table->text('virtual_tour_url')->nullable();
            $table->string('brochure')->nullable();

            // Building Details
            $table->string('project_name')->nullable();
            $table->string('builder_name')->nullable();
            $table->string('construction_status');
            $table->unsignedSmallInteger('year_of_completion')->nullable();
            $table->unsignedInteger('total_units')->nullable();
            $table->unsignedInteger('available_units')->nullable();
            $table->string('parking_availability')->nullable();
            $table->string('rera_number')->nullable();

            // Amenities (JSON)
            $table->json('amenities')->nullable();

            // Nearby Places (JSON)
            $table->json('nearby_places')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};