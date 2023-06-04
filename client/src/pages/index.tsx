import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import { Button, Card, Carousel, Image, Typography } from 'antd';
import { IEvent, IGallery, INotice } from '../types/models';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../components/userHeader';
import MainCarousel from '../components/mainCarousel';
import Principles from '../components/principles';
import instance from '../hooks/api';

const Home = () => {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<INotice[]>([]);
  const [gallery, setGallery] = useState<IGallery[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);

  const getNotices = async () => {
    const { data } = await instance.get('/notices');
    setNotices(data.data);
  };

  const getGallery = async () => {
    const { data } = await instance.get('/gallery');
    setGallery(data.data);
  };

  const getEvents = async () => {
    const { data } = await instance.get('/events');
    setEvents(data.data);
  };

  useEffect(() => {
    Promise.all([getNotices(), getGallery(), getEvents()])
      .then()
      .catch(console.log);
  }, []);

  return (
    <>
      <UserHeader>
        <Carousel autoplay arrows className='w-screen' dotPosition='top'>
          {[3, 1, 2, 4, 5, 6].map((n) => (
            <MainCarousel key={n} alt='carousel items' url={`/home${n}.jpeg`} />
          ))}
        </Carousel>

        <div className='relative -top-[150px] flex items-center justify-center flex-col'>
          <Button
            className='w-[250px] h-[60px] font-bold text-lg'
            type='primary'
            onClick={() => navigate('/exam/register')}
          >
            Register for Exam
          </Button>
          <Typography.Text className='block font-bold text-lg text-red-700 bg-white bg-opacity-40 rounded-md py-1 px-4 mt-2 backdrop:opacity-10'>
            You have to create account First
          </Typography.Text>
        </div>

        <Principles />

        {notices && notices.length > 0 && (
          <Fragment>
            <Typography.Title level={3} className='text-center'>
              Notices
            </Typography.Title>
            <div className='flex gap-4 items-center justify-center sm:justify-start flex-grow-0 flex-wrap mx-4'>
              {notices.map((t) => (
                <Card
                  key={t._id}
                  className='min-w-full sm:min-w-max sm:w-64 flex-grow'
                >
                  <Card.Meta
                    title={t.title}
                    description={
                      <div
                        dangerouslySetInnerHTML={{ __html: t.description }}
                      />
                    }
                  />
                  {t.issuedBy ? (
                    <Card.Meta title='Issued By' description={t.issuedBy} />
                  ) : null}
                </Card>
              ))}
            </div>
            <br />
          </Fragment>
        )}

        {gallery && gallery.length > 0 && (
          <Fragment>
            <Typography.Title level={3} className='text-center mt-10'>
              Gallery
            </Typography.Title>
            <div className='flex gap-4 items-center justify-center sm:justify-start flex-grow-0 flex-wrap mx-4'>
              {gallery.map((t) => {
                return (
                  <Card
                    key={t._id}
                    className='min-w-full sm:min-w-max sm:w-64 m-0 p-0'
                    bodyStyle={{ padding: 12 }}
                  >
                    <Image
                      src={t.image}
                      preview={false}
                      className='rounded-md mb-4'
                    />
                    <Card.Meta
                      title={t.name}
                      {...(t.description
                        ? {
                            description: (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: t.description,
                                }}
                              />
                            ),
                          }
                        : {})}
                    />
                  </Card>
                );
              })}
            </div>
            <br />
          </Fragment>
        )}

        {events && events.length > 0 && (
          <Fragment>
            <Typography.Title level={3} className='text-center mt-10'>
              Events
            </Typography.Title>
            <div className='flex gap-4 items-center justify-center sm:justify-start flex-grow-0 flex-wrap mx-4'>
              {events.map((t) => {
                return (
                  <Card
                    key={t._id}
                    className='min-w-full sm:min-w-max sm:w-64 m-0 p-0'
                    bodyStyle={{ padding: 12 }}
                  >
                    <Card.Meta
                      title={t.name}
                      {...(t.description
                        ? {
                            description: (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: t.description,
                                }}
                              />
                            ),
                          }
                        : {})}
                    />
                    <Card.Meta
                      title='Start Date'
                      description={dayjs(t.startDate).format(
                        'DD-MM-YYYY HH:mm A'
                      )}
                    />
                    <Card.Meta
                      title='End Date'
                      description={dayjs(t.endDate).format(
                        'DD-MM-YYYY HH:mm A'
                      )}
                    />
                  </Card>
                );
              })}
            </div>
            <br />
          </Fragment>
        )}
      </UserHeader>
    </>
  );
};

export default Home;
