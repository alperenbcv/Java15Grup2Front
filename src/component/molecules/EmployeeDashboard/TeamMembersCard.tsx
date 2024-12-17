import React from 'react';
import './TeamMembersCard.css'; // CSS dosyası

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Alexander Jermai',
    role: 'UI/UX Designer',
    imageUrl: 'https://i.pravatar.cc/50?img=1',
    email: 'alexander@example.com',
  },
  {
    id: 2,
    name: 'Doglas Martini',
    role: 'Product Designer',
    imageUrl: 'https://i.pravatar.cc/50?img=2',
    email: 'doglas@example.com',
  },
  {
    id: 3,
    name: 'Daniel Esbella',
    role: 'Project Manager',
    imageUrl: 'https://i.pravatar.cc/50?img=3',
    email: 'daniel.pm@example.com',
  },
  {
    id: 4,
    name: 'Daniel Esbella',
    role: 'Team Lead',
    imageUrl: 'https://i.pravatar.cc/50?img=4',
    email: 'daniel.teamlead@example.com',
  },
  {
    id: 5,
    name: 'Stephan Peralt',
    role: 'Team Lead',
    imageUrl: 'https://i.pravatar.cc/50?img=5',
    email: 'stephan@example.com',
  },
  {
    id: 6,
    name: 'Andrew Jermia',
    role: 'Project Lead',
    imageUrl: 'https://i.pravatar.cc/50?img=6',
    email: 'andrew@example.com',
  },
];

const TeamMembersCard: React.FC = () => {
  return (
    <>
      <div className="team-header">
        <h3>Team Members</h3>
        <button className="view-all-button">View All</button>
      </div>
      <ul className="team-list">
        {teamMembers.map((member) => (
          <li key={member.id} className="team-card">
            <img src={member.imageUrl} alt={member.name} className="profile-img" />
            <div className="member-info">
              <h4 className="member-name">{member.name}</h4>
              <p className="member-role">{member.role}</p>
            </div>
            <a href={`mailto:${member.email}`} className="mail-icon">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TeamMembersCard;
