import React from 'react';
import { Spin, Typography } from 'antd';

interface IProps {
  loading: boolean;
  message?: string;
}

const Loading: React.FC<IProps> = ({ loading, message }) => {
  return (
    <>
      <div
        className='center-all'
        style={{ height: 'calc(100vh - 128px)', flexDirection: 'column' }}
      >
        <Spin spinning={loading} />

        <br />

        <Typography.Text>{message || 'App is Loading . . .'}</Typography.Text>
      </div>
    </>
  );
};

export default Loading;
