import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IAppointment } from 'app/shared/model/appointment.model';
import { AppointmentService } from './appointment.service';
import { IDoctor } from 'app/shared/model/doctor.model';
import { DoctorService } from 'app/entities/doctor';
import { IPet } from 'app/shared/model/pet.model';
import { PetService } from 'app/entities/pet';

@Component({
    selector: 'jhi-appointment-update',
    templateUrl: './appointment-update.component.html'
})
export class AppointmentUpdateComponent implements OnInit {
    appointment: IAppointment;
    isSaving: boolean;

    doctors: IDoctor[];

    pets: IPet[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected appointmentService: AppointmentService,
        protected doctorService: DoctorService,
        protected petService: PetService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ appointment }) => {
            this.appointment = appointment;
        });
        this.doctorService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDoctor[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDoctor[]>) => response.body)
            )
            .subscribe((res: IDoctor[]) => (this.doctors = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.petService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPet[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPet[]>) => response.body)
            )
            .subscribe((res: IPet[]) => (this.pets = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.appointment.id !== undefined) {
            this.subscribeToSaveResponse(this.appointmentService.update(this.appointment));
        } else {
            this.subscribeToSaveResponse(this.appointmentService.create(this.appointment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointment>>) {
        result.subscribe((res: HttpResponse<IAppointment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPetById(index: number, item: IPet) {
        return item.id;
    }
}
