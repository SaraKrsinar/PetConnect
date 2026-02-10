using Microsoft.EntityFrameworkCore;
using PetConnect.Application.Interfaces;
using PetConnect.Domain.Entities;
using PetConnect.Infrastructure.Data;

namespace PetConnect.Infrastructure.Repositories;

public class ShelterRepository : IShelterRepository
{
    private readonly PetConnectDbContext _context;

    public ShelterRepository(PetConnectDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Shelter>> GetAllAsync()
    {
        return await _context.Shelters
            .OrderBy(s => s.Name)
            .ToListAsync();
    }

    public async Task<Shelter?> GetByIdAsync(int id)
    {
        return await _context.Shelters.FindAsync(id);
    }

    public async Task<Shelter> CreateAsync(Shelter shelter)
    {
        _context.Shelters.Add(shelter);
        await _context.SaveChangesAsync();
        return shelter;
    }

    public async Task<Shelter> UpdateAsync(Shelter shelter)
    {
        _context.Shelters.Update(shelter);
        await _context.SaveChangesAsync();
        return shelter;
    }

    public async Task DeleteAsync(int id)
    {
        var shelter = await _context.Shelters.FindAsync(id);
        if (shelter != null)
        {
            _context.Shelters.Remove(shelter);
            await _context.SaveChangesAsync();
        }
    }
}
