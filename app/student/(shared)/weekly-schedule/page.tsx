import { Metadata } from 'next';
import { WeeklySchedule } from '@views/Student/Schedule';

export const metadata: Metadata = {
  title: 'Lịch theo tuần',
  description: 'Lịch theo tuần của sinh viên',
  openGraph: {
    description: 'Lịch theo tuần của sinh viên'
  }
};

function Index() {
  return <WeeklySchedule />;
}

export default Index;
