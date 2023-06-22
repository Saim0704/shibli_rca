import { Typography } from 'antd';
import { Fragment, useEffect, useState } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { IRegistration, ITestCenter } from '../../types/models';
import { useNavigate } from 'react-router-dom';
import instance from '../../hooks/api';
import useSession from '../../hooks/session';
import Loading from '../../components/loading';

// interface IProfileProps {
//   data: IRegistration & {
//     timeOfExam: string;
//     dateOfExam: string;
//   };
//   printContainerRef: React.MutableRefObject<null>;
// }

// interface IProps {
//   registration: IRegistration;
//   testCenter: ITestCenter;
//   dateOfExam: string;
//   timeOfExam: string;
// }

const Profile = () => {
  const navigate = useNavigate();
  const {
    me: { authenticated, loading, user },
  } = useSession();
  const [pageLoading, setPageLoading] = useState(true);

  const getInitialData = async () => {
    if (loading) return;
    if (!authenticated) {
      navigate('/user/auth?redirect=exam-register', { replace: true });
      return;
    }

    if (user?.type === 'ADMIN') {
      navigate('/', { replace: true });
      return;
    }

    try {
      setPageLoading(true);
      const { data } = await instance.get('/profile');
      if (!data || !data.registration || !data.registration.registerComplete) {
        navigate('/exam/register', { replace: true });
        return;
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    getInitialData();
  }, [loading, user, authenticated]);

  // const data: IProfileProps['data'] = {
  //   ...(props?.registration as IRegistration),
  //   testCenter: props?.testCenter?.address as any,
  //   dateOfExam: props?.dateOfExam as string,
  //   timeOfExam: props?.timeOfExam as string,
  // };

  // const printContainerRef = useRef(null);
  // const printPdf = useReactToPrint({
  //   content: () => printContainerRef.current,
  // });

  if (pageLoading) return <Loading loading={pageLoading} />;

  return (
    <Fragment>
      {/* <div className='flex my-2 mr-2 justify-end'>
        <Button type='primary' onClick={printPdf}>
          Print Admit Card
        </Button>
      </div> */}

      <div className='flex items-center flex-col justify-center min-h-[500px]'>
        <Typography.Title level={3}>
          You have already registered for the exam
        </Typography.Title>
        <Typography.Text>
          Your Response was recorded. You will get admit card here in a few days
        </Typography.Text>
      </div>

      {/* <AdmitCardTemplate printContainerRef={printContainerRef} data={data} /> */}
    </Fragment>
  );
};

export default Profile;
