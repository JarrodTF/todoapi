using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class User : IdentityUser
    {
        //[Key]
        //public long Id { get; set; }

        //[Required]
        //public string? Email { get; set; }

        [Required]
        public string? Name {  get; set; }

        public int Prim_id { get; set; }

    //    [Required]
    //    public string? Password { get; set; }
    }
}
