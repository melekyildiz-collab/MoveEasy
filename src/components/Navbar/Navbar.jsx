import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [notificationCount, setNotificationCount] =
    useState(0);

  useEffect(() => {

    const documents =
      JSON.parse(
        localStorage.getItem("documents")
      ) || [];

    const demarches =
      JSON.parse(
        localStorage.getItem("demarches")
      ) || [];

    const today = new Date();

    let alerts = 0;

    // Documents qui expirent bientôt
    documents.forEach((doc) => {

      const expirationDate =
        new Date(doc.expiration);

      const diffDays =
        Math.ceil(
          (expirationDate - today) /
          (1000 * 60 * 60 * 24)
        );

      if (diffDays <= 90) {
        alerts++;
      }

    });

    // Démarches non terminées
    alerts += demarches.filter(
      (item) => !item.completed
    ).length;

    setNotificationCount(alerts);

  }, []);

  return (
    <div className="sidebar">

      <h2 className="logo">
        MoveEasy
      </h2>

      <ul>

        <li>
          <Link to="/dashboard">
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/checklist">
            📋 Checklist
          </Link>
        </li>

        <li>
          <Link to="/mydocuments">
            📁 Mes Documents
          </Link>
        </li>

        <li className="reminder-link">

          <Link to="/reminders">
            🔔 Rappels
          </Link>

          {notificationCount > 0 && (
            <span className="badge">
              {notificationCount}
            </span>
          )}

        </li>

        <li>
          <Link to="/aides">
            💰 Aides
          </Link>
        </li>

        <li>
          <Link to="/assistantia">
            🤖 Assistant IA
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default Navbar;