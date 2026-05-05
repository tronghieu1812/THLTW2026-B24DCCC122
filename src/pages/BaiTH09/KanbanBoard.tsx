import React from 'react';
import { Card, Col, Row, Tag } from 'antd';
import { Task } from './index';

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const KanbanBoard: React.FC<Props> = ({ tasks, setTasks }) => {
  const updateStatus = (id: number, status: Task['status']) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
  };

  const renderColumn = (status: Task['status'], title: string) => (
    <Col span={8}>
      <h3>{title}</h3>
      {tasks.filter(t => t.status === status).map(t => (
        <Card
          key={t.id}
          style={{ marginBottom: 10 }}
          onClick={() => {
            const next =
              status === 'todo' ? 'doing' :
              status === 'doing' ? 'done' : 'todo';
            updateStatus(t.id, next);
          }}
        >
          <p><b>{t.title}</b></p>
          <p>{t.deadline}</p>
          <Tag color={
            t.priority === 'High' ? 'red' :
            t.priority === 'Medium' ? 'orange' : 'green'
          }>
            {t.priority}
          </Tag>
        </Card>
      ))}
    </Col>
  );

  return (
    <Row gutter={16} style={{ marginBottom: 20 }}>
      {renderColumn('todo', 'Cần làm')}
      {renderColumn('doing', 'Đang làm')}
      {renderColumn('done', 'Hoàn thành')}
    </Row>
  );
};

export default KanbanBoard;