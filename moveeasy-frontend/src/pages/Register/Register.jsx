import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import fillette1Img from '../../assets/fillette1.png'

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    navigate('/complete-profile')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Panneau gauche */}
      <div className="hidden lg:flex flex-col w-2/5 bg-white border-r border-gray-100 h-screen sticky top-0 overflow-hidden">
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🧳</span>
            </div>
            <span className="font-bold text-lg text-gray-800">MoveEasy</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Bienvenue sur</h1>
          <h1 className="text-xl font-bold text-blue-600 mb-3">MoveEasy</h1>
          <p className="text-gray-500 text-xs">Votre assistant intelligent pour réussir votre installation en France.</p>
        </div>

        <div className="flex-1 min-h-0 bg-blue-50 flex items-center justify-center overflow-hidden">
          <img src={fillette1Img} alt="fillette1" className="w-full h-full object-contain" />
        </div>

        <ul className="px-8 py-4 space-y-2 text-sm text-gray-500">
          <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Démarches simplifiées</li>
          <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Suivi personnalisé</li>
          <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Rappels intelligents</li>
          <li className="flex items-center gap-2"><span className="text-blue-500">✓</span> Aides financières</li>
        </ul>
      </div>

      {/* Panneau droit */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

          <a href="/login" className="text-gray-400 hover:text-gray-600 text-lg mb-6 block">←</a>

          <h2 className="text-xl font-bold text-gray-800 mb-1">Créer un compte</h2>
          <p className="text-gray-400 text-sm mb-6">Rejoignez MoveEasy en quelques étapes</p>

          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input type="text" placeholder="Votre nom" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input type="text" placeholder="Votre prénom" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="exemple@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="Minimum 8 caractères" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition pr-10" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} placeholder="Confirmez votre mot de passe" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition pr-10" />
              <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-6">
            <input type="checkbox" className="mt-1 accent-blue-600" />
            <p className="text-sm text-gray-500">
              J'accepte les{' '}
              <a href="#" className="text-blue-500 hover:underline">Conditions d'utilisation</a>
              {' '}et la{' '}
              <a href="#" className="text-blue-500 hover:underline">Politique de confidentialité</a>
            </p>
          </div>

          <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition mb-6">
            Créer mon compte
          </button>

          <p className="text-center text-sm text-gray-500">
            Vous avez déjà un compte ?{' '}
            <a href="/login" className="text-blue-500 font-medium hover:underline">Se connecter</a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register