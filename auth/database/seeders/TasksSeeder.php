<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i < 5; $i ++) {

        }
        DB::table('tasks')->insert([
            [
                'user_id' => 1,
                'title' => 'Task 1',
                'created_at' => date("Y/m/d H:i:s"),
                'updated_at' => date("Y/m/d H:i:s"),
            ],
            [
                'user_id' => 1,
                'title' => 'Task 2',
                'created_at' => date("Y/m/d H:i:s"),
                'updated_at' => date("Y/m/d H:i:s"),
            ],
            [
                'user_id' => 1,
                'title' => 'Task 3',
                'created_at' => date("Y/m/d H:i:s"),
                'updated_at' => date("Y/m/d H:i:s"),
            ],
            [
                'user_id' => 1,
                'title' => 'Task 4',
                'created_at' => date("Y/m/d H:i:s"),
                'updated_at' => date("Y/m/d H:i:s"),
            ]
        ]);
    }
}
