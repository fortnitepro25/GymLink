export default function LandingPage({ setPage }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '40px 20px'
    }}>
      <h1 style={{ fontSize: '4.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
        Gym<span style={{ color: '#ff4d4d' }}>Link</span>
      </h1>
      
      <p style={{ fontSize: '1.8rem', color: '#bbbbbb', marginBottom: '80px' }}>
        Track your gains.<br />Connect with the community.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', width: '100%', maxWidth: '420px' }}>
        <button
          onClick={() => setPage('gym')}
          style={{
            padding: '30px',
            fontSize: '1.8rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ff4d4d, #ff7854)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          💪 Gym Tracking
        </button>

        <button
          onClick={() => setPage('chat')}
          style={{
            padding: '30px',
            fontSize: '1.8rem',
            fontWeight: '600',
            border: 'none',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #4d79ff, #00c4ff)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          💬 Community Chat
        </button>
      </div>
    </div>
  );
}