import { useRecoilState } from 'recoil';
import { meAtom } from '../utils/atoms';
import { IUser } from '../types/models';
import { useNavigate } from 'react-router-dom';
import instance from './api';

const useSession = () => {
  const [me, setMe] = useRecoilState(meAtom);
  const navigate = useNavigate();

  const setSession = (token: string, user: IUser) => {
    if (!token || !user || Object.entries(user).length === 0) return;
    window.localStorage.setItem('token', token);
    setMe({ authenticated: true, user, loading: false });
  };

  const getToken = () => window.localStorage.getItem('token') ?? null;

  const getMeInitial = async () => {
    setMe((prev) => ({ ...prev, loading: true }));
    const token = getToken();
    if (!token) {
      navigate('/user/auth');
      return;
    }

    const { data } = await instance.get('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!data || !data.user) logout();
    else setSession(data.token, data.user);
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setMe((prev) => ({ ...prev, loading: true }));
      const { data } = await instance.post('/login', { email, password });
      setSession(data.token, data.user);
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    setMe({ authenticated: false, user: null, loading: false });
    navigate('/user/auth');
  };

  return {
    me,
    getMeInitial,
    login,
    logout,
    getToken,
    setSession,
  };
};

export default useSession;
