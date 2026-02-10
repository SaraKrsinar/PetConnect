using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PetConnect.Application.Interfaces;
using PetConnect.Application.Services;
using PetConnect.Infrastructure.Data;
using PetConnect.Infrastructure.Repositories;

namespace PetConnect.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<PetConnectDbContext>(options =>
            options.UseSqlite(connectionString));
        services.AddScoped<ICarePointRepository, CarePointRepository>();
        services.AddScoped<IPetReportRepository, PetReportRepository>();
        services.AddScoped<IShelterRepository, ShelterRepository>();
        services.AddScoped<ICarePointService, CarePointService>();
        services.AddScoped<IPetReportService, PetReportService>();
        services.AddScoped<IShelterService, ShelterService>();

        return services;
    }
}
