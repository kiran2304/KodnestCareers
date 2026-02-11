import React, { useState } from 'react';
import { Settings, Globe, Database, Bell, Shield, Play, RefreshCw, CheckCircle } from 'lucide-react';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('Data Sources');
    const [scrapers, setScrapers] = useState({
        linkedin: true,
        indeed: false,
        glassdoor: true,
        monster: false
    });

    const [isScraping, setIsScraping] = useState(false);
    const [lastScrape, setLastScrape] = useState('2 hours ago');
    const [scrapeStatus, setScrapeStatus] = useState('Idle'); // Idle, Running, Success

    const handleScraperToggle = (key) => {
        setScrapers(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const runScraper = () => {
        setIsScraping(true);
        setScrapeStatus('Initializing...');

        setTimeout(() => setScrapeStatus('Connecting to sources...'), 800);
        setTimeout(() => setScrapeStatus('Fetching jobs...'), 2000);
        setTimeout(() => setScrapeStatus('Processing data...'), 3500);
        setTimeout(() => {
            setIsScraping(false);
            setLastScrape('Just now');
            setScrapeStatus('Success');
        }, 5000);
    };

    return (
        <div className="container" style={{ padding: '2rem 0' }}>
            <h1 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Settings /> Settings & Integrations
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem' }}>

                {/* Sidebar Nav */}
                <div className="card" style={{ height: 'fit-content', padding: 0, overflow: 'hidden' }}>
                    {['General', 'Data Sources', 'Notifications', 'Privacy'].map((item) => (
                        <div
                            key={item}
                            onClick={() => setActiveTab(item)}
                            style={{
                                padding: '1rem',
                                borderBottom: '1px solid var(--border)',
                                cursor: 'pointer',
                                background: activeTab === item ? '#f0fdf4' : 'transparent',
                                fontWeight: activeTab === item ? 600 : 400,
                                color: activeTab === item ? 'var(--primary)' : 'inherit',
                                borderLeft: activeTab === item ? '4px solid var(--primary)' : '4px solid transparent',
                                transition: 'all 0.2s'
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {activeTab === 'General' && (
                        <div className="card">
                            <h3 style={{ marginBottom: '1.5rem' }}>General Account Settings</h3>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Display Name</label>
                                <input defaultValue="Alex Johnson" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                                <input defaultValue="alex@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border)' }} />
                            </div>
                            <button className="btn btn-primary">Save Changes</button>
                        </div>
                    )}

                    {activeTab === 'Data Sources' && (
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                                <div>
                                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                        <Database size={20} /> Scraping Engine
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                                        Manage external job sources and data ingestion frequency.
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Last Run</div>
                                    <div style={{ fontWeight: 600 }}>{lastScrape}</div>
                                </div>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span style={{ fontWeight: 600 }}>Manual Trigger</span>
                                    {scrapeStatus === 'Success' && <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={16} /> Data Updated</span>}
                                </div>

                                <button
                                    onClick={runScraper}
                                    disabled={isScraping}
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', height: '50px', fontSize: '1rem' }}
                                >
                                    {isScraping ? (
                                        <>
                                            <RefreshCw className="spin" size={20} /> {scrapeStatus}
                                        </>
                                    ) : (
                                        <>
                                            <Play size={20} /> Run Scraper Now
                                        </>
                                    )}
                                </button>
                            </div>

                            <h4 style={{ marginBottom: '1rem' }}>Active Sources</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                {Object.entries(scrapers).map(([key, isActive]) => (
                                    <div
                                        key={key}
                                        onClick={() => handleScraperToggle(key)}
                                        style={{
                                            padding: '1rem',
                                            border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                                            borderRadius: 'var(--radius-sm)',
                                            background: isActive ? '#f0fdf4' : 'white',
                                            cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'capitalize' }}>
                                            <Globe size={16} color={isActive ? 'var(--primary)' : 'var(--text-secondary)'} />
                                            {key}
                                        </div>
                                        <div style={{
                                            width: '40px', height: '22px',
                                            background: isActive ? 'var(--primary)' : '#cbd5e1',
                                            borderRadius: '11px',
                                            position: 'relative',
                                            transition: 'background 0.2s'
                                        }}>
                                            <div style={{
                                                width: '18px', height: '18px',
                                                background: 'white',
                                                borderRadius: '50%',
                                                position: 'absolute',
                                                top: '2px',
                                                left: isActive ? '20px' : '2px',
                                                transition: 'left 0.2s'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'Notifications' && (
                        <div className="card">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <Bell size={20} /> Notifications
                            </h3>
                            {['New Job Alerts', 'Application Updates', 'Marketing Emails'].map(item => (
                                <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                                    <span>{item}</span>
                                    <input type="checkbox" defaultChecked={true} style={{ accentColor: 'var(--primary)', transform: 'scale(1.2)' }} />
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'Privacy' && (
                        <div className="card">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <Shield size={20} /> Privacy & Security
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Manage your data visibility and account security.
                            </p>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                <input type="checkbox" defaultChecked />
                                Make profile visible to recruiters
                            </label>
                            <button className="btn btn-outline" style={{ color: 'var(--error)', borderColor: 'var(--error)' }}>
                                Delete Account
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
