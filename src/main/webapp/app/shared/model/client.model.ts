import { IPet } from 'app/shared/model/pet.model';

export interface IClient {
    id?: number;
    name?: string;
    address?: string;
    phone?: string;
    pets?: IPet[];
}

export class Client implements IClient {
    constructor(public id?: number, public name?: string, public address?: string, public phone?: string, public pets?: IPet[]) {}
}
