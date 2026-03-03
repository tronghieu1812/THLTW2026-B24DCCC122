import React, { useState } from "react";
import { Card, Input, Button, Typography } from "antd";

const { Title, Text } = Typography;

export default function Bai1() {
  // Sinh số ngẫu nhiên 1-100 khi bắt đầu
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );

  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [remainingTurns, setRemainingTurns] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuess = () => {
    if (!guess || isGameOver) return;

    const userNumber = parseInt(guess);

    // Nếu đã hết lượt
    if (remainingTurns === 1 && userNumber !== randomNumber) {
      setMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}`);
      setRemainingTurns(0);
      setIsGameOver(true);
      return;
    }

    if (userNumber === randomNumber) {
      setMessage("Chúc mừng! Bạn đã đoán đúng!");
      setIsGameOver(true);
    } else if (userNumber < randomNumber) {
      setMessage("Bạn đoán quá thấp!");
      setRemainingTurns(remainingTurns - 1);
    } else {
      setMessage("Bạn đoán quá cao!");
      setRemainingTurns(remainingTurns - 1);
    }

    setGuess("");
  };

  const handleReset = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setRemainingTurns(10);
    setIsGameOver(false);
  };

  return (
    <Card style={{ maxWidth: 500 }}>
      <Title level={3}>Trò Chơi Đoán Số</Title>

      <Text>Hệ thống đã chọn một số từ 1 đến 100.</Text>
      <br /><br />

      <Input
        type="number"
        placeholder="Nhập số bạn đoán..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={isGameOver}
      />

      <br /><br />

      <Button type="primary" onClick={handleGuess} disabled={isGameOver}>
        Đoán
      </Button>

      <Button style={{ marginLeft: 10 }} onClick={handleReset}>
        Chơi lại
      </Button>

      <br /><br />

      <Text strong>Số lượt còn lại: {remainingTurns}</Text>

      <br /><br />

      <Text>{message}</Text>
    </Card>
  );
}