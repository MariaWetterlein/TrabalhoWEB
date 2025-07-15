'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

interface Autor {
  id: number;
  nome: string;
}

export default function EditarLivroPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [titulo, setTitulo] = useState('');
  const [autorId, setAutorId] = useState<number | ''>('');
  const [autores, setAutores] = useState<Autor[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [resLivro, resAutores] = await Promise.all([
          axios.get(`http://localhost:3000/livro/${id}`),
          axios.get('http://localhost:3000/autor'),
        ]);

        setTitulo(resLivro.data.titulo);
        setAutorId(resLivro.data.autorId);

        if (Array.isArray(resAutores.data)) {
          setAutores(resAutores.data);
        } else {
          setAutores([]);
          setError('Erro ao carregar lista de autores');
        }
      } catch (err) {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setError('Título obrigatório');
      return;
    }
    if (autorId === '') {
      setError('Autor obrigatório');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await axios.patch(`http://localhost:3000/livro/${id}`, {
        titulo,
        autorId,
      });
      router.push('/livro');
    } catch {
      setError('Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>Editar Livro</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Título:</label><br />
        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        />
        <label>Autor:</label><br />
        <select
          value={autorId}
          onChange={e => setAutorId(Number(e.target.value))}
          style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
        >
          <option value="">Selecione um autor</option>
          {Array.isArray(autores) && autores.map((autor) => (
            <option key={autor.id} value={autor.id}>
              {autor.nome}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4c84c5ff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: saving ? 'not-allowed' : 'pointer',
          }}
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
