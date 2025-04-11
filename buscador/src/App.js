import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  async function handleSearch() {
    if (input === '') {
      alert("DIGITE ALGUM CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setLogradouro(response.data.logradouro || '');
      setComplemento(response.data.complemento || '');
      setBairro(response.data.bairro || '');
      setCidade(response.data.localidade || '');
      setEstado(response.data.uf || '');
      setInput("");
    } catch {
      alert("Ops! Erro ao buscar CEP!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Digite seu CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Ex: 00000-000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#ffffff" />
        </button>
      </div>

      <main className="main">
        <h3>CEP: {cep.cep}</h3>

        <label>Rua:</label>
        <input
          type="text"
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
        />

        <label>Número:</label>
        <input
          type="text"
        />

        <label>Complemento:</label>
        <input
          type="text"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />

        <label>Bairro:</label>
        <input
          type="text"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />

        <label>Cidade:</label>
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />

        <label>Estado:</label>
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
      </main>

    </div>
  );
}

export default App;
