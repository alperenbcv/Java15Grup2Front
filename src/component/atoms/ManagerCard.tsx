import React, { useEffect, useState } from 'react';
import './ManagerCard.css';
import { useDispatch } from 'react-redux';
import { MyDispatch, MyUseSelector } from '../../store';
import { fetchManagerCard } from '../../store/feature/managerSlice';

interface UserInfo {
    joinDate: string;
    phone: string;
    email: string;
    departmant: string;
    address: string;
}

function ManagerCard() {
    const dispatch = useDispatch<MyDispatch>();
    const { managerCard, isManagerCardLoading } = MyUseSelector((state) => state.manager);

    const [isEditMode, setIsEditMode] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        phone: '',
        email: '',
        departmant: '',
        address: '',
        joinDate: '',
    });

    useEffect(() => {
        dispatch(fetchManagerCard()); // API'den bilgileri çek
    }, [dispatch]);

    useEffect(() => {
        if (managerCard) {
            setUserInfo({
                phone: managerCard.phoneNumber,
                email: managerCard.email,
                departmant: managerCard.department,
                address: managerCard.address,
                joinDate: managerCard.createdAt,
            });
        }
    }, [managerCard]);

    const toggleEditMode = () => setIsEditMode(!isEditMode);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    if (isManagerCardLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="row manager-card-top-row">
                <div className="col-2">
                    <img
                        className="dashboard-img"
                        src="https://picsum.photos/50/50"
                        alt="manager-img"
                    />
                </div>
                <div className="col-8 manager-info-col">
                    <div className="row">
                        <h4 className="manager-name">{managerCard?.name || 'Manager Name'}</h4>
                    </div>
                    <div className="row">
                        <h5 className="manager-title">{managerCard?.title || 'Manager Title'}</h5>
                    </div>
                </div>
                <div className="col-1">
                    <button className="btn dashboard-card-edit-btn" onClick={toggleEditMode}>
                        {isEditMode ? (
                            <i className="fa-regular fa-floppy-disk fa-xl save-icon-manager"></i>
                        ) : (
                            <i className="fa-solid fa-pen-to-square fa-xl edit-icon-manager"></i>
                        )}
                    </button>
                </div>
            </div>
            <div className="row">
                <hr className="manager-card-hr-1" />
            </div>
            <div className="col-12 info-col">
                <p className="manager-info-title">
                    <strong>Phone Number:</strong>{' '}
                    {isEditMode ? (
                        <input
                            className="form-control manager-info-input"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p>{userInfo.phone}</p>
                    )}
                </p>
                <p className="manager-info-title">
                    <strong>Email Address:</strong>{' '}
                    {isEditMode ? (
                        <input
                            className="form-control manager-info-input"
                            name="email"
                            value={userInfo.email}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p>{userInfo.email}</p>
                    )}
                </p>
                <p className="manager-info-title">
                    <strong>Department:</strong>{' '}
                    <p>{userInfo.departmant}</p>
                </p>
                <p className="manager-info-title">
                    <strong>Address:</strong>{' '}
                    {isEditMode ? (
                        <input
                            className="form-control manager-info-input"
                            name="address"
                            value={userInfo.address}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <p>{userInfo.address}</p>
                    )}
                </p>
                <p className="manager-info-title">
                    <strong>Joined On:</strong> <p>{userInfo.joinDate}</p>
                </p>
            </div>
        </>
    );
}

export default ManagerCard;
