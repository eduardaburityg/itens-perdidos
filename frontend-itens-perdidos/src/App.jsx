import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './pages/Login';
import Register from './pages/Register';
import CadastroItem from './pages/CadastroItem';
import ListagemItens from './pages/ListagemItens';

function AppContent() {
  const [usuario, setUsuario] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuario');
    console.log('✅ Usuário carregado no App.jsx:', dadosSalvos);
    setUsuario(dadosSalvos ? JSON.parse(dadosSalvos) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioId');
    setUsuario(null);
    window.location.href = '/login';
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          usuario ? (
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-700 to-purple-500 shadow-md flex justify-between items-center p-4">
                <h1 className="text-4xl font-bold text-white">Itens Perdidos</h1>
                <button
                  onClick={handleLogout}
                  className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-md hover:bg-purple-100 transition"
                >
                  Sair
                </button>
              </div>
              <p className="text-center text-purple-100 bg-purple-700 py-2">
                Bem-vindo(a), {usuario?.nome || 'Usuário'}!
              </p>
              <CadastroItem />
              <hr className="my-6" />
              <ListagemItens />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
