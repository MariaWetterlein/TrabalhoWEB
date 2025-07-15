'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditarAutorPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/autor/${id}`)
      .then(res => {
        setNome(res.data.nome);
      })
      .catch(() => setError('Erro ao carregar autor'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) {
      setError('Nome obrigatório');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await axios.patch(`http://localhost:3000/autor/${id}`, { nome });
      router.push('/autor');
    } catch {
      setError('Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando autor...</p>;

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
      <h1 style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Editar Autor</h1>
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
          disabled={saving}
          style={{
            backgroundColor: '#4c84c5ff',
            color: 'white',
            padding: '10px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 'bold',
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => !saving && (e.currentTarget.style.backgroundColor = '#005bb5')}
          onMouseLeave={e => !saving && (e.currentTarget.style.backgroundColor = '#4c84c5ff')}
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
