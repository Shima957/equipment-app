import userState from '@/atoms/atoms';
import { useRecoilValue } from 'recoil';

const Home = () => {
  const user = useRecoilValue(userState);

  return <h1>{user?.username}</h1>;
};

export default Home;
