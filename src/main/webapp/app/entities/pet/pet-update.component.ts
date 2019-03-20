import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPet } from 'app/shared/model/pet.model';
import { PetService } from './pet.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';

@Component({
    selector: 'jhi-pet-update',
    templateUrl: './pet-update.component.html'
})
export class PetUpdateComponent implements OnInit {
    pet: IPet;
    isSaving: boolean;

    clients: IClient[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected petService: PetService,
        protected clientService: ClientService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pet }) => {
            this.pet = pet;
        });
        this.clientService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClient[]>) => response.body)
            )
            .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pet.id !== undefined) {
            this.subscribeToSaveResponse(this.petService.update(this.pet));
        } else {
            this.subscribeToSaveResponse(this.petService.create(this.pet));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPet>>) {
        result.subscribe((res: HttpResponse<IPet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClientById(index: number, item: IClient) {
        return item.id;
    }
}
