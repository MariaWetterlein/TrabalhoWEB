export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        color: '#003366',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        📚 Bem-vindo à Biblioteca Full Stack
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Use o menu acima para ter um controle básico entre Autores, Livros e Empréstimos.
      </p>
      <img
        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
        alt="Imagem de livros"
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          maxHeight: '400px',
        }}
      />
    </div>
  );
}
