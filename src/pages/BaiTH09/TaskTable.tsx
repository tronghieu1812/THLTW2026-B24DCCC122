import React, { useState } from 'react';
import { Table, Input, Tag, Button } from 'antd';
import { Task } from './index';

type Props = {
  tasks: Task[];
  setEditingTask: (task: Task) => void;
};

const TaskTable: React.FC<Props> = ({ tasks, setEditingTask }) => {
  const [search, setSearch] = useState('');

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      render: (p: string) => (
        <Tag color={
          p === 'High' ? 'red' :
          p === 'Medium' ? 'orange' : 'green'
        }>
          {p}
        </Tag>
      ),
    },
    {
      title: 'Action',
      render: (_: any, record: Task) => (
        <Button onClick={() => setEditingTask(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Task List</h2>

      <Input
        placeholder="Search..."
        style={{ marginBottom: 10 }}
        onChange={e => setSearch(e.target.value)}
      />

      <Table rowKey="id" columns={columns} dataSource={filtered} />
    </div>
  );
};

export default TaskTable;