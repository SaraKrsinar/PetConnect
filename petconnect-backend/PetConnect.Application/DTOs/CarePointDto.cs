using PetConnect.Domain.Enums;

namespace PetConnect.Application.DTOs;

public record CarePointDto(
    int Id,
    string Title,
    CarePointType Type,
    double Latitude,
    double Longitude,
    CarePointStatus Status,
    DateTime LastUpdatedAt
);

public record CreateCarePointDto(
    string Title,
    CarePointType Type,
    double Latitude,
    double Longitude,
    CarePointStatus Status
);

public record UpdateCarePointDto(
    string Title,
    CarePointType Type,
    double Latitude,
    double Longitude,
    CarePointStatus Status
);

public record CarePointUpdateDto(
    int Id,
    int CarePointId,
    string Note,
    CarePointStatus StatusAfterUpdate,
    DateTime UpdatedAt
);

public record CreateCarePointUpdateDto(
    string Note,
    CarePointStatus StatusAfterUpdate
);

public record CarePointWithUpdatesDto(
    int Id,
    string Title,
    CarePointType Type,
    double Latitude,
    double Longitude,
    CarePointStatus Status,
    DateTime LastUpdatedAt,
    IEnumerable<CarePointUpdateDto> Updates
);
