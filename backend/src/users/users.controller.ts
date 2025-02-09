import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post('register')
    async register(
        @Body('user_name') user_name: string,
        @Body('user_password') user_password: string
    ){
        const existingUser = await this.userService.findUserByUsername(user_name);
        if(existingUser){
            throw new BadRequestException("Пользователь с таки никнеймом уже существует, измените его и повторите попытку.");
        }
        const user = await this.userService.createUser(user_name, user_password);
        return {message: 'Пользователь успешно создан!', user};
    }

    @Post('login')
    async login(
        @Body('user_name') user_name: string,
        @Body('user_password') user_password: string
    ){
        const user = await this.userService.validateUser(user_name,user_password);
        if(!user){
            throw new BadRequestException("Неверное имя пользователя или пароль");
        }
        const token = await this.userService.generateJwt(user);
        return{message: 'Вход успешен', token};
    }
}
