<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tovary>
 */
class TovaryFactory extends Factory
{
    protected $model = \App\Models\Tovary::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'slug' => $this->faker->slug(),
            'name' => $this->faker->domainName(),
            'body' => $this->faker->text(1000),
            'property1' => $this->faker->numberBetween(0, 1024),
            'property2' => $this->faker->numberBetween(0, 128),
            'price' => $this->faker->randomFloat(2, 0, 9999.99),
            //
        ];
    }
}
