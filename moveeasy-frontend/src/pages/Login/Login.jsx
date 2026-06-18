import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fillette1 from "../../assets/fillette1.webp";
import eyeOpen from "../../assets/oeil.png";
import eyeClosed from "../../assets/cacher.png";
import api from "../../api/axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("moveeasy_token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="auth-container">
      {/* LEFT */}
      <div className="auth-left">
        <h1>MoveEasy</h1>
        <p>Bienvenue sur MoveEasy</p>

        <img src={fillette1} alt="illustration" className="auth-img" />

        <ul className="auth-features">
          <li>✓ Démarches simplifiées</li>
          <li>✓ Suivi personnalisé</li>
          <li>✓ Rappels intelligents</li>
          <li>✓ Aides financières</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Connexion</h2>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? eyeClosed : eyeOpen}
                alt="toggle password"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
          </div>

          <button type="submit">Login</button>

          <p className="auth-register-link">
            Vous n'avez pas de compte ? <a href="/register">Créer un compte</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
