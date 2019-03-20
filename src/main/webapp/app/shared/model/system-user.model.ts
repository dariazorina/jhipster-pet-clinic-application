import { IDoctor } from 'app/shared/model/doctor.model';
import { IClient } from 'app/shared/model/client.model';
import { IAdmin } from 'app/shared/model/admin.model';

export interface ISystemUser {
    id?: number;
    login?: string;
    logo?: string;
    password?: string;
    deleted?: boolean;
    doctor?: IDoctor;
    doctor?: IClient;
    doctor?: IAdmin;
}

export class SystemUser implements ISystemUser {
    constructor(
        public id?: number,
        public login?: string,
        public logo?: string,
        public password?: string,
        public deleted?: boolean,
        public doctor?: IDoctor,
        public doctor?: IClient,
        public doctor?: IAdmin
    ) {
        this.deleted = this.deleted || false;
    }
}
