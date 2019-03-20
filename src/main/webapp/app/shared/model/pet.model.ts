import { IClient } from 'app/shared/model/client.model';
import { IAppointment } from 'app/shared/model/appointment.model';

export interface IPet {
    id?: number;
    name?: string;
    clientId?: number;
    age?: number;
    species?: string;
    client?: IClient;
    appointments?: IAppointment[];
}

export class Pet implements IPet {
    constructor(
        public id?: number,
        public name?: string,
        public clientId?: number,
        public age?: number,
        public species?: string,
        public client?: IClient,
        public appointments?: IAppointment[]
    ) {}
}
