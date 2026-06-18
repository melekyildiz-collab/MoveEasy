import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fillette1 from "../../assets/fillette1.webp";
import api from "../../api/axios";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        nom,
        prenom,
      });

      localStorage.setItem("moveeasy_token", res.data.token);
      navigate("/complete-profile");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="register-container">
      {/* LEFT PANEL */}
      <div className="register-left">
        <div className="register-brand">
          <div className="register-logo">🧳 MoveEasy</div>
          <div className="register-title">Bienvenue sur MoveEasy</div>
        </div>

        <div>
          <img src={fillette1} alt="illustration" className="register-image" />
        </div>

        <ul className="register-features">
          <li>
            <span>✓</span> Démarches simplifiées
          </li>
          <li>
            <span>✓</span> Suivi personnalisé
          </li>
          <li>
            <span>✓</span> Rappels intelligents
          </li>
          <li>
            <span>✓</span> Aides financières
          </li>
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="register-right">
        <div className="register-card">
          <h2>Créer un compte</h2>

          {/* NOM */}
          <input
            className="register-input"
            placeholder="Nom"
            onChange={(e) => setNom(e.target.value)}
          />

          {/* PRENOM */}
          <input
            className="register-input"
            placeholder="Prénom"
            onChange={(e) => setPrenom(e.target.value)}
          />

          {/* EMAIL */}
          <input
            className="register-input"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="register-password">
            <input
              className="register-input"
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="register-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* BUTTON */}
          <button className="register-button" onClick={handleSubmit}>
            Créer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
