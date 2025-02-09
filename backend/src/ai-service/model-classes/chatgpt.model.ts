import OpenAI from "openai";
import { AiModelInterface } from "../ai-model.interface";

export class ChatGPT implements AiModelInterface {
    model_name = "gpt-4-vision-preview";
    private openai: OpenAI;
    private chatHistory: { role: "user" | "assistant"; content: string | any }[] = [];

    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async getAnswer(question: string, imageUrl?: string): Promise<string> {
        try {
            let messages: any[] = [...this.chatHistory];

            if (imageUrl) {
                messages.push({
                    role: "user",
                    content: [
                        { type: "text", text: question },
                        { type: "image_url", image_url: { url: imageUrl } }
                    ]
                });
            } else {
                messages.push({ role: "user", content: question });
            }

            const response = await this.openai.chat.completions.create({
                model: this.model_name,
                messages,
                max_tokens: 500,
            });

            const answer = response.choices[0]?.message?.content || "Ошибка получения ответа";

            this.chatHistory.push({ role: "user", content: question });
            this.chatHistory.push({ role: "assistant", content: answer });

            return answer;
        } catch (error) {
            console.error("Ошибка при генерации ответа:", error);
            throw new Error("Ошибка обработки запроса");
        }
    }

    getPrice(): number {
        return 5;
    }
}
