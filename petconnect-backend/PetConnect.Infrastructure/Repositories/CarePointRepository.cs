using Microsoft.EntityFrameworkCore;
using PetConnect.Application.Interfaces;
using PetConnect.Domain.Entities;
using PetConnect.Infrastructure.Data;

namespace PetConnect.Infrastructure.Repositories;

public class CarePointRepository : ICarePointRepository
{
    private readonly PetConnectDbContext _context;

    public CarePointRepository(PetConnectDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CarePoint>> GetAllAsync()
    {
        return await _context.CarePoints
            .OrderByDescending(cp => cp.LastUpdatedAt)
            .ToListAsync();
    }

    public async Task<CarePoint?> GetByIdAsync(int id)
    {
        return await _context.CarePoints.FindAsync(id);
    }

    public async Task<CarePoint?> GetByIdWithUpdatesAsync(int id)
    {
        return await _context.CarePoints
            .Include(cp => cp.Updates.OrderByDescending(u => u.UpdatedAt))
            .FirstOrDefaultAsync(cp => cp.Id == id);
    }

    public async Task<CarePoint> CreateAsync(CarePoint carePoint)
    {
        _context.CarePoints.Add(carePoint);
        await _context.SaveChangesAsync();
        return carePoint;
    }

    public async Task<CarePoint> UpdateAsync(CarePoint carePoint)
    {
        _context.CarePoints.Update(carePoint);
        await _context.SaveChangesAsync();
        return carePoint;
    }

    public async Task DeleteAsync(int id)
    {
        var carePoint = await _context.CarePoints.FindAsync(id);
        if (carePoint != null)
        {
            _context.CarePoints.Remove(carePoint);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<CarePointUpdate> AddUpdateAsync(CarePointUpdate update)
    {
        _context.CarePointUpdates.Add(update);
        await _context.SaveChangesAsync();
        return update;
    }
}
