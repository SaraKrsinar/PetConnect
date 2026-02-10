using PetConnect.Application.DTOs;

namespace PetConnect.Application.Services;

public interface ICarePointService
{
    Task<IEnumerable<CarePointDto>> GetAllAsync();
    Task<CarePointWithUpdatesDto?> GetByIdAsync(int id);
    Task<CarePointDto> CreateAsync(CreateCarePointDto dto);
    Task<CarePointDto?> UpdateAsync(int id, UpdateCarePointDto dto);
    Task<bool> DeleteAsync(int id);
    Task<CarePointUpdateDto?> AddUpdateAsync(int carePointId, CreateCarePointUpdateDto dto);
}
