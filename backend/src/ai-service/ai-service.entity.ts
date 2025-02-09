import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class AiModel{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    model_name: string;

    @Column({type:'int'})
    price_per_answer: number;

    getPrice(): number {
        return this.price_per_answer;
      }
}