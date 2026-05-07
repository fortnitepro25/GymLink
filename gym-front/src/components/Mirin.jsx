import { useState } from "react";

export default function Mirin() {
  const defaultLegends = [
    {
      name: "Zyzz",
      image: "https://i.imgur.com/6L89H7A.jpg",
      text: "We're all gonna make it brah 💪",
    },
    {
      name: "Arnold Schwarzenegger",
      image: "https://i.imgur.com/1bX5QH6.jpg",
      text: "Stay hungry. Stay foolish.",
    },
    {
      name: "Chris Bumstead",
      image: "https://i.imgur.com/JN6yRkY.jpg",
      text: "Consistency beats motivation.",
    },
    {
      name: "Ronnie Coleman",
      image: "https://i.imgur.com/Q7Z6z4v.jpg",
      text: "Yeah buddy! Light weight!",
    },
  ];

  const [cards, setCards] = useState(defaultLegends);
  const [index, setIndex] = useState(0);

  // input state omaa kuvaa varten
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");

  const next = () => {
    if (index < cards.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const addCard = () => {
    if (!name || !image) return;

    const newCard = { name, image, text };
    setCards([...cards, newCard]);

    setName("");
    setImage("");
    setText("");
  };

  const current = cards[index];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>💪 Mirin Board</h1>

      {/* NAV */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={prev} disabled={index === 0}>
          Edellinen
        </button>
        <button onClick={next} disabled={index === cards.length - 1}>
          Seuraava
        </button>
      </div>

      {/* CARD */}
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <img
          src={current.image}
          alt={current.name}
          style={{ width: "100%", borderRadius: "10px" }}
        />
        <h2>{current.name}</h2>
        <p>{current.text}</p>
      </div>

      {/* ADD NEW */}
      <div style={{ marginTop: "30px" }}>
        <h3>Lisää oma 💪</h3>

        <input
          type="text"
          placeholder="Nimi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="Kuvan URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />

        <input
          type="text"
          placeholder="Teksti (optional)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />

        <button onClick={addCard}>Lisää</button>
      </div>
    </div>
  );
}