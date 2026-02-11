// ... imports
import BugReportModal from './BugReportModal';

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('jobsy_current_user') || 'null');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showBugReport, setShowBugReport] = useState(false);

    // ... useEffect ...

    // ... notifications ...

    // ... return ...

    return (
        <>
            <BugReportModal isOpen={showBugReport} onClose={() => setShowBugReport(false)} />

            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                backgroundColor: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Briefcase color="var(--accent)" size={28} />
                    <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                        Jobsy
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link to="/jobs" style={{ fontWeight: 500 }}>Find Jobs</Link>
                    <Link to="/companies" style={{ fontWeight: 500 }}>Companies</Link>
                    <Link to="/dashboard" style={{ fontWeight: 500 }}>Dashboard</Link>
                    <div style={{ position: 'relative', display: 'inline-block' }} className="nav-dropdown">
                        <span style={{ fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>Tools ▼</span>
                        <div className="dropdown-content" style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            background: 'white',
                            boxShadow: 'var(--shadow-md)',
                            borderRadius: '4px',
                            display: 'none',
                            flexDirection: 'column',
                            minWidth: '160px',
                            zIndex: 1000
                        }}>
                            <Link to="/resume" style={{ padding: '0.75rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block', borderBottom: '1px solid var(--border)' }}>Resume Builder</Link>
                            <Link to="/cover-letter" style={{ padding: '0.75rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block', borderBottom: '1px solid var(--border)' }}>Cover Letter</Link>
                            <Link to="/roadmap" style={{ padding: '0.75rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block', borderBottom: '1px solid var(--border)' }}>Career Roadmap</Link>
                            <Link to="/assessment" style={{ padding: '0.75rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block' }}>Skill Assessment</Link>
                        </div>
                    </div>
                    <Link to="/inbox" style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        Inbox
                    </Link>
                    <button
                        onClick={() => setShowBugReport(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontWeight: 500,
                            color: '#dc2626',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            padding: 0,
                            fontFamily: 'inherit'
                        }}
                    >
                        <Bug size={18} /> Report Bug
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    {/* Notification Bell */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={toggleNotifications}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
                        >
                            <Bell size={24} color="var(--text-secondary)" />
                            {unreadCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    background: 'var(--error)',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div className="card" style={{
                                position: 'absolute',
                                top: '40px',
                                right: '-10px',
                                width: '300px',
                                boxShadow: 'var(--shadow-lg)',
                                padding: '0',
                                zIndex: 1000
                            }}>
                                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold' }}>
                                    Notifications
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {notifications.map(n => (
                                        <div key={n.id} style={{
                                            padding: '1rem',
                                            borderBottom: '1px solid var(--border)',
                                            background: n.read ? 'white' : '#f0f9ff'
                                        }}>
                                            <p style={{ margin: 0, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{n.text}</p>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{n.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {user ? (
                        <>
                            <span style={{ fontWeight: 500 }}>{user.name}</span>
                            <Link to="/settings" style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>Settings</Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
