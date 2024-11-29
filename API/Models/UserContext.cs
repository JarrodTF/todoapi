using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace TodoApi.Models;
public class UserContext : IdentityDbContext<User>
{
    public UserContext(DbContextOptions<UserContext> options) : base(options)
    {

    }

    //public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Rename AspNetUsers table to CustomUsers
        builder.Entity<User>().ToTable("users");
    }
}
