import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AiServiceModule } from './ai-service/ai-service.module';
import CONNECTION from './dbconnection';

@Module({
  imports: [
    //@ts-ignore
    TypeOrmModule.forRoot({
    ...CONNECTION,
    synchronize: false,
    autoLoadEntities: true,
  }),
    UsersModule,
    AiServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
