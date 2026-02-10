using PetConnect.Domain.Enums;

namespace PetConnect.Domain.Entities;

public class CarePoint
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public CarePointType Type { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public CarePointStatus Status { get; set; }
    public DateTime LastUpdatedAt { get; set; }
    
    public ICollection<CarePointUpdate> Updates { get; set; } = new List<CarePointUpdate>();
}
