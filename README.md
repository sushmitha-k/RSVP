# RSVP Management App

A full-stack RSVP management system built using Node.js, PostgreSQL, Redis, and React.  
Users can submit their RSVP details, view the guest list, and authorized users can update or delete RSVPs.

---

## Tech Stack

### Backend

- Node.js
- Express
- PostgreSQL
- Redis
- Token-based authentication

### Frontend

- React
- Context API
- SCSS Modules
- Axios

---

## Features

### Backend

- Create, fetch, update, and delete RSVPs
- Redis caching for RSVP list endpoint
- Cache invalidation on create/update/delete
- Input validation and sanitization
- Token-based authentication for delete operations
- Graceful error handling

### Frontend

- Responsive RSVP form
- Guest list with pagination
- Search with debounce
- Edit and delete with confirmation modal
- Loading, empty, and error states
- Mobile-friendly layout
- Export guest list as CSV

---

## Caching Strategy

- RSVP list data is cached using Redis
- Cache is cleared whenever data is created, updated, or deleted
- Ensures fast reads while keeping data consistent

---

## Security Considerations

- Parameterized SQL queries to prevent SQL injection
- Client-side and server-side input validation
- Token-based authentication for destructive actions
- No sensitive information exposed in error responses

---

## Running the App Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```
