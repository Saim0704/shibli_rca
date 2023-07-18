// import { message } from 'antd';
import React, {
  Suspense,
  // Fragment, useEffect, useMemo
} from 'react';
import {
  // Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AppContainer from './components/root';
import ErrorBoundary from './components/errorBoundary';
// import useSession from './hooks/session';
import Loading from './components/loading';
// import ForgotPassword from './pages/user/forgot-password';
// import AllUsers from './pages/admin/users';

// const Registration = React.lazy(() => import('./pages/admin/registration'));
// const Gallery = React.lazy(() => import('./pages/admin/gallery'));
// const Events = React.lazy(() => import('./pages/admin/events'));
// const Notices = React.lazy(() => import('./pages/admin/notices'));
// const TestCentres = React.lazy(() => import('./pages/admin/test-centers'));
// const CurrentAffairs = React.lazy(
// () => import('./pages/admin/current-affairs')
// );
// const SiteSettings = React.lazy(() => import('./pages/admin/site-settings'));
// const Register = React.lazy(() => import('./pages/exam/register'));
const Home = React.lazy(() => import('./pages'));
const ContactUs = React.lazy(() => import('./pages/contact-us'));
const AboutUs = React.lazy(() => import('./pages/about-us'));
// const Achievements = React.lazy(() => import('./pages/achievements'));
// const Testimonials = React.lazy(() => import('./pages/testimonials'));
// const Auth = React.lazy(() => import('./pages/user/auth'));
// const ChangePassword = React.lazy(() => import('./pages/user/change-password'));
const NotFound = React.lazy(() => import('./pages/404'));
// const Profile = React.lazy(() => import('./pages/user/profile'));

interface IRoute {
  path: string;
  Component: React.FC;
}

// const NavigateToHome = () => <Navigate to='/' />;

// const adminRoutes: IRoute[] = [
//   {
//     path: '/admin/current-affairs',
//     Component: NavigateToHome /* CurrentAffairs */,
//   },
//   { path: '/admin/events', Component: NavigateToHome /* Events */ },
//   { path: '/admin/gallery', Component: NavigateToHome /* Gallery */ },
//   { path: '/admin/notices', Component: NavigateToHome /* Notices */ },
//   { path: '/admin/registration', Component: NavigateToHome /* Registration */ },
//   {
//     path: '/admin/site-settings',
//     Component: NavigateToHome /* SiteSettings */,
//   },
//   { path: '/admin/test-centers', Component: NavigateToHome /* TestCentres */ },
//   { path: '/admin/users', Component: NavigateToHome /* AllUsers */ },
//   {
//     path: '/user/change-password',
//     Component: NavigateToHome /* ChangePassword */,
//   },
// ];

// const userRoutes: IRoute[] = [
//   { path: '/exam/register', Component: NavigateToHome /* Register */ },
//   {
//     path: '/user/change-password',
//     Component: NavigateToHome /* ChangePassword */,
//   },
//   { path: '/user/profile', Component: NavigateToHome /* Profile */ },
// ];

const otherRoutes: IRoute[] = [
  { path: '/', Component: Home },
  { path: '/contact-us', Component: ContactUs },
  { path: '/about-us', Component: AboutUs },
  // { path: '/achievements', Component: Achievements },
  // { path: '/testimonials', Component: Testimonials },
];

// const unAuthRoutes: IRoute[] = [
//   { path: '/', Component: Home },
//   { path: '/user/auth', Component: NavigateToHome /* Auth */ },
//   {
//     path: '/user/forgot-password',
//     Component: NavigateToHome /* ForgotPassword */,
//   },
// ];

const App = () => {
  // const {
  //   getMeInitial,
  //   me: { authenticated, user, loading },
  // } = useSession();

  // const routes = useMemo(() => {
  //   let routes: IRoute[] = [];
  //   if (authenticated) {
  //     if (user?.type === 'ADMIN') routes = adminRoutes;
  //     else routes = userRoutes;
  //   } else routes = unAuthRoutes;
  //   return [...routes, ...otherRoutes].map((t) => ({
  //     ...t,
  //     key: Math.random(),
  //   }));
  // }, [authenticated, user, loading]);

  // useEffect(() => {
  //   getMeInitial()
  //     .then((correct) => {
  //       if (correct) message.success('Successfully logged in');
  //       else message.warning('User not logged in');
  //     })
  //     .catch(console.log);
  // }, []);

  // if (loading) return <Loading loading={loading} />;
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading loading />}>
        <AppContainer>
          <Routes>
            {otherRoutes.map(({ path, Component }, i) => {
              return <Route key={i} path={path} Component={Component} />;
            })}
            {/* {!authenticated ? (
              <Fragment>
                {[...userRoutes, ...adminRoutes].map((t) => (
                  <Route path={t.path} element={<Navigate to='/user/auth' />} />
                ))}
              </Fragment>
            ) : (
              <></>
            )} */}
            <Route path='*' Component={NotFound} />
          </Routes>
        </AppContainer>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
