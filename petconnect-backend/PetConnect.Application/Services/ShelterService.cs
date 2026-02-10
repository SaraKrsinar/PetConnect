using PetConnect.Application.DTOs;
using PetConnect.Application.Interfaces;
using PetConnect.Domain.Entities;

namespace PetConnect.Application.Services;

public class ShelterService : IShelterService
{
    private readonly IShelterRepository _repository;

    public ShelterService(IShelterRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ShelterDto>> GetAllAsync()
    {
        var shelters = await _repository.GetAllAsync();
        return shelters.Select(s => new ShelterDto(
            s.Id,
            s.Name,
            s.Phone,
            s.Address,
            s.Latitude,
            s.Longitude
        ));
    }

    public async Task<ShelterDto?> GetByIdAsync(int id)
    {
        var shelter = await _repository.GetByIdAsync(id);
        if (shelter == null) return null;

        return new ShelterDto(
            shelter.Id,
            shelter.Name,
            shelter.Phone,
            shelter.Address,
            shelter.Latitude,
            shelter.Longitude
        );
    }

    public async Task<ShelterDto> CreateAsync(CreateShelterDto dto)
    {
        var shelter = new Shelter
        {
            Name = dto.Name,
            Phone = dto.Phone,
            Address = dto.Address,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude
        };

        var created = await _repository.CreateAsync(shelter);
        return new ShelterDto(
            created.Id,
            created.Name,
            created.Phone,
            created.Address,
            created.Latitude,
            created.Longitude
        );
    }

    public async Task<ShelterDto?> UpdateAsync(int id, UpdateShelterDto dto)
    {
        var shelter = await _repository.GetByIdAsync(id);
        if (shelter == null) return null;

        shelter.Name = dto.Name;
        shelter.Phone = dto.Phone;
        shelter.Address = dto.Address;
        shelter.Latitude = dto.Latitude;
        shelter.Longitude = dto.Longitude;

        var updated = await _repository.UpdateAsync(shelter);
        return new ShelterDto(
            updated.Id,
            updated.Name,
            updated.Phone,
            updated.Address,
            updated.Latitude,
            updated.Longitude
        );
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var shelter = await _repository.GetByIdAsync(id);
        if (shelter == null) return false;

        await _repository.DeleteAsync(id);
        return true;
    }
}
