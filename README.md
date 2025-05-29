## Server (Backend) - `server/README.md`

# Proxy Logger Server

This is the backend for the Proxy Logger App, built with Node.js, Express, TypeScript, and MongoDB. It provides authentication, API request logging, proxying, and log management.

---

### Key Features

- **User Authentication:** JWT-based login for secure access.
- **API Request Logging:** Logs incoming API requests, including method, URL, status, response time, and user info.
- **Log Management:** Search logs, enable/disable logging, and manage a whitelist of paths to exclude from logging.
- **Proxy API:** Securely proxy requests to external APIs (e.g., user data from JSONPlaceholder).
- **Security:** Uses Helmet and CORS for enhanced security.
- **MongoDB Integration:** Stores users and logs in MongoDB.

---

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

---

### Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd proxy-logger-app/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `server` directory with the following:
   ```
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Run the server in development:**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3001` by default.

---

### Available Scripts

- `npm run dev` — Start the server with hot-reloading (nodemon + ts-node).
- `npm test` — Placeholder for tests.

---

### API Endpoints

- `POST /api/auth/login` — User login, returns JWT.
- `GET /api/logs` — Fetch logs (searchable, protected).
- `POST /api/logs/toggle` — Enable/disable logging.
- `POST /api/logs/whitelist` — Add/remove paths from logging whitelist.
- `GET /api/proxy/users` — Proxy to external user API (protected).

---

### Project Structure

- `src/app.ts` — Express app setup, middleware, routes.
- `src/index.ts` — Server entry point.
- `src/routes/` — API route handlers.
- `src/models/` — Mongoose models.
- `src/middleware/` — Custom middleware (auth, logging, proxy).
- `src/utils/` — Utility functions and config.

---

### Security

- CORS is enabled for `http://localhost:5173` (client).
- JWT required for protected routes.
- Helmet for HTTP header security.

---

## Client (Frontend) - `client/README.md`

# Proxy Logger Client

This is the frontend for the Proxy Logger App, built with React, TypeScript, Vite, and Tailwind CSS. It provides a modern dashboard for viewing logs, managing logging, and visualizing user data.

---

### Key Features

- **Authentication:** Secure login with JWT.
- **Dashboard:** Visual summary cards, interactive charts, and user data table.
- **Logs Viewer:** Search, filter, and view API request logs. Toggle logging on/off.
- **Modern UI:** Built with Tailwind CSS and Radix UI components.
- **API Integration:** Communicates with the backend for authentication, logs, and user data.

---

### Prerequisites

- Node.js (v18+ recommended)
- npm

---

### Setup & Installation

1. **Navigate to the client directory:**
   ```bash
   cd proxy-logger-app/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `client` directory with:
   ```
   VITE_API_URL=http://localhost:3001
   ```

4. **Run the client in development:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

---

### Available Scripts

- `npm run dev` — Start the development server.
- `npm run build` — Build for production.
- `npm run preview` — Preview the production build.
- `npm run lint` — Lint the codebase.

---

### Project Structure

- `src/pages/` — Main pages (Dashboard, UserLogs, Login).
- `src/components/` — Reusable UI components.
- `src/layouts/` — Layout components.
- `src/lib/` — API and utility hooks.
- `src/assets/` — Static assets.

---

### Usage

- **Login:** Use your credentials to log in.
- **Dashboard:** View summary cards, charts, and user data.
- **Logs:** Search and filter API logs, toggle logging, and manage log settings.

---

### Tech Stack

- React 19, TypeScript, Vite
- Tailwind CSS, Radix UI, Lucide Icons
- TanStack Query, Axios, Zod

