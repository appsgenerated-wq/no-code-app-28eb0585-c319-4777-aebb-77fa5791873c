import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('contributor@manifest.build');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-transparent to-purple-900 opacity-30"></div>
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
          Welcome to Newtonium
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          An interactive encyclopedia to explore and contribute to the discoveries and principles of Sir Isaac Newton.
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 md:p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Contributor Access</h2>
          <form onSubmit={handleDemoLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 text-left">Email</label>
              <input 
                id="email"
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="contributor@manifest.build"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 text-left">Password</label>
              <input 
                id="password"
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="password"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Login as Contributor
            </button>
          </form>
        </div>

        <div className="mt-8">
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            Access Admin Panel
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
