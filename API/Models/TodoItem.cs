using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models;

public class TodoItem
{
    [Key]
    public long Id { get; set; }

    [Required]
    public string? Todo { get; set; }
    public bool IsComplete { get; set; }
    public int User_Id { get; set; }
}
