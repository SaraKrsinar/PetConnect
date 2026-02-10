using Microsoft.EntityFrameworkCore;
using PetConnect.Domain.Entities;

namespace PetConnect.Infrastructure.Data;

public class PetConnectDbContext : DbContext
{
    public PetConnectDbContext(DbContextOptions<PetConnectDbContext> options) : base(options)
    {
    }

    public DbSet<CarePoint> CarePoints => Set<CarePoint>();
    public DbSet<CarePointUpdate> CarePointUpdates => Set<CarePointUpdate>();
    public DbSet<PetReport> PetReports => Set<PetReport>();
    public DbSet<Shelter> Shelters => Set<Shelter>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // CarePoint configuration
        modelBuilder.Entity<CarePoint>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Type).IsRequired();
            entity.Property(e => e.Latitude).IsRequired();
            entity.Property(e => e.Longitude).IsRequired();
            entity.Property(e => e.Status).IsRequired();
            entity.Property(e => e.LastUpdatedAt).IsRequired();

            entity.HasMany(e => e.Updates)
                  .WithOne(u => u.CarePoint)
                  .HasForeignKey(u => u.CarePointId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // CarePointUpdate configuration
        modelBuilder.Entity<CarePointUpdate>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Note).HasMaxLength(500);
            entity.Property(e => e.StatusAfterUpdate).IsRequired();
            entity.Property(e => e.UpdatedAt).IsRequired();
        });

        // PetReport configuration
        modelBuilder.Entity<PetReport>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Type).IsRequired();
            entity.Property(e => e.PetType).IsRequired();
            entity.Property(e => e.Description).IsRequired().HasMaxLength(1000);
            entity.Property(e => e.PhotoUrl).HasMaxLength(500);
            entity.Property(e => e.Latitude).IsRequired();
            entity.Property(e => e.Longitude).IsRequired();
            entity.Property(e => e.Status).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();
        });

        // Shelter configuration
        modelBuilder.Entity<Shelter>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Phone).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Address).IsRequired().HasMaxLength(300);
            entity.Property(e => e.Latitude).IsRequired();
            entity.Property(e => e.Longitude).IsRequired();
        });
    }
}
