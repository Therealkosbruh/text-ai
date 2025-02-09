import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { AiModelInterface } from './ai-model.interface';
import { Gemini } from './model-classes/gemini.model';
import { ChatGPT } from './model-classes/chatgpt.model';

@Injectable()
export class AiServiceService {
    private models: AiModelInterface[];

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        const geminiApiKey = process.env.GEMINI_API_KEY;
        const openAiApiKey = process.env.OPENAI_API_KEY;

        if (!geminiApiKey) {
            throw new Error("GEMINI_API_KEY не установлен в .env файле");
        }
        if (!openAiApiKey) {
            throw new Error("OPENAI_API_KEY не установлен в .env файле");
        }

        this.models = [
            new Gemini(geminiApiKey),
            new ChatGPT(openAiApiKey),
        ];
    }

    private getModelByName(model_name: string): AiModelInterface {
        const model = this.models.find((model) => model.model_name === model_name);
        if (!model) {
            throw new BadRequestException('Модель не найдена!');
        }
        return model;
    }

    async askModel(userId: number, modelName: string, question: string, imageUrl?: string): Promise<string> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new BadRequestException('Пользователь не найден!');
        }

        const model = this.getModelByName(modelName);

        if(user.balance<model.getPrice()){
            throw new BadRequestException("Недостаточно средств на балансе");
        }

        try{
            const answer = await model.getAnswer(question,imageUrl);
            if(!answer){
                throw new Error("Пустой ответ от модели");
            }

            user.balance -= model.getPrice();
            await this.userRepository.save(user);
            return answer; 
        }catch(error){
            console.log("Ошибка генерации", error);
            throw new BadRequestException("Ошибка при обработке запроса");
        }
    }
}
