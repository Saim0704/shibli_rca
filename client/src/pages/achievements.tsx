import React from 'react';
import UserHeader from '../components/userHeader';

interface IProps {}

const Achievements: React.FC<IProps> = () => {
  return (
    <>
      <UserHeader>
        <div>Achievements</div>
      </UserHeader>
    </>
  );
};

export default Achievements;
