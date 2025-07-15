'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Livro {
  id: number;
  titulo: string;
}

export default function NovoEmprestimo() {
  const router = useRouter();
  const [nomePessoa, setNomePessoa] = useState('');
  const [livroId, setLivroId] = useState<number | null>(null);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/livro')
      .then(res => setLivros(res.data))
      .catch(() => setError('Erro ao carregar livros'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomePessoa || !livroId) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      await axios.post('http://localhost:3000/emprestimo', { nomePessoa, livroId });
      router.push('/emprestimo');
    } catch {
      setError('Erro ao criar empréstimo');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>Novo Empréstimo</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nome da Pessoa:</label><br />
          <input
            type="text"
            value={nomePessoa}
            onChange={e => setNomePessoa(e.target.value)}
            style={{ padding: '6px', width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Livro:</label><br />
          <select
            value={livroId || ''}
            onChange={e => setLivroId(Number(e.target.value))}
            style={{ padding: '6px', width: '100%' }}
          >
            <option value="">Selecione um livro</option>
            {livros.map(l => (
              <option key={l.id} value={l.id}>{l.titulo}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{
          backgroundColor: '#4c84c5ff',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Salvar
        </button>
      </form>
    </div>
  );
}
