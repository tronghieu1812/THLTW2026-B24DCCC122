import React from 'react';
import { Tabs } from 'antd';

import Bai1 from '@/pages/Bai1';
import Bai2 from '@/pages/Bai2';

const { TabPane } = Tabs;

const Products: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1>Products</h1>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Bài 1 - Quản lý bán hàng" key="1">
          <Bai1 />
        </TabPane>

        <TabPane tab="Bài 2" key="2">
          <Bai2 />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Products;
