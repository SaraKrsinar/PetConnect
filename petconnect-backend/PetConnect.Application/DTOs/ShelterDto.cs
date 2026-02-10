namespace PetConnect.Application.DTOs;

public record ShelterDto(
    int Id,
    string Name,
    string Phone,
    string Address,
    double Latitude,
    double Longitude
);

public record CreateShelterDto(
    string Name,
    string Phone,
    string Address,
    double Latitude,
    double Longitude
);

public record UpdateShelterDto(
    string Name,
    string Phone,
    string Address,
    double Latitude,
    double Longitude
);
