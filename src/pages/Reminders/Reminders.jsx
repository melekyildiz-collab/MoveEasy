import { useEffect, useState } from "react";
import "./Reminders.css";
import Navbar from "../../components/Navbar/Navbar";


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
  <div className="dashboard-layout">

    

    <Navbar />

    <div className="dashboard-content">
     
  <div className="reminders-container">

    <div className="reminders-header">

      <h1>Notifications & Rappels</h1>

      <p>
        Suivez les documents à renouveler
        et les démarches à terminer.
      </p>

    </div>

    <div className="reminders-stats">

      <div className="stat-card">

        <h3>Total</h3>

        <p>{alerts.length}</p>

      </div>

      <div className="stat-card">

        <h3>Urgents</h3>

        <p>
          {
            alerts.filter((alert) =>
              alert.message.includes("expire")
            ).length
          }
        </p>

      </div>

    </div>

    {alerts.length === 0 ? (

      <div className="empty-card">

        🎉 Aucun rappel en attente

      </div>

    ) : (

      alerts.map((alert) => (

        <div
          key={alert.id}
          className="alert-card"
        >

          <div className="alert-icon">
            🔔
          </div>

          <div>

            <h4>Notification</h4>

            <p>{alert.message}</p>

          </div>

        </div>

      ))

    )}
    </div> 
 </div>
  </div>
);
}

export default Reminders;