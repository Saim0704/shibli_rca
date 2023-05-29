import { useRecoilState } from 'recoil';
import { meAtom } from '../utils/atoms';
import { IUser } from '../types/models';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useSession = () => {
  const [me, setMe] = useRecoilState(meAtom);
  const navigate = useNavigate();

  const setSession = (token: string, user: IUser) => {
    window.localStorage.setItem('token', token);
    setMe({ authenticated: true, user, loading: false });
  };

  const getSession = () => window.localStorage.getItem('token') ?? null;

  const getMeInitial = async () => {
    setMe((prev) => ({ ...prev, loading: true }));
    const token = getSession();
    if (!token) {
      navigate('/user/auth');
      return;
    }

    const { data } = await axios.get('/user/me', {});
    setSession(data.token, data.user);
  };

  const login = async ({}: { username: string; password: string }) => {
    return false;
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
    getSession,
    setSession,
  };
};

export default useSession;
