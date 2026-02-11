import React, { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Filter } from 'lucide-react';

const MOCK_JOBS = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'TechCorp',
        location: 'Bangalore, KA',
        type: 'Full-time',
        salary: '₹25L - ₹35L',
        salaryMin: 25,
        salaryMax: 35,
        skills: ['React', 'TypeScript', 'Node.js'],
        posted: '2 days ago',
        applyLink: 'https://techcorp.jobs/apply/123'
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Creative Studio',
        location: 'Remote',
        type: 'Full-time',
        salary: '₹15L - ₹22L',
        salaryMin: 15,
        salaryMax: 22,
        skills: ['Figma', 'UI/UX', 'Mobile'],
        posted: '4 hours ago',
        applyLink: 'https://creativestudio.design/careers'
    },
    {
        id: 3,
        title: 'Backend Developer',
        company: 'DataSystems',
        location: 'Mumbai, MH',
        type: 'Contract',
        salary: '₹18L - ₹24L',
        salaryMin: 18,
        salaryMax: 24,
        skills: ['Python', 'Django', 'AWS'],
        posted: '1 day ago',
        applyLink: null // Internal Apply
    },
    {
        id: 4,
        title: 'Marketing Manager',
        company: 'GrowthInc',
        location: 'Gurgaon, HR',
        type: 'Full-time',
        salary: '₹12L - ₹18L',
        salaryMin: 12,
        salaryMax: 18,
        skills: ['SEO', 'Content', 'Analytics'],
        posted: '5 days ago',
        applyLink: 'https://growthinc.marketing/jobs'
    },
    {
        id: 5,
        title: 'DevOps Engineer',
        company: 'CloudNet',
        location: 'Remote',
        type: 'Full-time',
        salary: '₹20L - ₹30L',
        salaryMin: 20,
        salaryMax: 30,
        skills: ['Kubernetes', 'Docker', 'Terraform'],
        posted: '3 days ago',
        applyLink: null
    },
    {
        id: 6,
        title: 'Junior React Developer',
        company: 'StartUp Hub',
        location: 'Remote',
        type: 'Internship',
        salary: '₹2L - ₹4L',
        salaryMin: 2,
        salaryMax: 4,
        skills: ['React', 'JavaScript', 'CSS'],
        posted: '6 hours ago',
        applyLink: 'https://startuphub.io/interns'
    },
    {
        id: 7,
        title: 'Data Scientist',
        company: 'AI Solutions',
        location: 'Hyderabad, TS',
        type: 'Full-time',
        salary: '₹28L - ₹40L',
        salaryMin: 28,
        salaryMax: 40,
        skills: ['Python', 'Machine Learning', 'SQL'],
        posted: '1 week ago',
        applyLink: null
    },
    {
        id: 8,
        title: 'Freelance Copywriter',
        company: 'ContentWorks',
        location: 'Remote',
        type: 'Part-time',
        salary: '₹5L - ₹10L',
        salaryMin: 5,
        salaryMax: 10,
        skills: ['Copywriting', 'SEO', 'Blogging'],
        posted: '2 days ago',
        applyLink: 'https://contentworks.agency/freelance'
    },
    {
        id: 9,
        title: 'Go Developer',
        company: 'BackendPro',
        location: 'Pune, MH',
        type: 'Contract',
        salary: '₹20L - ₹25L',
        salaryMin: 20,
        salaryMax: 25,
        skills: ['Go', 'Microservices', 'gRPC'],
        posted: '3 days ago',
        applyLink: null
    },
    {
        id: 10,
        title: 'UX Researcher',
        company: 'UserFirst',
        location: 'Noida, UP',
        type: 'Part-time',
        salary: '₹8L - ₹12L',
        salaryMin: 8,
        salaryMax: 12,
        skills: ['User Testing', 'Research', 'Analysis'],
        posted: '1 day ago',
        applyLink: null
    }
];

const JobDiscovery = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: [],
        remote: false,
        location: [],
        minSalary: 0,
        skills: []
    });

    // Extract unique locations and skills for filter options
    const uniqueLocations = [...new Set(MOCK_JOBS.map(job => job.location))];
    const uniqueSkills = [...new Set(MOCK_JOBS.flatMap(job => job.skills))];

    const handleTypeChange = (type) => {
        setFilters(prev => ({
            ...prev,
            type: prev.type.includes(type)
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type]
        }));
    };

    const handleLocationChange = (loc) => {
        setFilters(prev => ({
            ...prev,
            location: prev.location.includes(loc)
                ? prev.location.filter(l => l !== loc)
                : [...prev.location, loc]
        }));
    };

    const handleSkillChange = (skill) => {
        setFilters(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const handleRemoteChange = () => {
        setFilters(prev => ({ ...prev, remote: !prev.remote }));
    };

    const handleSalaryChange = (e) => {
        setFilters(prev => ({ ...prev, minSalary: parseInt(e.target.value) }));
    };

    const resetFilters = () => {
        setFilters({ type: [], remote: false, location: [], minSalary: 0, skills: [] });
        setSearchTerm('');
    };

    const filteredJobs = MOCK_JOBS.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
        const matchesRemote = !filters.remote || job.location === 'Remote';
        const matchesLocation = filters.location.length === 0 || filters.location.includes(job.location);
        const matchesSalary = job.salaryMax >= filters.minSalary;
        const matchesSkills = filters.skills.length === 0 || filters.skills.some(skill => job.skills.includes(skill));

        return matchesSearch && matchesType && matchesRemote && matchesLocation && matchesSalary && matchesSkills;
    });

    return (
        <div className="container" style={{ padding: '2rem 0', display: 'flex', gap: '2rem' }}>

            {/* Sidebar Filters */}
            <aside style={{ width: '280px', flexShrink: 0 }}>
                <div className="card" style={{ position: 'sticky', top: '100px', maxHeight: '85vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Filter size={20} /> Filters
                        </h3>
                        <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.9rem' }}>
                            Reset
                        </button>
                    </div>

                    {/* Salary Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Min Salary (LPA)</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                step="5"
                                value={filters.minSalary}
                                onChange={handleSalaryChange}
                                style={{ width: '100%' }}
                            />
                            <span style={{ fontWeight: 'bold', minWidth: '3ch' }}>{filters.minSalary}L</span>
                        </div>
                    </div>

                    {/* Job Type Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Job Type</h4>
                        {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
                            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={filters.type.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                                <span style={{ color: 'var(--text-secondary)' }}>{type}</span>
                            </label>
                        ))}
                    </div>

                    {/* Location Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Location</h4>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={filters.remote}
                                onChange={handleRemoteChange}
                            />
                            <span style={{ color: 'var(--text-secondary)' }}>Remote Only</span>
                        </label>
                        <div style={{ marginTop: '0.5rem', maxHeight: '150px', overflowY: 'auto' }}>
                            {uniqueLocations.filter(l => l !== 'Remote').map(loc => (
                                <label key={loc} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={filters.location.includes(loc)}
                                        onChange={() => handleLocationChange(loc)}
                                    />
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{loc}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Skills Filter */}
                    <div style={{ marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Skills</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {uniqueSkills.slice(0, 10).map(skill => (
                                <button
                                    key={skill}
                                    onClick={() => handleSkillChange(skill)}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        border: filters.skills.includes(skill) ? '1px solid var(--accent)' : '1px solid var(--border)',
                                        background: filters.skills.includes(skill) ? 'var(--accent-light)' : 'transparent',
                                        color: filters.skills.includes(skill) ? 'var(--accent)' : 'var(--text-secondary)',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1 }}>
                {/* Search Header */}
                <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        background: 'white',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.5rem 1rem'
                    }}>
                        <Search size={20} color="var(--text-secondary)" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ border: 'none', padding: '0.5rem', flex: 1, outline: 'none', fontSize: '1rem' }}
                        />
                    </div>
                    <button className="btn btn-primary">Search</button>
                </div>

                {/* Job List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {filteredJobs.map(job => {
                        const isApplied = localStorage.getItem(`applied_${job.id}`);

                        const handleApply = () => {
                            if (isApplied) {
                                // Cancel Application Logic
                                if (window.confirm('Are you sure you want to cancel your application for this job?')) {
                                    localStorage.removeItem(`applied_${job.id}`);
                                    const existingApps = JSON.parse(localStorage.getItem('my_applications') || '[]');
                                    const updatedApps = existingApps.filter(app => app.company !== job.company || app.role !== job.title);
                                    localStorage.setItem('my_applications', JSON.stringify(updatedApps));
                                    window.location.reload();
                                }
                                return;
                            }

                            if (job.applyLink) {
                                // External Application
                                window.open(job.applyLink, '_blank');
                                // Track as "Redirected" application
                                const newApplication = {
                                    id: Date.now(),
                                    jobId: job.id, // Store job ID for easier cancellation matching
                                    company: job.company,
                                    role: job.title,
                                    status: 'Applied (External)',
                                    date: new Date().toISOString().split('T')[0]
                                };
                                const existingApps = JSON.parse(localStorage.getItem('my_applications') || '[]');
                                localStorage.setItem('my_applications', JSON.stringify([newApplication, ...existingApps]));
                                localStorage.setItem(`applied_${job.id}`, 'true');
                                window.location.reload();
                            } else {
                                // Internal Application
                                const newApplication = {
                                    id: Date.now(),
                                    jobId: job.id, // Store job ID
                                    company: job.company,
                                    role: job.title,
                                    status: 'Applied',
                                    date: new Date().toISOString().split('T')[0]
                                };
                                const existingApps = JSON.parse(localStorage.getItem('my_applications') || '[]');
                                localStorage.setItem('my_applications', JSON.stringify([newApplication, ...existingApps]));
                                localStorage.setItem(`applied_${job.id}`, 'true');
                                window.location.reload();
                            }
                        };

                        return (
                            <div key={job.id} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    background: 'var(--background)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)'
                                }}>
                                    {job.company[0]}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{job.title}</h3>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{job.posted}</span>
                                    </div>

                                    <p style={{ color: 'var(--accent)', fontWeight: 500, marginBottom: '0.5rem' }}>{job.company}</p>

                                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={16} /> {job.location}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Briefcase size={16} /> {job.type}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><DollarSign size={16} /> {job.salary}</span>
                                    </div>

                                    {/* Skill Match Indicator */}
                                    <div style={{ marginBottom: '1rem' }}>
                                        {(() => {
                                            // Get user skills from local storage (mock profile or resume)
                                            // Ideally we get this from a 'profile' object, but let's check 'resumeData' first
                                            // If not found, use a default set for demo purposes
                                            const resumeData = JSON.parse(localStorage.getItem('resume_data') || '{"skills": "React, JavaScript, CSS"}');
                                            const userSkills = resumeData.skills.split(',').map(s => s.trim().toLowerCase());

                                            const jobSkills = job.skills.map(s => s.toLowerCase());
                                            const matchCount = jobSkills.filter(s => userSkills.includes(s)).length;
                                            const matchPercentage = Math.round((matchCount / jobSkills.length) * 100);

                                            let matchColor = 'var(--text-secondary)';
                                            if (matchPercentage >= 70) matchColor = 'var(--success)';
                                            else if (matchPercentage >= 40) matchColor = 'var(--warning)';

                                            return (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                                    <span style={{ fontWeight: 'bold', color: matchColor }}>
                                                        {matchPercentage}% Match
                                                    </span>
                                                    <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '3px', maxWidth: '100px' }}>
                                                        <div style={{ width: `${matchPercentage}%`, height: '100%', background: matchColor, borderRadius: '3px' }}></div>
                                                    </div>
                                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                                                        ({matchCount}/{jobSkills.length} skills)
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {job.skills.map(skill => (
                                            <span key={skill} style={{
                                                background: 'var(--background)',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.8rem',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className={`btn ${isApplied ? 'btn-outline' : 'btn-primary'}`}
                                    onClick={handleApply}
                                    style={{
                                        borderColor: isApplied ? 'var(--error)' : 'var(--primary)',
                                        color: isApplied ? 'var(--error)' : 'white',
                                        background: isApplied ? 'transparent' : 'var(--primary)',
                                        opacity: 1 // Enable button for cancel action
                                    }}
                                >
                                    {isApplied ? 'Cancel Application' : job.applyLink ? 'Apply External ↗' : 'Apply Now'}
                                </button>
                            </div>
                        );
                    })}

                    {filteredJobs.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                            <p>No jobs found matching your criteria.</p>
                            <button onClick={resetFilters} style={{ marginTop: '1rem', color: 'var(--accent)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default JobDiscovery;
