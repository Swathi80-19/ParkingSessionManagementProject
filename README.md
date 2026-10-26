# 🅿️ ParkEase — Parking Session Management System

> **KLEF SOA Docker Assignment** | Spring Boot + React + MySQL + Docker

---

## 📐 Project Architecture

```
repository-root/
├── backend/               ← Spring Boot (Java 17, Maven)
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/              ← React + Vite (Node 20, Bootstrap 5)
│   ├── src/
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml     ← Runs all 3 services
└── .github/
    └── workflows/
        └── docker-build-push.yml
```

### Technology Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3.3.5, Spring Data JPA, Validation |
| Database | MySQL 8.0 |
| API Docs | Springdoc OpenAPI 2.6.0 (Swagger UI) |
| Frontend | React 19, Vite 8, Bootstrap 5, Axios |
| Container | Docker, Docker Compose, Nginx |
| CI/CD | GitHub Actions |

---

## ✅ Required Software Versions

| Software | Minimum Version |
|---|---|
| Java | 17 |
| Maven | 3.8+ |
| Node.js | 18+ |
| MySQL | 8.0 |
| Docker | 24.0+ |
| Docker Compose | v2 |

---

## 🗄️ MySQL Database Setup

```sql
CREATE DATABASE parkingsessiondb;
-- Spring Boot will auto-create the table via ddl-auto=update
```

Or just start MySQL and create the database — the app handles table creation.

---

## 🔑 Environment Variables

### Backend

| Variable | Default | Description |
|---|---|---|
| `DB_URL` | `jdbc:mysql://localhost:3306/parkingsessiondb` | JDBC URL |
| `DB_USERNAME` | `root` | Database username |
| `DB_PASSWORD` | *(required)* | Database password |

### Docker Compose

| Variable | Default | Description |
|---|---|---|
| `MYSQL_ROOT_PASSWORD` | `rootpassword` | MySQL root password |

### Frontend (Vite)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:8080` | Backend base URL |

Copy `.env.example` to `.env` in the `frontend/` folder and adjust as needed.

---

## 🚀 Local Development Startup

### 1. Start MySQL

```bash
# Using Docker (simplest)
docker run -d --name parking-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=parkingsessiondb \
  -p 3306:3306 \
  mysql:8.0
```

### 2. Start Backend

```bash
cd backend
# Windows
set DB_PASSWORD=root && mvn spring-boot:run

# macOS / Linux
DB_PASSWORD=root mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

### 3. Start Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend starts at: **http://localhost:5173**

---

## 🔗 REST API Endpoints

| Method | Endpoint | Description | Response |
|---|---|---|---|
| `POST` | `/parkingsession/add` | Add a parking session | `201 Created` |
| `GET` | `/parkingsession/dipsplayall` | Get all parking sessions | `200 OK` |
| `GET` | `/parkingsession/displayparkingsessionbyid/{id}` | Get session by ID | `200 OK` |
| `DELETE` | `/parkingsession/deleteparkingsessionbyid/{id}` | Delete session by ID | `204 No Content` |

### Example POST Request Body

```json
{
  "vehicleNumber": "AP39AB1234",
  "entryTime": "2026-10-26T10:30:00",
  "fee": 100.0,
  "paid": false
}
```

---

## 📖 Swagger UI

Access the interactive API documentation at:

**http://localhost:8080/swagger-ui/index.html**

All four endpoints are documented with request/response schemas and HTTP status codes.

---

## 🏗️ Build Commands

### Backend

```bash
cd backend
mvn clean package -DskipTests   # Build JAR
mvn clean package               # Build + run tests
```

### Frontend

```bash
cd frontend
npm install
npm run build    # Production build → dist/
npm run dev      # Development server
```

---

## 🐳 Docker Build & Compose

### Build individual images

```bash
# Backend
docker build -t parking-backend ./backend

# Frontend
docker build -t parking-frontend ./frontend
```

### Run with Docker Compose

```bash
# Start all services (MySQL, Backend, Frontend)
MYSQL_ROOT_PASSWORD=rootpassword docker-compose up --build

# Stop all services
docker-compose down

# Stop and remove volumes (wipe database)
docker-compose down -v
```

Access the application: **http://localhost** (port 80)

The Nginx reverse proxy forwards `/parkingsession/*` requests from the browser to the backend container, so the browser never needs to know the internal Docker hostname.

---

## ⚙️ GitHub Actions CI/CD

The workflow at `.github/workflows/docker-build-push.yml` builds and pushes images to Docker Hub on every push to `main`/`master`.

### Required GitHub Repository Secrets

| Secret | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub Access Token (Settings → Security) |

### Image Names

```
<DOCKERHUB_USERNAME>/docker-backend-<STUDENT_ID>:latest
<DOCKERHUB_USERNAME>/docker-frontend-<STUDENT_ID>:latest
```

> **Important:** Update `STUDENT_ID` in `.github/workflows/docker-build-push.yml` line 12.

### Add Secrets in GitHub

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Add `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`

---

## 🧪 Manual End-to-End Testing

1. **Add a session** — Fill the form, click "Add Parking Session", verify it appears in the table
2. **View details** — Click "View" on any row, check ID, vehicle number, time, fee, and status
3. **Delete a session** — Click "Delete", confirm, verify it's removed from table and cards
4. **Search** — Type a vehicle number prefix in the search bar
5. **Filter** — Select "Paid Only" or "Unpaid Only" from the dropdown
6. **Backend unavailable** — Stop the backend; a friendly error should appear in the table
7. **Invalid form** — Submit empty fields; field-level errors should appear
8. **Swagger** — Visit `http://localhost:8080/swagger-ui/index.html` and test all 4 endpoints

---

## 📦 Package Structure

### Backend (`com.klef.soa.docker`)

```
com.klef.soa.docker
├── ParkingSessionBackendApplication.java
├── configuration/
│   ├── WebConfig.java             ← CORS
│   ├── OpenApiConfig.java         ← Swagger
│   └── GlobalExceptionHandler.java
├── entity/
│   └── ParkingSession.java
├── repository/
│   └── ParkingSessionRepository.java
├── service/
│   ├── ParkingSessionService.java
│   └── impl/
│       └── ParkingSessionServiceImpl.java
├── dto/
│   ├── ParkingSessionRequest.java
│   └── ParkingSessionResponse.java
└── controller/
    └── ParkingSessionController.java
```

### Frontend (`src/`)

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── SummaryCards.jsx
│   ├── ParkingSessionForm.jsx
│   ├── ParkingSessionTable.jsx
│   ├── ParkingSessionDetailsModal.jsx
│   └── DeleteConfirmationModal.jsx
├── services/
│   └── parkingSessionService.js
├── App.jsx
├── main.jsx
└── index.css
```
