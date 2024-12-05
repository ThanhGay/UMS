import { Metadata } from 'next';
import HomePage from '@views/Student/Home';

export const metadata: Metadata = {
  title: 'Trang chủ sinh viên'
};

function Index() {
  return <HomePage />;
}

export default Index;
