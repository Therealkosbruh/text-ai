import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bycript from 'bcryptjs';
import { User } from './users.entity';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'crypto';
import { BlobOptions } from 'buffer';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async createUser(user_name: string, user_password: string): Promise<User> {
        this.isPasswordStrong(user_password); 
      
        const hashedPassword = await bycript.hash(user_password, 10);
      
        const user = new User();
        user.user_name = user_name;
        user.user_password = hashedPassword;
      
        return await this.userRepository.save(user);
      }
      

    private isPasswordStrong(password: string): void {
        const passwordRequirements = [
          { regex: /^(?=.*[A-Z])/, message: 'Пароль должен содержать хотя бы одну заглавную букву.' },
          { regex: /^(?=.*[a-z])/, message: 'Пароль должен содержать хотя бы одну строчную букву.' },
          { regex: /^(?=.*\d)/, message: 'Пароль должен содержать хотя бы одну цифру.' },
          { regex: /^(?=.*[@$!%*?&])/, message: 'Пароль должен содержать хотя бы один специальный символ (@$!%*?&).' },
          { regex: /^.{8,}$/, message: 'Пароль должен содержать минимум 8 символов.' },
        ];
      
        
        for (const { regex, message } of passwordRequirements) {
          if (!regex.test(password)) {
            throw new BadRequestException(message); 
          }
        }
      }
      

    async findUserByUsername(user_name: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { user_name } });
      }

    async validateUser(user_name:string, user_password:string): Promise<any>{
        const user = await this.findUserByUsername(user_name);
        if(user && await bycript.compare(user_password, user.user_password)){
            return {id: user.id, user_name: user.user_name};
        }
        return null;
    }
    
    async generateJwt(user: User){
        const payload = {username: user.user_name, sub: user.id};
        return this.jwtService.sign(payload);
    }
}