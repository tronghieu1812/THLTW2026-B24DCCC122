import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button, Card } from 'antd';
import dayjs from 'dayjs';
import { Task } from './index';

type Props = {
  onSave: (task: Task) => void;
  editingTask: Task | null;
};

const TaskForm: React.FC<Props> = ({ onSave, editingTask }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        ...editingTask,
        deadline: editingTask.deadline ? dayjs(editingTask.deadline) : null,
      });
    }
  }, [editingTask]);

  const onFinish = (values: any) => {
    const task: Task = {
      id: editingTask?.id || 0,
      title: values.title,
      description: '',
      deadline: values.deadline.format('YYYY-MM-DD'),
      priority: values.priority,
      status: editingTask?.status || 'todo',
    };

    onSave(task);
    form.resetFields();
  };

  return (
    <Card title="Add / Edit Task" style={{ marginBottom: 20 }}>
      <Form form={form} layout="inline" onFinish={onFinish}>
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item name="deadline" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="priority" initialValue="Medium">
          <Select style={{ width: 120 }}>
            <Select.Option value="High">High</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Low">Low</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;