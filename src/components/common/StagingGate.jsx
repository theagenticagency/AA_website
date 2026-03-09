import React, { useState, useEffect } from 'react';

const STAGING_KEY = 'aa_staging_access';

const StagingGate = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Check if we're on staging
  const isStaging = typeof window !== 'undefined' &&
    window.location.hostname.includes('staging');

  // Get password from env (set in Vercel for staging environment only)
  const correctPassword = import.meta.env.VITE_STAGING_PASSWORD;

  useEffect(() => {
    // Not staging = always authorized
    if (!isStaging) {
      setAuthorized(true);
      return;
    }

    // No password configured = open staging (for initial setup)
    if (!correctPassword) {
      setAuthorized(true);
      return;
    }

    // Check localStorage for existing auth
    const stored = localStorage.getItem(STAGING_KEY);
    if (stored === correctPassword) {
      setAuthorized(true);
    }
  }, [isStaging, correctPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      localStorage.setItem(STAGING_KEY, password);
      setAuthorized(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Authorized - render children
  if (authorized) {
    return children;
  }

  // Gate UI
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-[#E6E6E1] mb-2">
            Staging Environment
          </h1>
          <p className="text-[#E6E6E1]/60 text-sm">
            This is a pre-production preview. Enter password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-5 py-4 rounded-xl bg-white/10 border-2 border-white/30 text-[#E6E6E1] placeholder:text-[#E6E6E1]/50 focus:border-[#E6E6E1] focus:bg-white/15 outline-none transition-all font-medium"
          />

          {error && (
            <p className="text-red-400 text-sm">Incorrect password</p>
          )}

          <button
            type="submit"
            className="w-full px-5 py-4 rounded-xl bg-[#E6E6E1] text-black font-bold uppercase tracking-tight hover:bg-white transition-colors"
          >
            Enter Staging
          </button>
        </form>

        <p className="text-center text-[#E6E6E1]/40 text-xs mt-8 font-mono uppercase tracking-wider">
          Agentic Agency · Internal Preview
        </p>
      </div>
    </div>
  );
};

export default StagingGate;
