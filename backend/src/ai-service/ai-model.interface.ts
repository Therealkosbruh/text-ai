export interface AiModelInterface{
    model_name: string; 
    getAnswer(question: string, imageUrl?:string): Promise<string>;
    getPrice():number;
}