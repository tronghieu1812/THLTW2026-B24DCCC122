import { message, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { orders as initialOrders, products as initialProducts } from '../../models/duLieuMau';
import Dashboard from './components/Dashboard';
import DonHang from './components/OrderManagement';
import SanPham from './components/ProductManagement';
import { OrderItem, ProductItem } from './types';

const QuanLyBanHang = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [searchText, setSearchText] = useState('');
  const [, contextHolder] = message.useMessage();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    // Load products
    const savedData = localStorage.getItem('products_data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProducts(parsed);
      } else {
        setProducts(initialProducts);
        localStorage.setItem('products_data', JSON.stringify(initialProducts));
      }
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products_data', JSON.stringify(initialProducts));
    }

    // Load orders
    const savedOrders = localStorage.getItem('orders_data');
    if (savedOrders) {
      const parsed = JSON.parse(savedOrders);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setOrders(parsed);
      } else {
        setOrders(initialOrders);
        localStorage.setItem('orders_data', JSON.stringify(initialOrders));
      }
    } else {
      setOrders(initialOrders);
      localStorage.setItem('orders_data', JSON.stringify(initialOrders));
    }
  }, []);

  const saveProducts = (newData: ProductItem[]) => {
    setProducts(newData);
    localStorage.setItem('products_data', JSON.stringify(newData));
  };

  const saveOrders = (newOrders: OrderItem[]) => {
    setOrders(newOrders);
    localStorage.setItem('orders_data', JSON.stringify(newOrders));
  };

  return (
    <div style={{ padding: '24px' }}>
      {contextHolder}
      <Dashboard products={products} orders={orders} />
      <Tabs
        activeKey={activeTab}
        onChange={(key) => { setActiveTab(key); setSearchText(''); }}
      >
        <Tabs.TabPane tab="Sản phẩm" key="products">
          <SanPham
            data={products}
            onSave={saveProducts}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đơn hàng" key="orders">
          <DonHang
            orders={orders}
            products={products}
            onUpdateOrders={saveOrders}
            onUpdateProducts={saveProducts}
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default QuanLyBanHang;