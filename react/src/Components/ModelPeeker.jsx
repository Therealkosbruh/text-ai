import React, { useState, useEffect } from "react";
import styles from "../css/modelpeeker.module.css";

const models = [
  { name: "Google Gemini", cost: 5 },
  { name: "OpenAi GPT-4", cost: 10 },
  { name: "Anthropic Claude", cost: 7 },
  { name: "Mistral AI", cost: 4 },
  { name: "Meta Llama", cost: 6 },
];

export default function ModelPeeker() {
  const [animatedText, setAnimatedText] = useState("");
  const [selectedModel, setSelectedModel] = useState(null); 
  const welcomeText = "Добро пожаловать!";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setAnimatedText(welcomeText.slice(0, i + 1));
      i++;
      if (i === welcomeText.length) {
        clearInterval(interval);
      }
    }, 85);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.welcome}>{animatedText}</h1>
      <p className={styles.subText}>
        {selectedModel ? `Модель: ${selectedModel}` : "Выберите модель для генерации ответов"}
      </p>

      <div className={styles.modelsContainer}>
        {models.map((model, index) => (
          <div
            key={index}
            className={styles.modelCard}
            onClick={() => setSelectedModel(model.name)} 
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
              className={styles.icon}
            >
              <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
            </svg>
            <h3 className={styles.modelName}>{model.name}</h3>
            <p className={styles.cost}>Стоимость ответа: {model.cost}⭐️</p>
          </div>
        ))}
      </div>
    </div>
  );
}
