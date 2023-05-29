import { Spin, Typography } from 'antd';
import React from 'react';

interface IProps {
  loading?: boolean;
}

const Loading: React.FC<IProps> = ({ loading }) => {
  return (
    <>
      <div
        className='center-all'
        style={{ height: 'calc(100vh - 128px)', flexDirection: 'column' }}
      >
        <Spin spinning={loading} />

        <br />

        <Typography.Text>App is Loading . . .</Typography.Text>
      </div>
    </>
  );
};

export default Loading;
