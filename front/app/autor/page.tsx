'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Autor {
  id: number;
  nome: string;
}

export default function AutorPage() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAutores();
  }, []);

  const fetchAutores = async () => {
    try {
      const res = await axios.get('http://localhost:3000/autor');
      setAutores(res.data);
    } catch (e) {
      setError('Erro ao carregar autores');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este autor?')) return;

    try {
      await axios.delete(`http://localhost:3000/autor/${id}`);
      setAutores(autores.filter(a => a.id !== id));
    } catch {
      alert('Erro ao excluir autor');
    }
  };

  if (loading) return <p>Carregando autores...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        minHeight: '100vh', 
        padding: '2rem',
      }}
    >
      <h1 style={{ fontWeight: 'bold' }}>Lista de Autores</h1>
      <Link 
        href="/autor/novo" 
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
        + Adicionar Novo Autor
      </Link>
      <ul 
        style={{ 
          listStyle: 'none', 
          padding: 0, 
          width: '500px' 
        }}
      >
        {autores.map(autor => (
          <li 
            key={autor.id} 
            style={{ 
              marginBottom: '0.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
            }}
          >
            <span>{autor.nome}</span>
            <div>
              <Link 
                href={`/autor/${autor.id}`} 
                style={{ 
                  marginRight: '10px',
                  padding: '4px 10px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Editar
              </Link>
              <button 
                onClick={() => handleDelete(autor.id)} 
                style={{ 
                  padding: '4px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
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
