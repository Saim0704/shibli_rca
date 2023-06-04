import instance from './api';
import { authContext } from './auth';
import { IUser } from '../types/models';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const useSession = () => {
  const navigate = useNavigate();
  const [me, setMe] = useContext(authContext);

  const setSession = (token: string, user: IUser) => {
    if (!token || !user || Object.entries(user).length === 0) return;
    window.localStorage.setItem('token', token);
    setMe({ authenticated: true, user, loading: false });
  };

  const stopLoading = () => setMe((prev) => ({ ...prev, loading: false }));

  const startLoading = () => setMe((prev) => ({ ...prev, loading: true }));

  const resetSession = () => {
    window.localStorage.removeItem('token');
    setMe({ authenticated: false, user: null, loading: false });
  };

  const logout = () => {
    resetSession();
    navigate('/user/auth');
  };

  const getToken = () => window.localStorage.getItem('token') ?? null;

  const getMeInitial = async () => {
    try {
      startLoading();
      const token = getToken();
      if (!token) {
        navigate('/user/auth');
        return;
      }

      const { data } = await instance.get('/me');
      if (!data) throw new Error('User not found');
      setSession(token, data);
      return true;
    } catch (err: any) {
      console.log(err);
      resetSession();
      return false;
    } finally {
      stopLoading();
    }
  };

  interface ILogin {
    email: string;
    password: string;
  }
  const login = async ({ email, password }: ILogin) => {
    try {
      startLoading();
      const { data } = await instance.post('/login', { email, password });
      if (!data || !data.token || !data.user) throw new Error('No user found');
      setSession(data.token, data.user);
      return true;
    } catch (err) {
      resetSession();
      return false;
    } finally {
      stopLoading();
    }
  };

  return {
    me,
    login,
    logout,
    getToken,
    setSession,
    stopLoading,
    getMeInitial,
    resetSession,
    startLoading,
  };
};

export default useSession;
