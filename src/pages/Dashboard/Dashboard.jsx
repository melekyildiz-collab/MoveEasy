import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    completed: 0,
    remaining: 0,
    progress: 0,
  });

  const [nextStep, setNextStep] = useState("");
  const [remindersCount, setRemindersCount] = useState(0);

  useEffect(() => {
    const demarches =
      JSON.parse(
        localStorage.getItem("demarches")
      ) || [];

    const documents =
      JSON.parse(
        localStorage.getItem("documents")
      ) || [];

    // Statistiques Checklist
    const completed =
      demarches.filter(
        (item) => item.completed
      ).length;

    const remaining =
      demarches.length - completed;

    const progress =
      demarches.length > 0
        ? Math.round(
            (completed /
              demarches.length) *
              100
          )
        : 0;

    // Prochaine démarche
    const nextDemarche =
      demarches.find(
        (item) => !item.completed
      );

    setNextStep(
      nextDemarche
        ? nextDemarche.titre
        : "🎉 Toutes les démarches sont terminées !"
    );

    setStats({
      completed,
      remaining,
      progress,
    });

    // Calcul des rappels
    const today = new Date();

    let alerts = 0;

    // Documents qui expirent bientôt
    documents.forEach((doc) => {
      const expirationDate =
        new Date(doc.expiration);

      const diffDays = Math.ceil(
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

    setRemindersCount(alerts);
  }, []);

  return (
    <div className="dashboard-layout">

      <Navbar />

      <div className="dashboard-content">

        <h1>Bonjour Melek 👋</h1>

        <p className="subtitle">
          Bienvenue sur MoveEasy
        </p>

        <div className="stats">

          <div className="card">
            <h3>Démarches restantes</h3>
            <p>{stats.remaining}</p>
          </div>

          <div className="card">
            <h3>Démarches terminées</h3>
            <p>{stats.completed}</p>
          </div>

          <div className="card">
            <h3>Rappels actifs</h3>
            <p>{remindersCount}</p>
          </div>

          <div className="card">
            <h3>Progression</h3>
            <p>{stats.progress}%</p>
          </div>

        </div>

        <div className="section">

          <h2>
            📌 Prochaine démarche
          </h2>

          <div className="next-step">
            {nextStep}
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;