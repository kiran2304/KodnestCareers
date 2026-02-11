import React from 'react';
import { Building2, MapPin, Users, Globe } from 'lucide-react';

const COMPANIES = [
    {
        id: 1,
        name: 'TechCorp',
        industry: 'Software',
        location: 'Bangalore, KA',
        employees: '1000-5000',
        description: 'Leading the way in innovative software solutions for enterprise clients ind India.',
        website: 'techcorp.in'
    },
    {
        id: 2,
        name: 'Creative Studio',
        industry: 'Design',
        location: 'Remote',
        employees: '50-200',
        description: 'A global collective of designers, artists, and strategists.',
        website: 'creativestudio.in'
    },
    {
        id: 3,
        name: 'DataSystems',
        industry: 'Data Analytics',
        location: 'Mumbai, MH',
        employees: '500-1000',
        description: 'Turning complex data into actionable insights for businesses.',
        website: 'datasystems.co.in'
    },
    {
        id: 4,
        name: 'GrowthInc',
        industry: 'Marketing',
        location: 'Gurgaon, HR',
        employees: '200-500',
        description: 'Accelerating business growth through precision marketing.',
        website: 'growthinc.in'
    },
    {
        id: 5,
        name: 'CloudNet',
        industry: 'Infrastructure',
        location: 'Hyderabad, TS',
        employees: '1000+',
        description: 'Building the backbone of the modern internet infrastructure.',
        website: 'cloudnet.in'
    }
];

const Companies = () => {
    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Top Companies</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {COMPANIES.map(company => (
                    <div key={company.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '50px', height: '50px',
                                background: 'var(--background)',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-secondary)'
                            }}>
                                {company.name[0]}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{company.name}</h3>
                                <span style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>{company.industry}</span>
                            </div>
                        </div>

                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>
                            {company.description}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} /> {company.location}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Users size={16} /> {company.employees} employees
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Globe size={16} /> {company.website}
                            </span>
                        </div>

                        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}>
                            View Jobs
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Companies;
