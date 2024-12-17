import React from 'react';
import './EmployeeNotificationCard.css';

interface Notification {
  id: number;
  name: string;
  title: string;
  message: string;
  time: string;
  imageUrl: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    name: 'John Doe',
    time: 'Today at 9:42 AM',
    title: 'Something',
    message: 'Something important...',
    imageUrl: 'https://i.pravatar.cc/50?img=1',
  },
  {
    id: 2,
    name: 'John Doe',
    time: 'Today at 9:42 AM',
    title: 'Something',
    message: 'Something important...',
    imageUrl: 'https://i.pravatar.cc/50?img=1',
  },
  {
    id: 3,
    name: 'John Doe',
    time: 'Today at 9:42 AM',
    title: 'Something',
    message: 'Something important...',
    imageUrl: 'https://i.pravatar.cc/50?img=1',
  },
  {
    id: 4,
    name: 'John Doe',
    time: 'Today at 9:42 AM',
    title: 'Something',
    message: 'Something important...',
    imageUrl: 'https://i.pravatar.cc/50?img=1',
  },
  {
    id: 5,
    name: 'John Doe',
    time: 'Today at 9:42 AM',
    title: 'Something',
    message: 'Something important...',
    imageUrl: 'https://i.pravatar.cc/50?img=1',
  },
];

const EmployeeNotificationCard: React.FC = () => {
  return (
    <>
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="view-all-button">View All</button>
      </div>
      <ul className="notification-list">
        {notifications.map((notification) => (
          <div className="row notification-row">
          <li key={notification.id} className="notification-item">
            <img src={notification.imageUrl} alt="profile" className="profile-img" />
            <div className="notification-details">
              <span className="notification-name">{notification.name}</span>
              <div className="row">
              <span className="notification-title">{notification.title}</span>
              </div>
              <div className="row">
              <span className="notification-text">{notification.message}</span>
              </div>
              <div className="notification-time">{notification.time}</div>
            </div>
          </li>
          </div>
        ))}
      </ul>
    </>
  );
};

export default EmployeeNotificationCard;
