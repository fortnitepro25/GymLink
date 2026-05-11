import React, { useState } from 'react';
import './login.css';   // Change if you moved the CSS

const Login = ({ setPage, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userData = {
        email: email || "user@example.com",
        name: email ? email.split('@')[0] : "Gym Bro"
      };

      alert("✅ Login successful!");
      onLoginSuccess(userData);
    } catch (err) {
      setError('Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      const userData = {
        email: "gymbro@gmail.com",
        name: "Gym Bro"
      };
      alert("✅ Google Sign-In successful!");
      onLoginSuccess(userData);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>GymLink</h1>
          <p>Track • Progress • Connect</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="divider"><span>OR</span></div>

        <button 
          onClick={handleGoogleSignIn}
          className="google-btn"
          disabled={loading}
        >
          Continue with Google
        </button>

        <div className="login-footer">
          <p>
            Don't have an account? <span style={{color: '#22c55e', cursor: 'pointer'}} onClick={() => setPage('landing')}>Sign up</span>
          </p>
          <span style={{color: '#22c55e', cursor: 'pointer'}} onClick={() => setPage("landing")}>
            ← Back to Home
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;