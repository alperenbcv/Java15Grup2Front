import React, { useState } from 'react';
import { Input, Button, Alert, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./PasswordChangeComp.css"
import { MyDispatch } from '../../../store';
import { useDispatch } from 'react-redux';
import { fetchChangePassword } from '../../../store/feature/userSlice';

function PasswordChangeComp() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReNewPassword, setShowReNewPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const dispatch = useDispatch<MyDispatch>();

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordsMatch(value === reNewPassword);
  };

  const handleReNewPasswordChange = (value: string) => {
    setReNewPassword(value);
    setPasswordsMatch(newPassword === value);
  };

  const handleSubmit = () => {
    if (!passwordsMatch) {
      setAlertMessage("Passwords do not match!");
      setAlertType("error");
      return;
    }

    setAlertMessage("Password changed successfully!");
    setAlertType("success");

    dispatch(fetchChangePassword({oldPassword,newPassword,reNewPassword}))
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2 className='password-change-text'>Password Change</h2>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <label className='password-change-text'>Current Password:</label>
          <Input.Password 
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Enter your current password"
          />
        </div>

        <div>
          <label className='password-change-text'>New Password:</label>
          <Input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => handleNewPasswordChange(e.target.value)}
            placeholder="Enter your new password"
            suffix={
              <Button
                type="text"
                icon={showNewPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            }
          />
        </div>

        <div>
          <label className='password-change-text'>Re-enter New Password:</label>
          <Input
            type={showReNewPassword ? 'text' : 'password'}
            value={reNewPassword}
            onChange={(e) => handleReNewPasswordChange(e.target.value)}
            placeholder="Re-enter your new password"
            suffix={
              <Button
                type="text"
                icon={showReNewPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                onClick={() => setShowReNewPassword(!showReNewPassword)}
              />
            }
          />
        </div>

        {alertMessage && (
          <Alert
            message={alertMessage}
            type={alertType || 'info'}
            showIcon
            closable
            onClose={() => setAlertMessage(null)}
          />
        )}

        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!oldPassword || !newPassword || !reNewPassword || !passwordsMatch}
          block
        >
          <label className='password-change-text'>Change Password</label>
        </Button>
      </Space>
    </div>
  );
}

export default PasswordChangeComp;
