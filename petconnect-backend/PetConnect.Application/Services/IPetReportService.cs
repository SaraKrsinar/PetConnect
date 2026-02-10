using PetConnect.Application.DTOs;

namespace PetConnect.Application.Services;

public interface IPetReportService
{
    Task<IEnumerable<PetReportDto>> GetAllAsync();
    Task<PetReportDto?> GetByIdAsync(int id);
    Task<PetReportDto> CreateAsync(CreatePetReportDto dto);
    Task<PetReportDto?> UpdateAsync(int id, UpdatePetReportDto dto);
    Task<bool> DeleteAsync(int id);
}
