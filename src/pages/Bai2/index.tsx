import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  List,
  Typography,
  DatePicker,
  InputNumber,
} from "antd";
import type { Moment } from "moment";

const { Title, Text } = Typography;

interface Schedule {
  time: Moment | null;
  duration: number;
  content: string;
  note: string;
}

interface Subject {
  name: string;
  schedules: Schedule[];
}

const Bai2: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState<string>("");

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [studyTime, setStudyTime] = useState<Moment | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [content, setContent] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [monthlyGoal, setMonthlyGoal] = useState<number>(0);

  // Load localStorage
  useEffect(() => {
    const data = localStorage.getItem("studyData");
    if (data) {
      const parsed = JSON.parse(data);
      setSubjects(parsed.subjects || []);
      setMonthlyGoal(parsed.monthlyGoal || 0);
    }
  }, []);

  // Save localStorage
  useEffect(() => {
    localStorage.setItem(
      "studyData",
      JSON.stringify({ subjects, monthlyGoal })
    );
  }, [subjects, monthlyGoal]);

  // Thêm môn học
  const addSubject = () => {
    if (!newSubject.trim()) return;

    setSubjects([...subjects, { name: newSubject, schedules: [] }]);
    setNewSubject("");
  };

  // Xoá môn học
  const deleteSubject = (index: number) => {
    const updated = [...subjects];
    updated.splice(index, 1);
    setSubjects(updated);
    setSelectedSubject(null);
  };

  // Thêm lịch học
  const addSchedule = () => {
    if (!selectedSubject || !studyTime) return;

    const updated = subjects.map((s) => {
      if (s.name === selectedSubject) {
        return {
          ...s,
          schedules: [
            ...s.schedules,
            {
              time: studyTime,
              duration,
              content,
              note,
            },
          ],
        };
      }
      return s;
    });

    setSubjects(updated);
    setStudyTime(null);
    setDuration(null);
    setContent("");
    setNote("");
  };

  // Tổng giờ tháng hiện tại
  const totalStudyTime = subjects.reduce((total, s) => {
    return (
      total +
      s.schedules.reduce((sum, sch) => {
        if (
          sch.time &&
          sch.time.month() === new Date().getMonth()
        ) {
          return sum + sch.duration;
        }
        return sum;
      }, 0)
    );
  }, 0);

  return (
    <Card>
      <Title level={3}>Quản Lý Học Tập</Title>

      {/* Thêm môn */}
      <Title level={5}>Thêm môn học</Title>
      <Input
        placeholder="Nhập tên môn..."
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        style={{ width: 300 }}
      />
      <Button type="primary" onClick={addSubject} style={{ marginLeft: 10 }}>
        Thêm
      </Button>

      <List
        bordered
        dataSource={subjects}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button danger onClick={() => deleteSubject(index)}>
                Xoá
              </Button>,
              <Button onClick={() => setSelectedSubject(item.name)}>
                Chọn
              </Button>,
            ]}
          >
            {item.name}
          </List.Item>
        )}
        style={{ marginTop: 20 }}
      />

      {/* Thêm lịch học */}
      {selectedSubject && (
        <>
          <Title level={5} style={{ marginTop: 30 }}>
            Thêm lịch học cho: {selectedSubject}
          </Title>

          <DatePicker
            showTime
            value={studyTime}
            onChange={(value) => setStudyTime(value)}
          />

          <InputNumber
  placeholder="Thời lượng (giờ)"
  value={duration}
  min={0}              // ❌ không cho số âm
  onChange={(value) => setDuration(value)}
/>

          <Input
            placeholder="Nội dung học"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ marginTop: 10 }}
          />

          <Input
            placeholder="Ghi chú"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ marginTop: 10 }}
          />

          <Button
            type="primary"
            onClick={addSchedule}
            style={{ marginTop: 10 }}
          >
            Thêm lịch học
          </Button>
        </>
      )}

      {/* Mục tiêu tháng */}
      <Title level={5} style={{ marginTop: 30 }}>
        Mục tiêu học tập tháng (tổng giờ)
      </Title>

      <InputNumber
  value={monthlyGoal}
  min={0}                       // ❌ không cho số âm
  onChange={(value) => setMonthlyGoal(value ?? 0)}
/>

      <div style={{ marginTop: 10 }}>
        <Text>Tổng giờ đã học tháng này: {totalStudyTime}</Text>
        <br />
        <Text strong>
          Trạng thái:{" "}
          {totalStudyTime >= monthlyGoal
            ? "Đã đạt mục tiêu ✅"
            : "Chưa đạt mục tiêu ❌"}
        </Text>
      </div>
    </Card>
  );
};

export default Bai2;