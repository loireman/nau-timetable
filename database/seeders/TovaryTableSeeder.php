<?php

namespace Database\Seeders;

use App\Models\Tovary;
use Database\Factories\TovaryFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class TovaryTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tovary::factory()->count(10)->create();
        //
    }
}
