using PetConnect.Domain.Enums;

namespace PetConnect.Domain.Entities;

public class CarePointUpdate
{
    public int Id { get; set; }
    public int CarePointId { get; set; }
    public string Note { get; set; } = string.Empty;
    public CarePointStatus StatusAfterUpdate { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    public CarePoint CarePoint { get; set; } = null!;
}
