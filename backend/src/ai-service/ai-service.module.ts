import { Module } from '@nestjs/common';
import { AiServiceService } from './ai-service.service';
import { AiServiceController } from './ai-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';


@Module({
 imports: [TypeOrmModule.forFeature([User])],
  providers: [AiServiceService], // add classes witch contain realization of the ai chats
  controllers: [AiServiceController]
})
export class AiServiceModule {}
