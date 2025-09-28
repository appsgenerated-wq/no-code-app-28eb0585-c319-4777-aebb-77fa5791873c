import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants.js';
import './index.css';

const testBackendConnection = async () => {
  try {
    const response = await fetch('/api/health');
    if (response.ok) {
      console.log('✅ [HEALTH] Backend connection successful');
      return { success: true };
    } else {
      console.error('❌ [HEALTH] Backend connection failed:', response.statusText);
      return { success: false, error: `Server responded with status: ${response.status}` };
    }
  } catch (err) {
    console.error('❌ [HEALTH] Network error during backend connection test:', err);
    return { success: false, error: err.message };
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [discoveries, setDiscoveries] = useState([]);
  const [principles, setPrinciples] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Initializing application...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
          console.log('✅ [AUTH] User is logged in:', currentUser.email);
        } catch (err) {
          setUser(null);
          setCurrentScreen('landing');
          console.log('ℹ️ [AUTH] No active user session.');
        }
      } else {
        console.error('❌ [APP] Cannot proceed with app initialization due to backend connection failure.');
      }
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
      setCurrentScreen('dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
    setDiscoveries([]);
    setPrinciples([]);
  };

  const loadData = async () => {
    if (!user) return;
    try {
      const discoveriesResponse = await manifest.from('Discovery').find({ include: ['owner'], sort: { year: 'asc' } });
      setDiscoveries(discoveriesResponse.data);
      const principlesResponse = await manifest.from('Principle').find({ include: ['owner'], sort: { title: 'asc' } });
      setPrinciples(principlesResponse.data);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  const createDiscovery = async (discoveryData) => {
    try {
      const newDiscovery = await manifest.from('Discovery').create(discoveryData);
      setDiscoveries([newDiscovery, ...discoveries]);
    } catch (err) {
      console.error('Failed to create discovery:', err);
    }
  };

  const createPrinciple = async (principleData) => {
    try {
      const newPrinciple = await manifest.from('Principle').create(principleData);
      setPrinciples([newPrinciple, ...principles]);
    } catch (err) {
      console.error('Failed to create principle:', err);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${backendConnected ? 'text-gray-700' : 'text-red-700'}`}>
          {backendConnected ? 'Backend Connected' : 'Backend Disconnected'}
        </span>
      </div>
      {currentScreen === 'landing' || !user ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <DashboardPage
          user={user}
          discoveries={discoveries}
          principles={principles}
          onLogout={handleLogout}
          onLoadData={loadData}
          onCreateDiscovery={createDiscovery}
          onCreatePrinciple={createPrinciple}
        />
      )}
    </div>
  );
}

export default App;
