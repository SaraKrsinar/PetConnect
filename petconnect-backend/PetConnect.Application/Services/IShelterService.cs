using PetConnect.Application.DTOs;

namespace PetConnect.Application.Services;

public interface IShelterService
{
    Task<IEnumerable<ShelterDto>> GetAllAsync();
    Task<ShelterDto?> GetByIdAsync(int id);
    Task<ShelterDto> CreateAsync(CreateShelterDto dto);
    Task<ShelterDto?> UpdateAsync(int id, UpdateShelterDto dto);
    Task<bool> DeleteAsync(int id);
}
