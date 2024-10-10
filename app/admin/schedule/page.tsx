import React from 'react';
import { Calendar } from 'antd';

const Index: React.FC = () => {
  return (
    <div className="p-8">
      <Calendar mode="month" style={{ padding: 12 }} />
    </div>
  );
};

export default Index;
