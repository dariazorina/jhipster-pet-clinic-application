import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISystemUser } from 'app/shared/model/system-user.model';
import { SystemUserService } from './system-user.service';
import { IDoctor } from 'app/shared/model/doctor.model';
import { DoctorService } from 'app/entities/doctor';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { IAdmin } from 'app/shared/model/admin.model';
import { AdminService } from 'app/entities/admin';

@Component({
    selector: 'jhi-system-user-update',
    templateUrl: './system-user-update.component.html'
})
export class SystemUserUpdateComponent implements OnInit {
    systemUser: ISystemUser;
    isSaving: boolean;

    doctors: IDoctor[];

    doctors: IClient[];

    doctors: IAdmin[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected systemUserService: SystemUserService,
        protected doctorService: DoctorService,
        protected clientService: ClientService,
        protected adminService: AdminService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ systemUser }) => {
            this.systemUser = systemUser;
        });
        this.doctorService
            .query({ filter: 'systemuser-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDoctor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDoctor[]>) => response.body)
            )
            .subscribe(
                (res: IDoctor[]) => {
                    if (!this.systemUser.doctor || !this.systemUser.doctor.id) {
                        this.doctors = res;
                    } else {
                        this.doctorService
                            .find(this.systemUser.doctor.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDoctor>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDoctor>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDoctor) => (this.doctors = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.clientService
            .query({ filter: 'systemuser-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClient[]>) => response.body)
            )
            .subscribe(
                (res: IClient[]) => {
                    if (!this.systemUser.doctor || !this.systemUser.doctor.id) {
                        this.doctors = res;
                    } else {
                        this.clientService
                            .find(this.systemUser.doctor.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IClient>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IClient>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IClient) => (this.doctors = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.adminService
            .query({ filter: 'systemuser-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IAdmin[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAdmin[]>) => response.body)
            )
            .subscribe(
                (res: IAdmin[]) => {
                    if (!this.systemUser.doctor || !this.systemUser.doctor.id) {
                        this.doctors = res;
                    } else {
                        this.adminService
                            .find(this.systemUser.doctor.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IAdmin>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IAdmin>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IAdmin) => (this.doctors = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.systemUser.id !== undefined) {
            this.subscribeToSaveResponse(this.systemUserService.update(this.systemUser));
        } else {
            this.subscribeToSaveResponse(this.systemUserService.create(this.systemUser));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISystemUser>>) {
        result.subscribe((res: HttpResponse<ISystemUser>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDoctorById(index: number, item: IDoctor) {
        return item.id;
    }

    trackClientById(index: number, item: IClient) {
        return item.id;
    }

    trackAdminById(index: number, item: IAdmin) {
        return item.id;
    }
}
