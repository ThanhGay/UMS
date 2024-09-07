'use client';

import { useAppSelector } from '@redux/hooks';

function HomePage() {
  const { user } = useAppSelector((state) => state.authState);
  return (
    <div>
      Home Page
      <div>Welcome {user?.fullName}</div>
    </div>
  );
}

export default HomePage;
