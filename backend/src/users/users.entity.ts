import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    user_name: string;
    
    @Column()
    user_password: string
    
    @Column({type:'int', default: 0})
    balance: number
}