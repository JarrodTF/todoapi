using System.ComponentModel.DataAnnotations;

namespace TodoApi.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;

        public string UserName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

    }
}
