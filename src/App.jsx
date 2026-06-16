import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import Checklist from "./pages/Checklist/Checklist";
import MyDocuments from "./pages/MyDocuments/MyDocuments";
import Reminders from "./pages/Reminders/Reminders";
import Aides from "./pages/Aides/Aides";
import AssistantIA from "./pages/AssistantIA/AssistantIA";
import DemarcheDetails from "./pages/DemarcheDetails/DemarcheDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/checklist"
          element={<Checklist />}
        />

        <Route
          path="/mydocuments"
          element={<MyDocuments />}
        />

        <Route
          path="/reminders"
          element={<Reminders />}
        />

        <Route
          path="/aides"
          element={<Aides />}
        />

        <Route
          path="/assistantia"
          element={<AssistantIA />}
        />
<Route
  path="/demarche/:id"
  element={<DemarcheDetails />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;