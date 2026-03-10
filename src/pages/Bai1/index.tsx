import { useState } from "react";

type Choice = "Kéo" | "Búa" | "Bao";

interface History {
  player: Choice;
  computer: Choice;
  result: string;
}

const choices: Choice[] = ["Kéo", "Búa", "Bao"];

export default function App() {
  const [history, setHistory] = useState<History[]>([]);

  const getComputerChoice = (): Choice => {
    const random = Math.floor(Math.random() * choices.length);
    return choices[random];
  };

  const getResult = (player: Choice, computer: Choice): string => {
    if (player === computer) return "Hòa";

    if (
      (player === "Kéo" && computer === "Bao") ||
      (player === "Búa" && computer === "Kéo") ||
      (player === "Bao" && computer === "Búa")
    ) {
      return "Thắng";
    }

    return "Thua";
  };

  const playGame = (playerChoice: Choice) => {
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    const newRound: History = {
      player: playerChoice,
      computer: computerChoice,
      result: result,
    };

    setHistory([newRound, ...history]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Trò chơi Oẳn Tù Tì</h1>

      <div>
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => playGame(choice)}
            style={{ margin: "10px", padding: "10px 20px" }}
          >
            {choice}
          </button>
        ))}
      </div>

      <h2>Lịch sử ván đấu</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Máy</th>
            <th>Kết quả</th>
          </tr>
        </thead>
        <tbody>
          {history.map((round, index) => (
            <tr key={index}>
              <td>{round.player}</td>
              <td>{round.computer}</td>
              <td>{round.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}