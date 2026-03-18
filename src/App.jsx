import { Routes, Route } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
    </Routes>
  );
}
