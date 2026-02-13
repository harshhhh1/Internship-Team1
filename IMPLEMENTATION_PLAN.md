# Implementation Plan

## Task 1 - Clients Management
**Objective:** After a client books an appointment, the client details must be visible on the Admin side with proper linking between Appointment, Client, and Salon.

### Changes Required:
1. **Backend - Appointment Model**: Add `clientId` field to link appointments to clients
2. **Backend - Appointment Controller**: Modify `createAppointment` to automatically create or find client and link them
3. **Backend - Client Controller**: Add method to find or create client by mobile number
4. **Frontend - Appointments.jsx**: Update to show client details and link to client profile
5. **Frontend - Clients.jsx**: Ensure clients from appointments are visible

---

## Task 2 - Reports Generation
**Objective:** Implement reports module with filters (Weekly, Monthly, Annually) covering Appointments, Orders, Clients, and Revenue.

### Changes Required:
1. **Backend - Report Controller**: Create new controller for generating reports
2. **Backend - Report Routes**: Create new routes for reports API
3. **Frontend - Reports Page**: Create new reports page with filter UI
4. **Frontend - Reports Table**: Display reports data in structured tables/charts

### Report Data Points:
- **Appointments**: Total count, completed, pending, cancelled by period
- **Orders/Payments**: Total orders, revenue by period
- **Clients**: New clients, active clients, VIP clients by period
- **Revenue**: Daily, weekly, monthly, yearly revenue summaries

---

## Task 3 - Salon Profile Editing
**Objective:** Admin should be able to edit salon data and profile with all fields editable except Email.

### Changes Required:
1. **Frontend - Settings.jsx**: Enhance salon editing section to allow editing all fields
2. **Backend - Salon Controller**: Ensure all fields can be updated (except email if it exists)
3. **Frontend - Salon Modal**: Update modal to allow editing all salon fields
4. **Data Flow**: Ensure updated salon data reflects correctly across the system

---

## File Changes Summary

### New Files:
- `backend/controllers/report.controller.js` - Report generation logic
- `backend/routes/report.js` - Report API routes
- `src/pages/admin/Reports.jsx` - New reports page

### Modified Files:
- `backend/models/Appointment.js` - Add clientId field
- `backend/controllers/appointment.controller.js` - Auto-create/find client
- `backend/controllers/client.controller.js` - Add findOrCreate method
- `backend/server.js` - Register new report routes
- `src/App.jsx` - Add Reports route
- `src/config/roleConfig.js` - Add reports tab
- `src/pages/admin/settings.jsx` - Enhance salon editing
- `src/components/modals/SalonModal.jsx` - Allow editing existing salon

