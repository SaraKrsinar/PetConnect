using PetConnect.Domain.Entities;
using PetConnect.Domain.Enums;

namespace PetConnect.Infrastructure.Data;

public static class DataSeeder
{
    public static void SeedData(PetConnectDbContext context)
    {
        if (!context.CarePoints.Any())
        {
            var carePoints = new List<CarePoint>
            {
                new CarePoint
                {
                    Title = "Central Park Feeding Station",
                    Type = CarePointType.Food,
                    Latitude = 40.785091,
                    Longitude = -73.968285,
                    Status = CarePointStatus.Ok,
                    LastUpdatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new CarePoint
                {
                    Title = "Riverside Water Bowl",
                    Type = CarePointType.Water,
                    Latitude = 40.801979,
                    Longitude = -73.972080,
                    Status = CarePointStatus.NeedsRefill,
                    LastUpdatedAt = DateTime.UtcNow.AddDays(-3)
                },
                new CarePoint
                {
                    Title = "Community Cat Shelter",
                    Type = CarePointType.Shelter,
                    Latitude = 40.758896,
                    Longitude = -73.985130,
                    Status = CarePointStatus.Ok,
                    LastUpdatedAt = DateTime.UtcNow.AddHours(-12)
                },
                new CarePoint
                {
                    Title = "Downtown Dog Food Station",
                    Type = CarePointType.Food,
                    Latitude = 40.712776,
                    Longitude = -74.005974,
                    Status = CarePointStatus.Broken,
                    LastUpdatedAt = DateTime.UtcNow.AddDays(-7)
                },
                new CarePoint
                {
                    Title = "Brooklyn Bridge Water Point",
                    Type = CarePointType.Water,
                    Latitude = 40.706086,
                    Longitude = -73.996864,
                    Status = CarePointStatus.Ok,
                    LastUpdatedAt = DateTime.UtcNow.AddHours(-6)
                }
            };

            context.CarePoints.AddRange(carePoints);
            context.SaveChanges();
        }

        if (!context.PetReports.Any())
        {
            var petReports = new List<PetReport>
            {
                new PetReport
                {
                    Type = PetReportType.Lost,
                    PetType = PetType.Dog,
                    Description = "Golden Retriever, 3 years old, answers to 'Max'. Last seen near Central Park. Wearing a blue collar with tags.",
                    PhotoUrl = "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
                    Latitude = 40.782865,
                    Longitude = -73.965355,
                    Status = PetReportStatus.Active,
                    CreatedAt = DateTime.UtcNow.AddDays(-2)
                },
                new PetReport
                {
                    Type = PetReportType.Found,
                    PetType = PetType.Cat,
                    Description = "Orange tabby cat found near subway station. Very friendly, seems well-fed. No collar.",
                    PhotoUrl = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
                    Latitude = 40.750580,
                    Longitude = -73.993584,
                    Status = PetReportStatus.Active,
                    CreatedAt = DateTime.UtcNow.AddDays(-1)
                },
                new PetReport
                {
                    Type = PetReportType.Spotted,
                    PetType = PetType.Dog,
                    Description = "Small white poodle spotted wandering alone in the park. Looked scared and hungry.",
                    PhotoUrl = null,
                    Latitude = 40.769361,
                    Longitude = -73.977655,
                    Status = PetReportStatus.Active,
                    CreatedAt = DateTime.UtcNow.AddHours(-8)
                },
                new PetReport
                {
                    Type = PetReportType.Lost,
                    PetType = PetType.Cat,
                    Description = "Black and white tuxedo cat, 5 years old. Indoor cat that escaped. Very shy.",
                    PhotoUrl = "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400",
                    Latitude = 40.729515,
                    Longitude = -73.998672,
                    Status = PetReportStatus.Active,
                    CreatedAt = DateTime.UtcNow.AddDays(-4)
                },
                new PetReport
                {
                    Type = PetReportType.Found,
                    PetType = PetType.Other,
                    Description = "Found a pet rabbit in backyard. Brown and white, very tame. Must be someone's pet.",
                    PhotoUrl = "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400",
                    Latitude = 40.689247,
                    Longitude = -73.985472,
                    Status = PetReportStatus.Active,
                    CreatedAt = DateTime.UtcNow.AddHours(-18)
                }
            };

            context.PetReports.AddRange(petReports);
            context.SaveChanges();
        }

        if (!context.Shelters.Any())
        {
            var shelters = new List<Shelter>
            {
                new Shelter
                {
                    Name = "Happy Paws Animal Shelter",
                    Phone = "(212) 555-0101",
                    Address = "123 Pet Haven Lane, New York, NY 10001",
                    Latitude = 40.748817,
                    Longitude = -73.985428
                },
                new Shelter
                {
                    Name = "Second Chance Pet Rescue",
                    Phone = "(212) 555-0202",
                    Address = "456 Rescue Road, Brooklyn, NY 11201",
                    Latitude = 40.694065,
                    Longitude = -73.990432
                },
                new Shelter
                {
                    Name = "Furry Friends Foundation",
                    Phone = "(212) 555-0303",
                    Address = "789 Animal Avenue, Queens, NY 11375",
                    Latitude = 40.721070,
                    Longitude = -73.844749
                },
                new Shelter
                {
                    Name = "City Paws Adoption Center",
                    Phone = "(212) 555-0404",
                    Address = "321 Adoption Street, Manhattan, NY 10016",
                    Latitude = 40.746500,
                    Longitude = -73.979305
                }
            };

            context.Shelters.AddRange(shelters);
            context.SaveChanges();
        }
    }
}
