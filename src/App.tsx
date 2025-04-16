
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import EventsList from "@/pages/EventsList";
import EventDetail from "@/pages/EventDetail";
import EventForm from "@/pages/EventForm";
import AttendeesList from "@/pages/AttendeesList";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import { EventsProvider } from "@/context/EventsContext";
import { UserProvider } from "@/context/UserContext";

function App() {
  return (
    <UserProvider>
      <EventsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/events" element={<EventsList />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/events/create" element={<EventForm />} />
            <Route path="/events/edit/:id" element={<EventForm />} />
            <Route path="/attendees" element={<AttendeesList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </EventsProvider>
    </UserProvider>
  );
}

export default App;
