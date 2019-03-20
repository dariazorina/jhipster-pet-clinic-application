import { IAppointment } from 'app/shared/model/appointment.model';

export interface IDoctor {
    id?: number;
    name?: string;
    specialization?: string;
    phone?: string;
    age?: number;
    appointments?: IAppointment[];
}

export class Doctor implements IDoctor {
    constructor(
        public id?: number,
        public name?: string,
        public specialization?: string,
        public phone?: string,
        public age?: number,
        public appointments?: IAppointment[]
    ) {}
}
