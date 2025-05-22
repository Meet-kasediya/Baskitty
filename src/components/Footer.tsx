export default function Footer() {
  return (

<footer className="text-center py-3 mt-0" style={{ backgroundColor: '#fff1f5', borderTop: '2px dashed #ffb3c6' }}>
  <p className="mb-1" style={{ fontSize: '1rem' }}>
    🐾 Made with purrfection by  
    <a
      href="https://www.linkedin.com/in/meet-kasediya/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: '#ff6699', textDecoration: 'none', marginLeft: '5px', fontWeight: '600' }}
    >
      Meet Kasediya
    </a>
  </p>
  <p className="mb-0" style={{ fontSize: '0.9rem', color: '#555' }}>
    &copy; {new Date().getFullYear()} <strong>Baskitty</strong> — All rights reserved
  </p>
</footer>

  );
}
