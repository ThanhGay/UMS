'use client';

import { useAppSelector } from '@redux/hooks';

function HomePageTeacher() {
  const { user } = useAppSelector((state) => state.authState);
  console.log(user);

  return (
    <div>
      Home Page
      <div>Welcome {user?.tenGiangVien}</div>
    </div>
  );
}

export default HomePageTeacher;
