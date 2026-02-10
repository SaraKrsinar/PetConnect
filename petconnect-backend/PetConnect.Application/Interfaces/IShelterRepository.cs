using PetConnect.Domain.Entities;

namespace PetConnect.Application.Interfaces;

public interface IShelterRepository
{
    Task<IEnumerable<Shelter>> GetAllAsync();
    Task<Shelter?> GetByIdAsync(int id);
    Task<Shelter> CreateAsync(Shelter shelter);
    Task<Shelter> UpdateAsync(Shelter shelter);
    Task DeleteAsync(int id);
}
