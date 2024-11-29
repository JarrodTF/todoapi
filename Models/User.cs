﻿using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string? Email { get; set; }

        [Required]
        public string? Name {  get; set; }

        [Required]
        public string? Password { get; set; }
    }
}
