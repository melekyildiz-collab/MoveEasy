import { useEffect, useState } from "react";
import "./Reminders.css";

function Reminders() {
  const [alerts, setAlerts] = useState([]);

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

    const generatedAlerts = [];

    // Documents qui expirent
    documents.forEach((doc) => {
      const expirationDate =
        new Date(doc.expiration);

      const diffDays = Math.ceil(
        (expirationDate - today) /
          (1000 * 60 * 60 * 24)
      );

      if (diffDays <= 90) {
        generatedAlerts.push({
          id: `doc-${doc.id}`,
          message: `⚠️ ${doc.nom} expire dans ${diffDays} jours`,
        });
      }
    });

    // Démarches non terminées
    demarches.forEach((demarche) => {
      if (!demarche.completed) {
        generatedAlerts.push({
          id: `demarche-${demarche.id}`,
          message: `📋 Démarche "${demarche.titre}" non terminée`,
        });
      }
    });

    setAlerts(generatedAlerts);
  }, []);

  return (
    <div className="reminders-container">
      <h1>🔔 Mes Rappels</h1>

      {alerts.length === 0 ? (
        <div className="info-card">
          Aucun rappel.
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className="alert-card"
          >
            {alert.message}
          </div>
        ))
      )}
    </div>
  );
}

export default Reminders;