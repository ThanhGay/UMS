import { Metadata } from 'next';
import MyCtk from '@views/Student/Ctk';

export const metadata: Metadata = {
  title: 'Chương trình khung',
  description: 'Chương trình khung theo chuyên ngành của sinh viên',
  openGraph: {
    description: 'Chương trình khung theo chuyên ngành của sinh viên'
  }
};

function Index() {
  return <MyCtk />;
}

export default Index;
