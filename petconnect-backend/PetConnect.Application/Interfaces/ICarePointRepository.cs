using PetConnect.Domain.Entities;

namespace PetConnect.Application.Interfaces;

public interface ICarePointRepository
{
    Task<IEnumerable<CarePoint>> GetAllAsync();
    Task<CarePoint?> GetByIdAsync(int id);
    Task<CarePoint?> GetByIdWithUpdatesAsync(int id);
    Task<CarePoint> CreateAsync(CarePoint carePoint);
    Task<CarePoint> UpdateAsync(CarePoint carePoint);
    Task DeleteAsync(int id);
    Task<CarePointUpdate> AddUpdateAsync(CarePointUpdate update);
}
