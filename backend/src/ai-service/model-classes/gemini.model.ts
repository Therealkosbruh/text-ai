import { AiModelInterface } from "../ai-model.interface";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class Gemini implements AiModelInterface {
    model_name = "gemini-pro";
    private genAi: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.genAi = new GoogleGenerativeAI(apiKey);
    }

    async getAnswer(question: string): Promise<string> {
        try {
            const model = this.genAi.getGenerativeModel({ model: this.model_name });
            const chat = model.startChat({
                history: [],
                generationConfig: {
                    maxOutputTokens: 500
                }
            });

            const result = await chat.sendMessage(question);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.log("Ошибка генерации", error);
            throw new Error("Ошибка при обработке запроса!");
        }
    }

    getPrice(): number {
        return 5;
    }
}
