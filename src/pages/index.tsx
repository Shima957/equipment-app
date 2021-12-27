import userSession from '@/atoms/atoms';
import { useRecoilValue } from 'recoil';

const Home = () => {
  const session = useRecoilValue(userSession);

  return <h1>{session?.user?.email}</h1>;
};

export default Home;
