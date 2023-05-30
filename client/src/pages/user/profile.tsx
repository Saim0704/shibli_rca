import { Typography } from 'antd';
import { Fragment, useEffect } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { IRegistration, ITestCenter } from '../../types/models';
import { useNavigate } from 'react-router-dom';
import instance from '../../hooks/api';

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
  // const [props, setProps] = useState<IProps | null>(null);

  useEffect(() => {
    const getData = async () => {
      // NOT EXISTS
      const { data } = await instance.get('/profile');
      if (!data || !data.registration || !data.registration.registerComplete) {
        navigate('/exam/register');
        return;
      }
      // setProps(data);
    };
    getData().then().catch(console.log);
  }, []);

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
