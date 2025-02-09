import { Controller, Post, Body, Param } from '@nestjs/common';
import { AiServiceService } from './ai-service.service';
import { BadRequestException } from '@nestjs/common';

@Controller('ai-service')
export class AiServiceController {
    constructor(private readonly aiService: AiServiceService){}

    @Post(':modelName/ask')
    async ask(
        @Param('modelName') modelName: string,
        @Body('userId') userId: number,
        @Body('question') question: string,
        @Body('imageUrl') imageUrl: string,
    ){
        try{
            const answer = await this.aiService.askModel(userId, modelName, question, imageUrl);
            return {message: 'Ответ от нееросети', answer};
        } catch (error){
            throw new BadRequestException("Ошибка", error.message);
        }
    }
}
