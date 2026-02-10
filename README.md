# 🐾 PetConnect

**PetConnect** is a modern full-stack web application that connects communities, shelters, and volunteers to care for street animals, report lost and found pets, and support adoption efforts.

The project is built as a **realistic production-style application**, focusing on clean architecture, developer experience, and a modern user interface.

---

## ✨ Features

### 🗺️ Care Points
- Map-based care points for **food, water, and shelters**
- Status tracking (OK, Needs Refill, Broken)
- Update history for each care point

### 🔍 Lost & Found
- Report **lost, found, or spotted** pets
- Location-based reports
- Clear status tracking (Active / Resolved)

### 🏠 Shelters & Adoption
- List of shelters with contact information
- Centralized view for adoption opportunities

### 🎨 Modern UI
- Minimalistic, SaaS-style design
- Card-based layouts with subtle hover animations
- Clean color palette and responsive layout

---

## 🧱 Architecture Overview

### Backend — Clean Architecture (.NET 8)

```
PetConnect.Domain
PetConnect.Application
PetConnect.Infrastructure
PetConnect.Api
```

- **Domain** – Core entities and enums (no dependencies)
- **Application** – Interfaces and business logic (use cases)
- **Infrastructure** – EF Core, SQLite, repositories, data seeding
- **API** – Controllers, dependency injection, Swagger, CORS

### Frontend — React + TypeScript

- Component-based architecture
- Clear separation of pages, components, services, and hooks
- Environment-based API configuration

---

## 🛠️ Tech Stack

### Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core 8
- SQLite (auto-created on startup)
- Swagger / OpenAPI

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS (custom theme)
- React Router
- Axios

---

## 🚀 Getting Started

### Prerequisites
- **.NET SDK 8**
- **Node.js (LTS)**
- **npm**

---

## ▶️ Run the Backend

```bash
cd PetConnect/PetConnect.Api
dotnet run
```

The backend will:
- Automatically create and migrate a local SQLite database
- Seed sample data in development
- Start the API at:

```
http://localhost:5242
```

Swagger UI:
```
http://localhost:5242/swagger
```

---

## ▶️ Run the Frontend

```bash
cd petconnect-frontend
npm install
npm run dev
```

The frontend will be available at:
```
http://localhost:5173
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the frontend root if needed:

```env
VITE_API_BASE_URL=http://localhost:5242
```

---

## 📂 Project Structure

```
C:\Users\Sara\source\repos
│
├── PetConnect
│   ├── PetConnect.Api
│   ├── PetConnect.Application
│   ├── PetConnect.Domain
│   ├── PetConnect.Infrastructure
│   └── PetConnect.sln
│
└── petconnect-frontend
    ├── src
    ├── public
    └── package.json
```

---

## 💡 Design Philosophy

PetConnect is designed to feel like a **real startup product**, not a tutorial app:
- Minimalistic UI
- Clear visual hierarchy
- Smooth micro-interactions
- Clean, maintainable codebase

---

## 🔮 Future Improvements

- Interactive map (Leaflet / Mapbox)
- User authentication (JWT)
- Volunteer badges & impact statistics
- Pagination & advanced filtering
- Cloud deployment

---

## 📌 Author

**Sara Krshinar**  
Full-Stack Developer (.NET + React)

---

## 🐾 License

This project is for educational and portfolio purposes.
