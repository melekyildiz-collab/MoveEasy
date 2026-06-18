import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    completed: 0,
    remaining: 0,
    progress: 0,
  });

  const [nextStep, setNextStep] = useState("");
  const [pendingDemarches, setPendingDemarches] = useState([]);
  const [remindersCount, setRemindersCount] = useState(0);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const demarches = JSON.parse(localStorage.getItem("demarches")) || [];

    const documents = JSON.parse(localStorage.getItem("documents")) || [];

    // Statistiques Checklist
    const completed = demarches.filter((item) => item.completed).length;

    const remaining = demarches.length - completed;

    const progress =
      demarches.length > 0
        ? Math.round((completed / demarches.length) * 100)
        : 0;

    // Prochaine démarche
    const nextDemarche = demarches.find((item) => !item.completed);

    setNextStep(
      nextDemarche
        ? nextDemarche.titre
        : "🎉 Toutes les démarches sont terminées !",
    );

    setStats({
      completed,
      remaining,
      progress,
    });

    setPendingDemarches(
      demarches.filter((item) => {
        if (item.completed) {
          return false;
        }

        if (!item.dependsOn) {
          return true;
        }

        return item.dependsOn.every((dependencyId) => {
          const dependency = demarches.find((d) => d.id === dependencyId);

          return dependency?.completed;
        });
      }),
    );

    // Calcul des rappels
    const today = new Date();

    let alerts = 0;

    // Documents qui expirent bientôt
    documents.forEach((doc) => {
      const expirationDate = new Date(doc.expiration);

      const diffDays = Math.ceil(
        (expirationDate - today) / (1000 * 60 * 60 * 24),
      );

      if (diffDays <= 90) {
        alerts++;
      }
    });

    // Démarches non terminées
    alerts += demarches.filter((item) => !item.completed).length;

    setRemindersCount(alerts);
  }, []);
  const myDocuments = JSON.parse(localStorage.getItem("documents")) || [];

  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Bonjour {user?.prenom || "Utilisateur"}</h1>
          <p>Bienvenue sur MoveEasy</p>
        </div>

        <div className="dashboard-hero">
          <div className="progress-hero">
            <div className="circle-progress">{stats.progress}%</div>

            <div>
              <span>PROGRESSION GLOBALE</span>

              <h2>
                {stats.completed}/{stats.completed + stats.remaining}
              </h2>

              <p>démarches</p>
            </div>
          </div>

          <div className="next-hero">
            <span>PROCHAINE ACTION</span>

            <h3>{nextStep}</h3>

            <p>Continuez votre installation administrative.</p>
          </div>
        </div>

        <h2 className="section-title">⚠️ Urgent à traiter maintenant</h2>

        <div className="urgent-list">
          <div className="urgent-list">
            {pendingDemarches.map((demarche) => (
              <div
                key={demarche.id}
                className="urgent-item"
                onClick={() => navigate(`/demarche/${demarche.id}`)}
              >
                <div>
                  <h4>{demarche.titre}</h4>

                  <p className="urgent-progress">
                    📄{" "}
                    {
                      demarche.documents.filter((doc) =>
                        myDocuments.some(
                          (myDoc) =>
                            myDoc.nom.toLowerCase() === doc.nom.toLowerCase(),
                        ),
                      ).length
                    }
                    /{demarche.documents.length}
                    {" • "}
                    📋{" "}
                    {JSON.parse(
                      localStorage.getItem(`steps-${demarche.id}`),
                    )?.filter(Boolean).length || 0}
                    /4
                  </p>
                  {demarche.documents.filter(
                    (doc) =>
                      !myDocuments.some(
                        (myDoc) =>
                          myDoc.nom.toLowerCase() === doc.nom.toLowerCase(),
                      ),
                  ).length > 0 ? (
                    <div className="missing-docs">
                      <span>📄 Documents manquants</span>

                      {demarche.documents
                        .filter(
                          (doc) =>
                            !myDocuments.some(
                              (myDoc) =>
                                myDoc.nom.toLowerCase() ===
                                doc.nom.toLowerCase(),
                            ),
                        )
                        .map((doc, index) => (
                          <p key={index}>• {doc.nom}</p>
                        ))}
                    </div>
                  ) : (
                    <div className="documents-ready">
                      ✅ Tous les documents sont prêts
                    </div>
                  )}
                  <div className="mini-progress">
                    <div
                      className="mini-progress-fill"
                      style={{
                        width: `${Math.round(
                          ((demarche.documents.filter((doc) =>
                            myDocuments.some(
                              (myDoc) =>
                                myDoc.nom.toLowerCase() ===
                                doc.nom.toLowerCase(),
                            ),
                          ).length +
                            (JSON.parse(
                              localStorage.getItem(`steps-${demarche.id}`),
                            )?.filter(Boolean).length || 0)) /
                            7) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <span>{demarche.duree}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Démarches restantes</h3>
          <p>{stats.remaining}</p>
        </div>

        <div className="card">
          <h3>Démarches terminées</h3>
          <p>{stats.completed}</p>
        </div>

        <div className="card">
          <h3>Notifications</h3>
          <p>{remindersCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
