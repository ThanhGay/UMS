import { Metadata } from 'next';
import { WeeklyTeacher } from '@views/Teacher/Schedule';

export const metadata: Metadata = {
  title: 'Lịch theo tuần'
};

function Index() {
  return <WeeklyTeacher />;
}

export default Index;
