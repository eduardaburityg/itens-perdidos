import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import logo7 from '../assets/logo7.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();
      console.log('🔍 Dados recebidos no login:', dados);

      if (!resposta.ok) throw new Error(dados.message || 'Erro ao fazer login');

      localStorage.setItem('usuario', JSON.stringify({ nome: dados.nome, id: dados.id }));
      localStorage.setItem('usuarioId', dados.id);

      navigate('/', { replace: true });
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-300 to-purple-600">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden w-[900px] h-[500px]">
        <div className="w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center p-10 relative">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold">Bem-vindo</h1>
            <img 
              src={logo7} 
              alt="Logo 7"
              className="w-32 h-32 mt-4 object-contain bg-transparent"
            />
            <p className="text-center text-sm opacity-90 mt-4">Squad7</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Login</h2>
          {erro && <p className="text-red-500 text-sm mb-2 text-center">{erro}</p>}

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Senha"
              className="outline-none w-full"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
          >
            Entrar
          </button>

          <p className="text-sm text-center mt-4">
            Não tem conta?{' '}
            <Link to="/register" className="text-purple-600 hover:underline">
              Crie aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}