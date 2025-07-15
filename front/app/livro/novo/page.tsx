'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Autor {
  id: number;
  nome: string;
}

export default function NovoLivroPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState('');
  const [autorId, setAutorId] = useState<number | ''>('');
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/autor')
      .then(res => setAutores(res.data))
      .catch(() => setError('Erro ao carregar autores'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !autorId) {
      setError('Preencha todos os campos');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:3000/livro', { titulo, autorId });
      router.push('/livro');
    } catch {
      setError('Erro ao criar livro');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>Novo Livro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Título:</label><br />
          <input
            type="text"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Autor:</label><br />
          <select
            value={autorId}
            onChange={e => setAutorId(Number(e.target.value))}
            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
          >
            <option value="">Selecione o autor</option>
            {autores.map(a => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#4c84c5ff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            border: 'none',
            width: '100%',
          }}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
