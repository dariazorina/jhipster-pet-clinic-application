import { Moment } from 'moment';
import { IDoctor } from 'app/shared/model/doctor.model';
import { IPet } from 'app/shared/model/pet.model';

export interface IAppointment {
    id?: number;
    date?: Moment;
    doctorId?: number;
    petId?: number;
    comment?: string;
    status?: string;
    doctor?: IDoctor;
    pet?: IPet;
}

export class Appointment implements IAppointment {
    constructor(
        public id?: number,
        public date?: Moment,
        public doctorId?: number,
        public petId?: number,
        public comment?: string,
        public status?: string,
        public doctor?: IDoctor,
        public pet?: IPet
    ) {}
}
