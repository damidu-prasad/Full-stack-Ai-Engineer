"use client";

import { useEffect, useState, useMemo } from 'react';
import { Download, Loader2, Search, Eye, LogOut, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

export default function AdminPanel() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Custom Questions State
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedApp, setSelectedApp] = useState<any>(null); // For Modal

  const router = useRouter();

  useEffect(() => {
    fetchApplications();
    fetchQuestions();
  }, []);

  async function fetchApplications() {
    try {
      const res = await fetch('/api/applications');
      const json = await res.json();
      if (json.success) {
        setApplications(json.data);
      } else {
        setError(json.error || 'Failed to fetch');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }

  async function fetchQuestions() {
    try {
      const res = await fetch('/api/questions');
      const json = await res.json();
      if (json.success) setQuestions(json.data || []);
    } catch (e) {
      console.error('Failed to load questions');
    }
  }

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newQuestion })
      });
      setNewQuestion('');
      fetchQuestions(); // Reload questions
    } catch (e) {
      console.error('Failed to add question');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || app.email?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter || (statusFilter === 'pending' && !app.status);
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  const exportToExcel = () => {
    if (filteredApps.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(filteredApps);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "internship_applications.xlsx");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin w-10 h-10 text-blue-600" /></div>;
  if (error) return <div className="text-red-500 p-8 text-center mt-10 bg-red-50 rounded-lg max-w-2xl mx-auto">Error: {error}</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header & Controls */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and export internship applications ({filteredApps.length} found)</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button onClick={exportToExcel} className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition shadow-sm font-medium">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-red-600 px-3 py-2 transition">
              <LogOut className="w-5 h-5 mr-1" /> Logout
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Table Column */}
          <div className="lg:col-span-3 bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 bg-gray-50/50">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search name or email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/50">
                  <tr>
                    {['Name', 'Email', 'Status', 'Tech Skills', 'Actions'].map(header => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApps.map((app) => (
                    <tr key={app._id} className="hover:bg-blue-50/30 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">{app.fullName}</div>
                        <div className="text-xs text-gray-500">{app.no || new Date().toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{app.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-700">{app.currentStatus}</div>
                        <div className="text-xs text-gray-500">{app.cityDistrict}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          {app.hasProgrammingKnowledge === 'YES' && <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-blue-100 text-blue-800">Code</span>}
                          {app.hasAIMLKnowledge === 'YES' && <span className="px-2 py-1 text-[10px] font-bold rounded-md bg-purple-100 text-purple-800">AI/ML</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => setSelectedApp(app)} className="flex items-center text-blue-600 hover:text-blue-900 font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">
                          <Eye className="w-4 h-4 mr-1" /> View Data
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Manage Questions Sidebar */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-5 flex flex-col">
            <h3 className="font-bold text-gray-900 border-b pb-3 mb-4">Form Questions (Col 17+)</h3>
            <p className="text-xs text-gray-500 mb-4">Add dynamic questions to the application form. Their answers will be saved in the Google Sheet from column Q (17) onwards.</p>
            
            <div className="flex space-x-2 mb-4">
              <input 
                type="text" 
                placeholder="New question..." 
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
              />
              <button onClick={handleAddQuestion} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"><Plus className="w-5 h-5"/></button>
            </div>
            
            <ul className="space-y-2 overflow-y-auto max-h-64 pr-2">
              {questions.map((q, idx) => (
                <li key={idx} className="bg-gray-50 border rounded-lg p-3 text-sm text-gray-700">
                  {q[0]} {/* Assuming question is in the first column of Questions tab */}
                </li>
              ))}
              {questions.length === 0 && <li className="text-xs text-gray-400 text-center py-4">No custom questions added yet.</li>}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal for View Details */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Application Details</h2>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-500 block text-xs">Date/No</span> <span className="font-semibold">{selectedApp.no}</span></div>
                <div><span className="text-gray-500 block text-xs">Full Name</span> <span className="font-semibold">{selectedApp.fullName}</span></div>
                <div><span className="text-gray-500 block text-xs">Email</span> <span className="font-semibold">{selectedApp.email}</span></div>
                <div><span className="text-gray-500 block text-xs">Contact</span> <span className="font-semibold">{selectedApp.contactNumber}</span></div>
                <div><span className="text-gray-500 block text-xs">NIC</span> <span className="font-semibold">{selectedApp.nic}</span></div>
                <div><span className="text-gray-500 block text-xs">District</span> <span className="font-semibold">{selectedApp.cityDistrict}</span></div>
                <div className="col-span-2 border-t pt-2 mt-2"><span className="text-gray-500 block text-xs">Status / Education Background</span> <span className="font-semibold text-blue-700">{selectedApp.currentStatus}</span></div>
                <div className="col-span-2"><span className="text-gray-500 block text-xs">A/L Details</span> <span>{selectedApp.afterAL || '-'}</span></div>
                <div className="col-span-2"><span className="text-gray-500 block text-xs">Undergraduate Details</span> <span>{selectedApp.undergraduate || '-'}</span></div>
                <div className="col-span-2"><span className="text-gray-500 block text-xs">Degree Details</span> <span>{selectedApp.degree || '-'}</span></div>
                <div className="col-span-2"><span className="text-gray-500 block text-xs">Java Institute</span> <span>{selectedApp.javaInstitute || '-'}</span></div>
                <div className="col-span-2"><span className="text-gray-500 block text-xs">Career Change</span> <span>{selectedApp.careerChange || '-'}</span></div>
                
                <div className="col-span-2 border-t pt-2 mt-2"><span className="text-gray-500 block text-xs">Tech Skills</span></div>
                <div><span className="text-gray-500 block text-xs">Programming?</span> <span>{selectedApp.hasProgrammingKnowledge}</span></div>
                <div className="col-span-2"><span className="text-gray-500 block text-xs">Frameworks</span> <span>{selectedApp.webDevFrameworks || '-'}</span></div>
                <div><span className="text-gray-500 block text-xs">AI/ML?</span> <span>{selectedApp.hasAIMLKnowledge}</span></div>
              </div>
              
              <div className="border-t pt-6 mt-6 flex justify-center">
                <a 
                  href={selectedApp.cvResumeLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  View Candidate CV (Drive Link)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
