'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

interface Livro {
  id: number;
  titulo: string;
}

export default function EditarEmprestimoPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [nomePessoa, setNomePessoa] = useState('');
  const [livroId, setLivroId] = useState<number | null>(null);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function carregarDados() {
      try {
        const [emprestimoRes, livrosRes] = await Promise.all([
          axios.get(`http://localhost:3000/emprestimo/${id}`),
          axios.get('http://localhost:3000/livro')
        ]);

        setNomePessoa(emprestimoRes.data.nomePessoa);
        setLivroId(emprestimoRes.data.livroId);
        setLivros(livrosRes.data);
      } catch {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }

    carregarDados();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomePessoa || !livroId) {
      setError('Preencha todos os campos');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await axios.patch(`http://localhost:3000/emprestimo/${id}`, {
        nomePessoa,
        livroId,
      });
      router.push('/emprestimo');
    } catch {
      setError('Erro ao salvar alterações');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontWeight: 'bold' }}>Editar Empréstimo</h1>
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
            value={livroId ?? ''}
            onChange={e => setLivroId(Number(e.target.value))}
            style={{ padding: '6px', width: '100%' }}
          >
            <option value="">Selecione um livro</option>
            {livros.map(livro => (
              <option key={livro.id} value={livro.id}>
                {livro.titulo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={saving} style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
