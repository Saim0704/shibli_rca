import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NotFound from '../pages/404';

const Catch = (component: any) =>
  class extends React.Component {
    state = {
      error: undefined,
    };

    static getDerivedStateFromError(error: any) {
      return { error };
    }

    removeError() {
      this.setState({ error: undefined });
    }

    componentDidCatch(error: any, info: any) {
      console.log(error, info);
    }

    render() {
      return component(
        this.props,
        this.state.error,
        this.removeError.bind(this)
      );
    }
  };

type IProps = {
  removeError: any;
};

const ErrorHandlerFallback: React.FC<IProps> = ({ removeError }) => {
  const { pathname } = useLocation();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!currentPath) return;
    if (currentPath !== pathname) {
      removeError();
    }
  }, [pathname]);

  return <NotFound />;
};

const ErrorBoundary = Catch((props: any, error: any, removeError: any) => {
  if (error) {
    return <ErrorHandlerFallback removeError={removeError} />;
  }
  return <>{props.children}</>;
});

export default ErrorBoundary;
