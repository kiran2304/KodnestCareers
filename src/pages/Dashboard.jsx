import React, { useState, useEffect } from 'react';
import { FileText, Calendar, CheckCircle, Clock, X, ChevronRight, Briefcase, MapPin, DollarSign } from 'lucide-react';

const APPLICATIONS = [
    { id: 1, company: 'TechCorp', role: 'Senior Frontend Engineer', status: 'Interviewing', date: '2023-10-25', location: 'Bangalore, KA', salary: '₹25L - ₹35L' },
    { id: 2, company: 'Creative Studio', role: 'Product Designer', status: 'Applied', date: '2023-10-28', location: 'Remote', salary: '₹15L - ₹22L' },
    { id: 3, company: 'DataSystems', role: 'Backend Developer', status: 'Rejected', date: '2023-10-20', location: 'Mumbai, MH', salary: '₹18L - ₹24L' },
];

const ApplicationDetailsModal = ({ app, onClose, onCancel }) => {
    if (!app) return null;

    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'rounds'
    const [rounds, setRounds] = useState([]);
    const [newRound, setNewRound] = useState({ type: 'Technical', date: '', notes: '' });

    useEffect(() => {
        // Load rounds from local storage
        const storedRounds = JSON.parse(localStorage.getItem(`rounds_${app.id}`) || '[]');
        if (storedRounds.length === 0) {
            // Default rounds for demo
            setRounds([
                { id: 1, type: 'HR Screening', date: '2023-10-26', status: 'Completed', notes: 'Discussed salary expectations.' },
                { id: 2, type: 'Technical', date: '2023-10-30', status: 'Pending', notes: 'Prepare for React hooks and system design.' }
            ]);
        } else {
            setRounds(storedRounds);
        }
    }, [app.id]);

    const saveRounds = (updatedRounds) => {
        setRounds(updatedRounds);
        localStorage.setItem(`rounds_${app.id}`, JSON.stringify(updatedRounds));
    };

    const addRound = () => {
        if (!newRound.type) return;
        const round = {
            id: Date.now(),
            ...newRound,
            status: 'Pending'
        };
        saveRounds([...rounds, round]);
        setNewRound({ type: 'Technical', date: '', notes: '' });
    };

    const toggleRoundStatus = (id) => {
        const updated = rounds.map(r => r.id === id ? { ...r, status: r.status === 'Completed' ? 'Pending' : 'Completed' } : r);
        saveRounds(updated);
    };

    const steps = ['Applied', 'Review', 'Interviewing', 'Offer', 'Hired'];
    const currentStepIndex = steps.indexOf(app.status) !== -1 ? steps.indexOf(app.status) :
        app.status === 'Rejected' ? 1 : 0; // Fallback logic

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                background: 'white', padding: '0', borderRadius: 'var(--radius-lg)', width: '600px', maxWidth: '90%',
                position: 'relative', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ padding: '2rem', paddingBottom: '0', position: 'relative' }}>
                    <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} color="var(--text-secondary)" />
                    </button>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ width: '60px', height: '60px', background: 'var(--background)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                            {app.company[0]}
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{app.role}</h2>
                            <h3 style={{ margin: '0.25rem 0', color: 'var(--accent)', fontSize: '1.1rem' }}>{app.company}</h3>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                        <button
                            onClick={() => setActiveTab('overview')}
                            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: activeTab === 'overview' ? '2px solid var(--primary)' : 'none', fontWeight: 600, color: activeTab === 'overview' ? 'var(--primary)' : 'var(--text-secondary)', cursor: 'pointer' }}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('rounds')}
                            style={{ flex: 1, padding: '1rem', background: 'none', border: 'none', borderBottom: activeTab === 'rounds' ? '2px solid var(--primary)' : 'none', fontWeight: 600, color: activeTab === 'rounds' ? 'var(--primary)' : 'var(--text-secondary)', cursor: 'pointer' }}
                        >
                            Interview Rounds
                        </button>
                    </div>
                </div>

                <div style={{ padding: '2rem', overflowY: 'auto' }}>
                    {activeTab === 'overview' ? (
                        <>
                            {/* Status Timeline */}
                            <div style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Application Status</h4>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                                    {/* Progress Bar Background */}
                                    <div style={{ position: 'absolute', left: 0, right: 0, top: '12px', height: '2px', background: 'var(--border)', zIndex: 0 }} />

                                    {steps.map((step, index) => {
                                        const isCompleted = index <= currentStepIndex && app.status !== 'Rejected';
                                        const isCurrent = index === currentStepIndex;
                                        const isRejected = app.status === 'Rejected' && index === currentStepIndex;

                                        let circleColor = isCompleted ? 'var(--success)' : 'var(--border)';
                                        if (isCurrent) circleColor = 'var(--accent)';
                                        if (isRejected) circleColor = 'var(--error)';

                                        return (
                                            <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1, background: 'white', padding: '0 0.5rem' }}>
                                                <div style={{
                                                    width: '24px', height: '24px', borderRadius: '50%',
                                                    background: circleColor,
                                                    border: `2px solid ${circleColor === 'var(--border)' ? 'var(--text-secondary)' : circleColor}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: 'white', fontSize: '12px', fontWeight: 'bold'
                                                }}>
                                                    {isCompleted ? <CheckCircle size={14} /> : (index + 1)}
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: isCurrent || isCompleted ? 'var(--text-main)' : 'var(--text-secondary)', fontWeight: isCurrent ? 600 : 400 }}>
                                                    {step}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                {app.status === 'Rejected' && (
                                    <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fee2e2', color: '#dc2626', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
                                        Update: Unfortunately, the company has decided to move forward with other candidates.
                                    </div>
                                )}
                            </div>

                            {/* Job Details */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div>
                                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Location</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <MapPin size={18} color="var(--text-secondary)" />
                                        <span>{app.location || 'Remote'}</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Salary Range</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <DollarSign size={18} color="var(--text-secondary)" />
                                        <span>{app.salary || 'Not disclosed'}</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Job Type</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Briefcase size={18} color="var(--text-secondary)" />
                                        <span>Full-time</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Date Applied</h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={18} color="var(--text-secondary)" />
                                        <span>{app.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Cancel Button */}
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to withdraw your application? This action cannot be undone.')) {
                                        onCancel(app);
                                    }
                                }}
                                className="btn btn-outline"
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    color: 'var(--error)',
                                    borderColor: 'var(--error)'
                                }}
                            >
                                Withdraw Application
                            </button>
                        </>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                {rounds.map((round) => (
                                    <div key={round.id} style={{
                                        padding: '1rem',
                                        border: '1px solid var(--border)',
                                        borderRadius: 'var(--radius-sm)',
                                        borderLeft: `4px solid ${round.status === 'Completed' ? 'var(--success)' : 'var(--accent)'}`,
                                        background: round.status === 'Completed' ? '#f0fdf4' : 'white'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 600 }}>{round.type}</span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{round.date || 'Date N/A'}</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{round.notes}</p>
                                        <button
                                            onClick={() => toggleRoundStatus(round.id)}
                                            style={{
                                                fontSize: '0.8rem',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                border: 'none',
                                                background: round.status === 'Completed' ? 'var(--success)' : '#e2e8f0',
                                                color: round.status === 'Completed' ? 'white' : 'var(--text-main)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {round.status === 'Completed' ? 'Completed' : 'Mark as Completed'}
                                        </button>
                                    </div>
                                ))}
                                {rounds.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No interview rounds scheduled yet.</p>}
                            </div>

                            <div className="card" style={{ background: '#f8fafc' }}>
                                <h4 style={{ marginBottom: '1rem' }}>Add Interview Round</h4>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <select
                                        value={newRound.type}
                                        onChange={(e) => setNewRound({ ...newRound, type: e.target.value })}
                                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', flex: 1 }}
                                    >
                                        <option>Technical</option>
                                        <option>HR Screening</option>
                                        <option>Managerial</option>
                                        <option>System Design</option>
                                        <option>Take-home Task</option>
                                    </select>
                                    <input
                                        type="date"
                                        value={newRound.date}
                                        onChange={(e) => setNewRound({ ...newRound, date: e.target.value })}
                                        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)' }}
                                    />
                                </div>
                                <input
                                    placeholder="Notes (e.g. Prepare for system design)"
                                    value={newRound.notes}
                                    onChange={(e) => setNewRound({ ...newRound, notes: e.target.value })}
                                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border)', marginBottom: '1rem' }}
                                />
                                <button onClick={addRound} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Add Round</button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

const Dashboard = () => {
    const [applications, setApplications] = useState(APPLICATIONS);
    const [filterStatus, setFilterStatus] = useState(null); // 'Interviewing', 'Offer', 'Applied'
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        const storedApps = JSON.parse(localStorage.getItem('my_applications') || '[]');
        if (storedApps.length > 0) {
            // Merge stored apps (which might lack mock details like location/salary) with mock data structure
            const enhancedStoredApps = storedApps.map(app => ({
                ...app,
                location: 'Remote', // Default for user added
                salary: '₹10L - ₹15L', // Default for user added
                status: app.status || 'Applied'
            }));
            setApplications([...enhancedStoredApps, ...APPLICATIONS]);
        }
    }, []);

    const stats = {
        total: applications.length,
        interviews: applications.filter(a => a.status === 'Interviewing').length,
        offers: applications.filter(a => a.status === 'Offer').length,
        pending: applications.filter(a => a.status === 'Applied').length
    };

    const filteredApplications = filterStatus
        ? applications.filter(a => a.status === filterStatus)
        : applications;

    const handleFilter = (status) => {
        if (filterStatus === status) {
            setFilterStatus(null); // Toggle off
        } else {
            setFilterStatus(status);
        }
    };

    const handleCancelApplication = (appToCancel) => {
        // Remove from state
        const updatedApplications = applications.filter(app => app.id !== appToCancel.id);
        setApplications(updatedApplications);

        // Remove from local storage
        if (appToCancel.jobId) {
            localStorage.removeItem(`applied_${appToCancel.jobId}`);
        }

        // Remove from my_applications list in local storage
        const storedApps = JSON.parse(localStorage.getItem('my_applications') || '[]');
        const updatedStoredApps = storedApps.filter(app => {
            // Match by ID if available, otherwise fallback to company+role match for legacy
            if (appToCancel.id && app.id === appToCancel.id) return false;
            if (app.company === appToCancel.company && app.role === appToCancel.role) return false;
            return true;
        });
        localStorage.setItem('my_applications', JSON.stringify(updatedStoredApps));
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem' }}>My Dashboard</h1>

            {/* Stats Grid - Clickable */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {[
                    { key: null, label: 'Total Applications', value: stats.total, icon: FileText, color: 'blue' },
                    { key: 'Interviewing', label: 'Interviews', value: stats.interviews, icon: Calendar, color: 'purple' },
                    { key: 'Offer', label: 'Offers', value: stats.offers, icon: CheckCircle, color: 'green' },
                    { key: 'Applied', label: 'Pending', value: stats.pending, icon: Clock, color: 'orange' },
                ].map((stat, i) => {
                    const isActive = filterStatus === stat.key;
                    // Logic for Total: if filter is null, Total is effectively active view, but we don't 'select' it like a filter button
                    // actually let's make buttons behave like tabs
                    return (
                        <div
                            key={i}
                            className="card"
                            onClick={() => handleFilter(stat.key)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                cursor: 'pointer',
                                border: isActive ? `2px solid ${stat.color === 'blue' ? '#0284c7' : stat.color === 'purple' ? '#9333ea' : stat.color === 'green' ? '#16a34a' : '#ea580c'}` : '1px solid var(--border)',
                                transform: isActive ? 'translateY(-2px)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                padding: '1rem',
                                background: stat.color === 'blue' ? '#e0f2fe' : stat.color === 'purple' ? '#f3e8ff' : stat.color === 'green' ? '#dcfce7' : '#ffedd5',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <stat.icon size={24} color={stat.color === 'blue' ? '#0284c7' : stat.color === 'purple' ? '#9333ea' : stat.color === 'green' ? '#16a34a' : '#ea580c'} />
                            </div>
                            <div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stat.value}</div>
                                <div style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Applications */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}> {/* Reset padding for full-width table */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>
                        {filterStatus ? `${filterStatus} Applications` : 'All Applications'}
                    </h2>
                    {filterStatus && (
                        <button onClick={() => setFilterStatus(null)} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
                            Clear Filter
                        </button>
                    )}
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', background: 'var(--background)' }}>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Company</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Role</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Date applied</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.length > 0 ? filteredApplications.map(app => (
                            <tr
                                key={app.id}
                                onClick={() => setSelectedApp(app)}
                                style={{
                                    borderBottom: '1px solid var(--border)',
                                    cursor: 'pointer',
                                    transition: 'background 0.1s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--background)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '32px', height: '32px', background: 'var(--background)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                                            {app.company[0]}
                                        </div>
                                        {app.company}
                                    </div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>{app.role}</td>
                                <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{app.date}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.8rem',
                                        background: app.status === 'Interviewing' ? '#f3e8ff' : app.status === 'Applied' ? '#e0f2fe' : app.status === 'Offer' ? '#dcfce7' : '#fee2e2',
                                        color: app.status === 'Interviewing' ? '#9333ea' : app.status === 'Applied' ? '#0284c7' : app.status === 'Offer' ? '#16a34a' : '#dc2626',
                                        fontWeight: 600,
                                        display: 'inline-block',
                                        minWidth: '80px',
                                        textAlign: 'center'
                                    }}>
                                        {app.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                    <ChevronRight size={20} color="var(--text-secondary)" />
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    No applications found in this category.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            {selectedApp && (
                <ApplicationDetailsModal
                    app={selectedApp}
                    onClose={() => setSelectedApp(null)}
                    onCancel={(app) => {
                        handleCancelApplication(app);
                        setSelectedApp(null);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
