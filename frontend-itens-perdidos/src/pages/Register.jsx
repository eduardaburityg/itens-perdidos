import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!resposta.ok) {
        const erroResposta = await resposta.json();
        throw new Error(erroResposta.message || 'Erro ao cadastrar');
      }

      alert('Conta criada com sucesso!');
      navigate('/login');
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-300 to-purple-600">
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden w-[900px] h-[500px]">
        {/* Lado Esquerdo */}
        <div className="w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center p-10 relative">
          <h1 className="text-3xl font-bold text-center mb-4">Crie sua conta</h1>
          <p className="text-center text-sm opacity-90">e participe do projeto de Itens Perdidos</p>
          <div className="absolute top-5 left-5 w-16 h-16 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-5 right-5 w-24 h-24 rounded-full bg-white opacity-10"></div>
        </div>

        {/* Lado Direito */}
        <form onSubmit={handleSubmit} className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Cadastrar</h2>
          {erro && <p className="text-red-500 text-sm mb-2 text-center">{erro}</p>}

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Nome de usuário"
              className="outline-none w-full"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
            <FaEnvelope className="text-gray-400 mr-2" />
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

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition">
            Cadastrar
          </button>

          <p className="text-sm text-center mt-4">
            Já tem uma conta? <Link to="/login" className="text-purple-600 hover:underline">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
