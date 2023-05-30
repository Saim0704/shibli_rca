import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContainer from './components/root';
import ErrorBoundary from './components/errorBoundary';
import useSession from './hooks/session';
import Loading from './components/loading';

import Registration from './pages/admin/registration';
import Gallery from './pages/admin/gallery';
import Events from './pages/admin/events';
import Notices from './pages/admin/notices';
import TestCentres from './pages/admin/test-centers';
import CurrentAffairs from './pages/admin/current-affairs';
import SiteSettings from './pages/admin/site-settings';
import Register from './pages/exam/register';
import Home from './pages';
import ContactUs from './pages/contact-us';
import AboutUs from './pages/about-us';
import Achievements from './pages/achievements';
import Testimonials from './pages/testimonials';
import Auth from './pages/user/auth';
import ChangePassword from './pages/user/change-password';
import NotFound from './pages/404';

interface IRoute {
  path: string;
  Component: React.FC;
}

const adminRoutes: IRoute[] = [
  { path: '/admin/registration', Component: Registration },
  { path: '/admin/gallery', Component: Gallery },
  { path: '/admin/events', Component: Events },
  { path: '/admin/notices', Component: Notices },
  { path: '/admin/test-centers', Component: TestCentres },
  { path: '/admin/current-affairs', Component: CurrentAffairs },
  { path: '/admin/site-settings', Component: SiteSettings },
  { path: '/user/change-password', Component: ChangePassword },
];

const userRoutes: IRoute[] = [
  { path: '/exam/register', Component: Register },
  { path: '/user/change-password', Component: ChangePassword },
];

const otherRoutes: IRoute[] = [
  { path: '/', Component: Home },
  { path: '/contact-us', Component: ContactUs },
  { path: '/about-us', Component: AboutUs },
  { path: '/achievements', Component: Achievements },
  { path: '/testimonials', Component: Testimonials },
];

const unAuthRoutes: IRoute[] = [
  { path: '/user/auth', Component: Auth },
  { path: '/', Component: Home },
];

const App = () => {
  const {
    getMeInitial,
    me: { authenticated, user, loading },
  } = useSession();

  useEffect(() => {
    getMeInitial();
  }, []);

  useEffect(() => {
    console.log('app: ', { authenticated, user, loading });
  }, [authenticated, user, loading]);

  if (loading) <Loading loading={loading} />;
  return (
    <ErrorBoundary>
      <AppContainer>
        <Routes>
          {[
            ...(authenticated
              ? user?.type === 'ADMIN'
                ? adminRoutes
                : userRoutes
              : unAuthRoutes),
            ...otherRoutes,
          ].map(({ path, Component }) => (
            <Route key={path} path={path} Component={Component} />
          ))}
          <Route path='*' Component={NotFound} />
        </Routes>
      </AppContainer>
    </ErrorBoundary>
  );
};

export default App;
