using PetConnect.Application.DTOs;
using PetConnect.Application.Interfaces;
using PetConnect.Domain.Entities;

namespace PetConnect.Application.Services;

public class CarePointService : ICarePointService
{
    private readonly ICarePointRepository _repository;

    public CarePointService(ICarePointRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CarePointDto>> GetAllAsync()
    {
        var carePoints = await _repository.GetAllAsync();
        return carePoints.Select(cp => new CarePointDto(
            cp.Id,
            cp.Title,
            cp.Type,
            cp.Latitude,
            cp.Longitude,
            cp.Status,
            cp.LastUpdatedAt
        ));
    }

    public async Task<CarePointWithUpdatesDto?> GetByIdAsync(int id)
    {
        var carePoint = await _repository.GetByIdWithUpdatesAsync(id);
        if (carePoint == null) return null;

        return new CarePointWithUpdatesDto(
            carePoint.Id,
            carePoint.Title,
            carePoint.Type,
            carePoint.Latitude,
            carePoint.Longitude,
            carePoint.Status,
            carePoint.LastUpdatedAt,
            carePoint.Updates.Select(u => new CarePointUpdateDto(
                u.Id,
                u.CarePointId,
                u.Note,
                u.StatusAfterUpdate,
                u.UpdatedAt
            ))
        );
    }

    public async Task<CarePointDto> CreateAsync(CreateCarePointDto dto)
    {
        var carePoint = new CarePoint
        {
            Title = dto.Title,
            Type = dto.Type,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            Status = dto.Status,
            LastUpdatedAt = DateTime.UtcNow
        };

        var created = await _repository.CreateAsync(carePoint);
        return new CarePointDto(
            created.Id,
            created.Title,
            created.Type,
            created.Latitude,
            created.Longitude,
            created.Status,
            created.LastUpdatedAt
        );
    }

    public async Task<CarePointDto?> UpdateAsync(int id, UpdateCarePointDto dto)
    {
        var carePoint = await _repository.GetByIdAsync(id);
        if (carePoint == null) return null;

        carePoint.Title = dto.Title;
        carePoint.Type = dto.Type;
        carePoint.Latitude = dto.Latitude;
        carePoint.Longitude = dto.Longitude;
        carePoint.Status = dto.Status;
        carePoint.LastUpdatedAt = DateTime.UtcNow;

        var updated = await _repository.UpdateAsync(carePoint);
        return new CarePointDto(
            updated.Id,
            updated.Title,
            updated.Type,
            updated.Latitude,
            updated.Longitude,
            updated.Status,
            updated.LastUpdatedAt
        );
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var carePoint = await _repository.GetByIdAsync(id);
        if (carePoint == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }

    public async Task<CarePointUpdateDto?> AddUpdateAsync(int carePointId, CreateCarePointUpdateDto dto)
    {
        var carePoint = await _repository.GetByIdAsync(carePointId);
        if (carePoint == null) return null;

        var update = new CarePointUpdate
        {
            CarePointId = carePointId,
            Note = dto.Note,
            StatusAfterUpdate = dto.StatusAfterUpdate,
            UpdatedAt = DateTime.UtcNow
        };

        var created = await _repository.AddUpdateAsync(update);

        carePoint.Status = dto.StatusAfterUpdate;
        carePoint.LastUpdatedAt = update.UpdatedAt;
        await _repository.UpdateAsync(carePoint);

        return new CarePointUpdateDto(
            created.Id,
            created.CarePointId,
            created.Note,
            created.StatusAfterUpdate,
            created.UpdatedAt
        );
    }
}
