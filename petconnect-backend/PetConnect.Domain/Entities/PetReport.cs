using PetConnect.Domain.Enums;

namespace PetConnect.Domain.Entities;

public class PetReport
{
    public int Id { get; set; }
    public PetReportType Type { get; set; }
    public PetType PetType { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? PhotoUrl { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public PetReportStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}
