import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const documents = JSON.parse(localStorage.getItem("documents")) || [];

    const demarches = JSON.parse(localStorage.getItem("demarches")) || [];

    const today = new Date();

    let alerts = 0;

    documents.forEach((doc) => {
      const expirationDate = new Date(doc.expiration);

      const diffDays = Math.ceil(
        (expirationDate - today) / (1000 * 60 * 60 * 24),
      );

      if (diffDays <= 90) {
        alerts++;
      }
    });

    alerts += demarches.filter((item) => !item.completed).length;

    setNotificationCount(alerts);
  }, []);

  return (
    <>
      {/* espace réservé dans le layout */}
      <div className="sidebar-spacer"></div>

      {/* vraie sidebar */}
      <div className="sidebar">
        <div className="logo-section">
          <h1 className="logo">MoveEasy</h1>
          <p className="logo-subtitle">Assistant étudiant</p>
        </div>

        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link to="/checklist">Mes démarches</Link>
          </li>

          <li>
            <Link to="/mydocuments">Documents</Link>
          </li>

          <li className="reminder-link">
            <Link to="/reminders">Rappels</Link>

            {notificationCount > 0 && (
              <span className="badge">{notificationCount}</span>
            )}
          </li>

          <li>
            <Link to="/aides">Aides financières</Link>
          </li>

          <li>
            <Link to="/questions">Assistant</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
