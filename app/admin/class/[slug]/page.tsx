'use client';

import { useParams } from 'next/navigation';
import DetailClassHP from '@views/Admin/LopHP/DetailClassHP';

function Index() {
  const { slug: id } = useParams();
  return <DetailClassHP lhpId={id} />;
}

export default Index;
