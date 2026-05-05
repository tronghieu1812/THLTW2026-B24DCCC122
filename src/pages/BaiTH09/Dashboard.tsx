import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { Task } from './index';

type Props = {
  tasks: Task[];
};

const Dashboard: React.FC<Props> = ({ tasks }) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const overdue = tasks.filter(
    t => new Date(t.deadline) < new Date() && t.status !== 'done'
  ).length;

  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>
      <Col span={8}>
        <Card>
          <Statistic title="Total Tasks" value={total} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Completed" value={done} valueStyle={{ color: 'green' }} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic title="Overdue" value={overdue} valueStyle={{ color: 'red' }} />
        </Card>
      </Col>
    </Row>
  );
};

export default Dashboard;