'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Emprestimo {
  id: number;
  nomePessoa: string;
  livro: { titulo: string };
}

export default function EmprestimoPage() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/emprestimo?includeLivro=true')
      .then(res => setEmprestimos(res.data))
      .catch(() => setError('Erro ao carregar empréstimos'));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este empréstimo?')) return;
    try {
      await axios.delete(`http://localhost:3000/emprestimo/${id}`);
      setEmprestimos(emprestimos.filter(e => e.id !== id));
    } catch {
      alert('Erro ao excluir empréstimo');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>Lista de Empréstimos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link
        href="/emprestimo/novo"
        style={{
          marginBottom: '1rem',
          backgroundColor: '#4c84c5ff',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          fontWeight: 'bold',
          textDecoration: 'none',
        }}
      >
        + Adicionar Novo Empréstimo
      </Link>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {emprestimos.map(e => (
          <li key={e.id} style={{
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '500px',
          }}>
            <span>{e.nomePessoa} - <strong>{e.livro?.titulo}</strong></span>
            <div>
              <Link
                href={`/emprestimo/${e.id}`}
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
                onClick={() => handleDelete(e.id)}
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
