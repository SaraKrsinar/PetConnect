using Microsoft.EntityFrameworkCore;
using PetConnect.Application.Interfaces;
using PetConnect.Domain.Entities;
using PetConnect.Infrastructure.Data;

namespace PetConnect.Infrastructure.Repositories;

public class PetReportRepository : IPetReportRepository
{
    private readonly PetConnectDbContext _context;

    public PetReportRepository(PetConnectDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PetReport>> GetAllAsync()
    {
        return await _context.PetReports
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<PetReport?> GetByIdAsync(int id)
    {
        return await _context.PetReports.FindAsync(id);
    }

    public async Task<PetReport> CreateAsync(PetReport petReport)
    {
        _context.PetReports.Add(petReport);
        await _context.SaveChangesAsync();
        return petReport;
    }

    public async Task<PetReport> UpdateAsync(PetReport petReport)
    {
        _context.PetReports.Update(petReport);
        await _context.SaveChangesAsync();
        return petReport;
    }

    public async Task DeleteAsync(int id)
    {
        var petReport = await _context.PetReports.FindAsync(id);
        if (petReport != null)
        {
            _context.PetReports.Remove(petReport);
            await _context.SaveChangesAsync();
        }
    }
}
