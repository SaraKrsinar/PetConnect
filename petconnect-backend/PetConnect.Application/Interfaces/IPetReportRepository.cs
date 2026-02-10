using PetConnect.Domain.Entities;

namespace PetConnect.Application.Interfaces;

public interface IPetReportRepository
{
    Task<IEnumerable<PetReport>> GetAllAsync();
    Task<PetReport?> GetByIdAsync(int id);
    Task<PetReport> CreateAsync(PetReport petReport);
    Task<PetReport> UpdateAsync(PetReport petReport);
    Task DeleteAsync(int id);
}
