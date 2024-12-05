import { Metadata } from 'next';
import HomePageTeacher from '@views/Teacher/Home';

export const metadata: Metadata = {
  title: 'Trang chủ giảng viên'
};

function Index() {
  return <HomePageTeacher />;
}

export default Index;
