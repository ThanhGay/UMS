import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kết quả học tập',
  description: 'Kết quả học tập của sinh viên',
  openGraph: {
    description: 'Kết quả học tập của sinh viên'
  }
};

function Index() {
  return <div>Kết quả học tập</div>;
}

export default Index;
