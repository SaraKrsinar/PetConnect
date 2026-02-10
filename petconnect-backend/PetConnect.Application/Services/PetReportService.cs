using PetConnect.Application.DTOs;
using PetConnect.Application.Interfaces;
using PetConnect.Domain.Entities;
using PetConnect.Domain.Enums;

namespace PetConnect.Application.Services;

public class PetReportService : IPetReportService
{
    private readonly IPetReportRepository _repository;

    public PetReportService(IPetReportRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<PetReportDto>> GetAllAsync()
    {
        var reports = await _repository.GetAllAsync();
        return reports.Select(r => new PetReportDto(
            r.Id,
            r.Type,
            r.PetType,
            r.Description,
            r.PhotoUrl,
            r.Latitude,
            r.Longitude,
            r.Status,
            r.CreatedAt
        ));
    }

    public async Task<PetReportDto?> GetByIdAsync(int id)
    {
        var report = await _repository.GetByIdAsync(id);
        if (report == null) return null;

        return new PetReportDto(
            report.Id,
            report.Type,
            report.PetType,
            report.Description,
            report.PhotoUrl,
            report.Latitude,
            report.Longitude,
            report.Status,
            report.CreatedAt
        );
    }

    public async Task<PetReportDto> CreateAsync(CreatePetReportDto dto)
    {
        var report = new PetReport
        {
            Type = dto.Type,
            PetType = dto.PetType,
            Description = dto.Description,
            PhotoUrl = dto.PhotoUrl,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            Status = PetReportStatus.Active,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _repository.CreateAsync(report);
        return new PetReportDto(
            created.Id,
            created.Type,
            created.PetType,
            created.Description,
            created.PhotoUrl,
            created.Latitude,
            created.Longitude,
            created.Status,
            created.CreatedAt
        );
    }

    public async Task<PetReportDto?> UpdateAsync(int id, UpdatePetReportDto dto)
    {
        var report = await _repository.GetByIdAsync(id);
        if (report == null) return null;

        report.Type = dto.Type;
        report.PetType = dto.PetType;
        report.Description = dto.Description;
        report.PhotoUrl = dto.PhotoUrl;
        report.Latitude = dto.Latitude;
        report.Longitude = dto.Longitude;
        report.Status = dto.Status;

        var updated = await _repository.UpdateAsync(report);
        return new PetReportDto(
            updated.Id,
            updated.Type,
            updated.PetType,
            updated.Description,
            updated.PhotoUrl,
            updated.Latitude,
            updated.Longitude,
            updated.Status,
            updated.CreatedAt
        );
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var report = await _repository.GetByIdAsync(id);
        if (report == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }
}
