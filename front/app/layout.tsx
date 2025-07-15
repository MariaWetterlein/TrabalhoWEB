import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Biblioteca Full Stack',
  description: 'Aplicação de CRUD com Next.js e Nest.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <nav
          style={{
            padding: '1rem',
            borderBottom: '1px solid #ccc',
            backgroundColor: '#e6f0ff', 
            display: 'flex',
            justifyContent: 'center', 
            gap: '2rem', 
          }}
        >
          <Link href="/" style={{ color: '#111212ff', fontWeight: '600', textDecoration: 'none' }}>
            Início
          </Link>
          <Link href="/autor" style={{ color: 'black', fontWeight: '600', textDecoration: 'none' }}>
            Autores
          </Link>
          <Link href="/livro" style={{ color: 'black', fontWeight: '600', textDecoration: 'none' }}>
            Livros
          </Link>
          <Link href="/emprestimo" style={{ color: 'black', fontWeight: '600', textDecoration: 'none' }}>
            Empréstimos
          </Link>
        </nav>
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
