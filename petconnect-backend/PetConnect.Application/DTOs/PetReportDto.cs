using PetConnect.Domain.Enums;

namespace PetConnect.Application.DTOs;

public record PetReportDto(
    int Id,
    PetReportType Type,
    PetType PetType,
    string Description,
    string? PhotoUrl,
    double Latitude,
    double Longitude,
    PetReportStatus Status,
    DateTime CreatedAt
);

public record CreatePetReportDto(
    PetReportType Type,
    PetType PetType,
    string Description,
    string? PhotoUrl,
    double Latitude,
    double Longitude
);

public record UpdatePetReportDto(
    PetReportType Type,
    PetType PetType,
    string Description,
    string? PhotoUrl,
    double Latitude,
    double Longitude,
    PetReportStatus Status
);
