'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function NovoAutorPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError('Nome obrigatório');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:3000/autor', { nome });
      router.push('/autor');  
    } catch {
      setError('Erro ao criar autor');
      setLoading(false);
    }
  };

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
      <h1 style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Novo Autor</h1>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: '300px',
          gap: '1rem',
        }}
      >
        <label htmlFor="nome" style={{ fontWeight: 'bold' }}>Nome:</label>
        <input
          id="nome"
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{
            backgroundColor: '#4c84c5ff',
            color: 'white',
            padding: '10px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => !loading && (e.currentTarget.style.backgroundColor = '#005bb5')}
          onMouseLeave={e => !loading && (e.currentTarget.style.backgroundColor = '#4c84c5ff')}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
