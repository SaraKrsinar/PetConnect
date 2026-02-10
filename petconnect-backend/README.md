# PetConnect

A community-driven web platform that helps people care for street animals, report lost/found pets, and connect with shelters and adoption opportunities.

## Tech Stack

- **Backend**: ASP.NET Core Web API (.NET 8)
- **Architecture**: Clean Architecture (Domain, Application, Infrastructure, Api)
- **Database**: SQLite using Entity Framework Core 8
- **Frontend**: React (TypeScript) - Coming soon

## Project Structure

```
PetConnect/
├── PetConnect.Domain/          # Entities and Enums (no dependencies)
│   ├── Entities/
│   │   ├── CarePoint.cs
│   │   ├── CarePointUpdate.cs
│   │   ├── PetReport.cs
│   │   └── Shelter.cs
│   └── Enums/
│       ├── CarePointStatus.cs
│       ├── CarePointType.cs
│       ├── PetReportStatus.cs
│       ├── PetReportType.cs
│       └── PetType.cs
│
├── PetConnect.Application/     # Interfaces, DTOs, Services (use cases)
│   ├── DTOs/
│   ├── Interfaces/
│   └── Services/
│
├── PetConnect.Infrastructure/  # EF Core DbContext, Repositories, SQLite
│   ├── Data/
│   │   ├── PetConnectDbContext.cs
│   │   └── DataSeeder.cs
│   ├── Migrations/
│   └── Repositories/
│
└── PetConnect.Api/             # Controllers, DI, Swagger
    └── Controllers/
        ├── CarePointsController.cs
        ├── PetReportsController.cs
        └── SheltersController.cs
```

## Getting Started

### Prerequisites

- .NET 8 SDK
- Visual Studio 2022 or VS Code

### Running the Backend

1. Clone the repository
2. Navigate to the PetConnect folder
3. Run the API:

```bash
cd PetConnect.Api
dotnet run
```

The API will automatically:
- Create the SQLite database (`petconnect.db`)
- Apply all migrations
- Seed sample data in development mode

### API Endpoints

The API runs on `http://localhost:5242` by default.

Swagger UI is available at the root URL: `http://localhost:5242`

#### Care Points
- `GET /api/carepoints` - Get all care points
- `GET /api/carepoints/{id}` - Get care point by ID with update history
- `POST /api/carepoints` - Create a new care point
- `PUT /api/carepoints/{id}` - Update a care point
- `DELETE /api/carepoints/{id}` - Delete a care point
- `POST /api/carepoints/{id}/updates` - Add an update to a care point

#### Pet Reports
- `GET /api/petreports` - Get all pet reports
- `GET /api/petreports/{id}` - Get pet report by ID
- `POST /api/petreports` - Create a new pet report
- `PUT /api/petreports/{id}` - Update a pet report
- `DELETE /api/petreports/{id}` - Delete a pet report

#### Shelters
- `GET /api/shelters` - Get all shelters
- `GET /api/shelters/{id}` - Get shelter by ID
- `POST /api/shelters` - Create a new shelter
- `PUT /api/shelters/{id}` - Update a shelter
- `DELETE /api/shelters/{id}` - Delete a shelter

## Domain Models

### CarePoint
Represents a location where street animals can find food, water, or shelter.
- **Types**: Food, Water, Shelter
- **Status**: Ok, NeedsRefill, Broken

### PetReport
Represents a report about a lost, found, or spotted pet.
- **Report Types**: Lost, Found, Spotted
- **Pet Types**: Dog, Cat, Other
- **Status**: Active, Resolved

### Shelter
Represents an animal shelter or rescue organization.

## Configuration

### Connection String
The SQLite database connection string can be configured in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=petconnect.db"
  }
}
```

### CORS
CORS is configured to allow requests from:
- `http://localhost:3000` (Create React App)
- `http://localhost:5173` (Vite)

## License

MIT
