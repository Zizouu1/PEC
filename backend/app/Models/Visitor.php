<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'society_name',
        'category',
        'description'
    ];
    protected $appends = ['time_in'];

    public function getTimeInAttribute()
    {
        return $this->created_at;
    }
}