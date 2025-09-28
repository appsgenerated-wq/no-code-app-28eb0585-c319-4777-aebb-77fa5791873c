import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, discoveries, principles, onLogout, onLoadData, onCreateDiscovery, onCreatePrinciple }) => {
  const [newDiscovery, setNewDiscovery] = useState({ title: '', description: '', year: 1687, category: 'Physics' });
  const [newPrinciple, setNewPrinciple] = useState({ title: '', statement: '', explanation: '' });
  const [activeTab, setActiveTab] = useState('discoveries');

  useEffect(() => {
    onLoadData();
  }, []);

  const handleCreateDiscovery = (e) => {
    e.preventDefault();
    onCreateDiscovery({ ...newDiscovery, year: Number(newDiscovery.year) });
    setNewDiscovery({ title: '', description: '', year: 1687, category: 'Physics' });
  };

  const handleCreatePrinciple = (e) => {
    e.preventDefault();
    onCreatePrinciple(newPrinciple);
    setNewPrinciple({ title: '', statement: '', explanation: '' });
  };

  const renderCreateForm = () => {
    if (activeTab === 'discoveries') {
      return (
        <form onSubmit={handleCreateDiscovery} className="space-y-4">
          <input type="text" placeholder="Discovery Title" value={newDiscovery.title} onChange={(e) => setNewDiscovery({ ...newDiscovery, title: e.target.value })} className="w-full p-2 border rounded-md bg-gray-50" required />
          <textarea placeholder="Description" value={newDiscovery.description} onChange={(e) => setNewDiscovery({ ...newDiscovery, description: e.target.value })} className="w-full p-2 border rounded-md bg-gray-50" rows="3" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Year" value={newDiscovery.year} onChange={(e) => setNewDiscovery({ ...newDiscovery, year: e.target.value })} className="w-full p-2 border rounded-md bg-gray-50" />
            <select value={newDiscovery.category} onChange={(e) => setNewDiscovery({ ...newDiscovery, category: e.target.value })} className="w-full p-2 border rounded-md bg-gray-50">
              <option>Physics</option><option>Mathematics</option><option>Optics</option><option>Alchemy</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add Discovery</button>
        </form>
      );
    }
    return (
      <form onSubmit={handleCreatePrinciple} className="space-y-4">
        <input type="text" placeholder="Principle Title" value={newPrinciple.title} onChange={(e) => setNewPrinciple({ ...newPrinciple, title: e.target.value })} className="w-full p-2 border rounded-md bg-gray-50" required />
        <textarea placeholder="Statement" value={newPrinciple.statement} onChange={(e) => setNewPrinciple({ ...newPrinciple, statement: e.target.value })} className="w-full p-2 border rounded-md bg-gray-50" rows="2" />
        <textarea placeholder="Explanation" value={newPrinciple.explanation} onChange={(e) => setNewPrinciple({ ...newPrinciple, explanation: e.target.value })} className="w-full p-2 border rounded-md bg-gray-50" rows="3" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Add Principle</button>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Newtonium Dashboard</h1>
            <p className="text-gray-600">Welcome, {user.name}! ({user.role})</p>
          </div>
          <div className="space-x-4">
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">Admin Panel</a>
            <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition">Logout</button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
              {renderCreateForm()}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="border-b border-gray-200 mb-4">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button onClick={() => setActiveTab('discoveries')} className={`${activeTab === 'discoveries' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Discoveries ({discoveries.length})</button>
                  <button onClick={() => setActiveTab('principles')} className={`${activeTab === 'principles' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Principles ({principles.length})</button>
                </nav>
              </div>
              <div className="space-y-4">
                {activeTab === 'discoveries' && discoveries.map(item => (
                  <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="font-semibold text-lg text-gray-900">{item.title} <span className="text-sm font-normal text-gray-500">({item.year})</span></h3>
                    <div className="text-gray-600 text-sm prose max-w-none" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                    <p className="text-xs text-gray-500 mt-2">Category: {item.category} | By: {item.owner?.name || 'N/A'}</p>
                  </div>
                ))}
                {activeTab === 'principles' && principles.map(item => (
                  <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                    <p className="text-gray-700 italic my-2 p-2 border-l-4 border-blue-200 bg-blue-50">{item.statement}</p>
                    <div className="text-gray-600 text-sm prose max-w-none" dangerouslySetInnerHTML={{ __html: item.explanation }}></div>
                     <p className="text-xs text-gray-500 mt-2">By: {item.owner?.name || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
