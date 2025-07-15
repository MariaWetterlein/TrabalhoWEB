'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Autor {
  id: number;
  nome: string;
}

interface Livro {
  id: number;
  titulo: string;
  autor: Autor;
}

export default function LivroPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/livro')
      .then(res => setLivros(res.data))
      .catch(() => setError('Erro ao carregar livros'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja excluir este livro?')) return;
    try {
      await axios.delete(`http://localhost:3000/livro/${id}`);
      setLivros(livros.filter(l => l.id !== id));
    } catch {
      alert('Erro ao excluir livro');
    }
  };

  if (loading) return <p>Carregando livros...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>Lista de Livros</h1>
      <Link
        href="/livro/novo"
        style={{
          marginBottom: '1rem',
          display: 'inline-block',
          backgroundColor: '#4c84c5ff',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: 'bold',
          textDecoration: 'none',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#005bb5')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4c84c5ff')}
      >
        + Adicionar Novo Livro
      </Link>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {livros.map(livro => (
          <li
            key={livro.id}
            style={{
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '500px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <span>{livro.titulo} — <i>{livro.autor.nome}</i></span>
            <div>
              <Link
                href={`/livro/${livro.id}`}
                style={{
                  marginRight: '10px',
                  padding: '4px 10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(livro.id)}
                style={{
                  padding: '4px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
