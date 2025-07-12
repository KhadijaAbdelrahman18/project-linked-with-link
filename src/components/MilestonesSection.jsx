import React, { useRef, useEffect, useState } from 'react';
import { Calendar, FileText, Image, Download, Plus, TrendingUp, Clock, Target } from 'lucide-react';

export default function MilestonesSection() {
  const userRole = "entrepreneur"; // or "investor"

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project XYZ",
      stage: "Prototype",
      startDate: "2025-06-25",
      logs: [
        {
          date: "2025-06-27",
          title: "Purchased Raw Materials",
          description: "Purchased fabrics and related supplies.\nInvoice attached.",
          files: ["invoice.pdf"]
        },
        {
          date: "2025-06-28",
          title: "Shipment Received",
          description: "Shipment arrived and was inspected.",
          files: []
        }
      ]
    },
    {
      id: 2,
      name: "Project ABC",
      stage: "Idea",
      startDate: "2025-06-15",
      logs: []
    }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [newLog, setNewLog] = useState({ title: '', description: '', files: [], stage: '' });

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const [activeLogIdx, setActiveLogIdx] = useState(0);
  const logRefs = useRef([]);

  const handleAddLog = () => {
    if (!newLog.title.trim()) return;
    const updatedProjects = projects.map(p => {
      if (p.id === selectedProjectId) {
        return {
          ...p,
          stage: newLog.stage || p.stage,
          logs: [
            {
              date: new Date().toISOString().split('T')[0],
              title: newLog.title,
              description: newLog.description,
              files: [...newLog.files]
            },
            ...p.logs
          ]
        };
      }
      return p;
    });
    setProjects(updatedProjects);
    setNewLog({ title: '', description: '', files: [], stage: '' });
  };

  const handleFileDownload = (file) => {
    if (typeof file === 'string') {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([file], { type: 'application/octet-stream' }));
      link.download = file;
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };

  const isImageFile = (file) => {
    const name = typeof file === 'string' ? file : file.name;
    return name.match(/\.(jpg|jpeg|png|gif)$/i);
  };

  const getProgress = (logs) => {
    const total = logs.length;
    const completed = logs.filter(log => log.files && log.files.length > 0).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getStageColor = (stage) => {
    const colors = {
      "Idea": "bg-purple-100 text-purple-800 border-purple-200",
      "Prototype": "bg-blue-100 text-blue-800 border-blue-200",
      "Early Stage Startup": "bg-green-100 text-green-800 border-green-200",
      "Growth Stage": "bg-orange-100 text-orange-800 border-orange-200",
      "Established Business": "bg-emerald-100 text-emerald-800 border-emerald-200"
    };
    return colors[stage] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const businessStages = [
    "Idea Stage",
    "MVP/Prototype",
    "Early Stage Startup",
    "Growth Stage",
    "Established Business"
  ];

  useEffect(() => {
    if (!selectedProject?.logs?.length) return;
    logRefs.current = logRefs.current.slice(0, selectedProject.logs.length);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .map(e => Number(e.target.getAttribute('data-idx')));
        if (visible.length > 0) {
          setActiveLogIdx(visible[0]);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    );
    logRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => {
      logRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [selectedProject?.logs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Project Milestones
              </h1>
              <p className="text-sm text-gray-600 mt-1">Track your entrepreneurial journey</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-row-reverse gap-8">
          {/* Sidebar */}
          <aside className="w-80 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-gray-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Projects</h2>
              </div>
              
              <div className="space-y-3">
                {projects.map(project => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`w-full text-right p-4 rounded-xl border transition-all duration-300 group ${
                      selectedProjectId === project.id 
                        ? 'bg-gray-50 border-gray-300 shadow-sm' 
                        : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStageColor(project.stage)}`}>
                        {project.stage}
                      </span>
                      <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {project.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{project.startDate}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Projects</span>
                  <span className="font-bold text-lg text-gray-800">{projects.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Updates</span>
                  <span className="font-bold text-lg text-gray-800">
                    {projects.reduce((acc, p) => acc + p.logs.length, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-bold text-lg text-gray-800">
                    {getProgress(selectedProject?.logs || [])}%
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Project Header */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedProject?.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm px-3 py-1 rounded-full border font-medium ${getStageColor(selectedProject?.stage)}`}>
                      {selectedProject?.stage}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Started {selectedProject?.startDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="lg:w-1/3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-bold text-gray-800">
                      {getProgress(selectedProject?.logs || [])}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gray-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${getProgress(selectedProject?.logs || [])}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Add Update Form */}
            {userRole === 'entrepreneur' && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-4 h-4 text-gray-600" />
                  </div>
                  Add New Update
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Update title..."
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white transition-all"
                    value={newLog.title}
                    onChange={(e) => setNewLog({ ...newLog, title: e.target.value })}
                  />
                  <select
                    value={newLog.stage}
                    onChange={(e) => setNewLog({ ...newLog, stage: e.target.value })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white transition-all"
                  >
                    <option value="">Select business stage</option>
                    {businessStages.map((stage, idx) => (
                      <option key={idx} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
                
                <textarea
                  placeholder="Describe your update in detail..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white transition-all mb-4"
                  value={newLog.description}
                  onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                />
                
                <div className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attach files (optional)
                    </label>
                    <input
                      type="file"
                      multiple
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-white transition-all"
                      onChange={(e) => setNewLog({ ...newLog, files: Array.from(e.target.files || []) })}
                    />
                  </div>
                  <button
                    onClick={handleAddLog}
                    className="bg-gray-800 text-white px-8 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 font-medium flex items-center gap-2 hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Update
                  </button>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="relative pr-8">
              <div 
                className="absolute right-2 top-0 w-1 bg-gray-200 rounded-full"
                style={{ height: selectedProject?.logs?.length ? `calc(100% - 16px)` : 0 }}
              />
              
              <div className="space-y-6">
                {selectedProject?.logs.map((log, idx) => (
                  <div
                    key={idx}
                    data-idx={idx}
                    ref={el => logRefs.current[idx] = el}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative transition-all duration-300 hover:shadow-md"
                  >
                    <div
                      className={`absolute -right-[14px] top-6 w-4 h-4 flex items-center justify-center transition-all duration-300 ${
                        activeLogIdx === idx ? 'scale-125' : 'scale-100'
                      }`}
                    >
                      <div 
                        className={`w-2 h-2 rounded-full border-2 border-white shadow-md transition-all duration-300 ${
                          activeLogIdx === idx 
                            ? 'bg-gray-600' 
                            : 'bg-gray-300'
                        }`}
                      />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500 font-medium">{log.date}</span>
                    </div>
                    
                    <h4 className="font-bold text-xl text-gray-900 mb-3">{log.title}</h4>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">{log.description}</p>
                    
                    {log.files?.length > 0 && (
                      <div className="border-t border-gray-100 pt-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Attachments ({log.files.length})
                        </h5>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {log.files.map((file, fidx) => {
                            const name = typeof file === 'string' ? file : file.name;
                            return (
                              <div key={fidx} className="group relative bg-gray-50 border border-gray-200 rounded-xl p-3 hover:shadow-sm transition-all duration-200">
                                {isImageFile(file) ? (
                                  <div className="relative">
                                    <Image className="w-5 h-5 text-gray-500 mb-2" />
                                    <img
                                      src={typeof file === 'string' ? `/path/to/files/${file}` : URL.createObjectURL(file)}
                                      alt={name}
                                      className="w-full h-20 object-cover rounded-lg mb-2"
                                    />
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 mb-2">
                                    <FileText className="w-5 h-5 text-gray-500" />
                                    <span className="text-xs text-gray-600 truncate font-medium">{name}</span>
                                  </div>
                                )}
                                
                                {userRole === 'investor' && (
                                  <button
                                    className="w-full mt-2 flex items-center justify-center gap-1 text-xs text-gray-700 hover:text-gray-900 font-medium py-1 px-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    onClick={() => handleFileDownload(file)}
                                  >
                                    <Download className="w-3 h-3" />
                                    Download
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {selectedProject?.logs.length === 0 && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No updates yet</h3>
                    <p className="text-gray-500">Start tracking your project progress by adding your first update above.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}