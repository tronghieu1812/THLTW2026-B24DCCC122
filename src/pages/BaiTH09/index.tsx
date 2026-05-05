import React, { useState, useEffect } from 'react';

import Dashboard from './Dashboard';
import KanbanBoard from './KanbanBoard';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';

export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'todo' | 'doing' | 'done';
};

const BaiTH09: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = (task: Task) => {
    if (task.id) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      task.id = Date.now();
      setTasks([...tasks, task]);
    }
    setEditingTask(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Ứng dụng theo dõi công việc cá nhân</h1>
      <Dashboard tasks={tasks} />

      <TaskForm 
        onSave={addOrUpdateTask} 
        editingTask={editingTask} 
      />

      <KanbanBoard 
        tasks={tasks} 
        setTasks={setTasks} 
      />

      <TaskTable 
        tasks={tasks} 
        setEditingTask={setEditingTask} 
      />
    </div>
  );
};

export default BaiTH09; 