import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISystemUser } from 'app/shared/model/system-user.model';
import { AccountService } from 'app/core';
import { SystemUserService } from './system-user.service';

@Component({
    selector: 'jhi-system-user',
    templateUrl: './system-user.component.html'
})
export class SystemUserComponent implements OnInit, OnDestroy {
    systemUsers: ISystemUser[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected systemUserService: SystemUserService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.systemUserService
            .query()
            .pipe(
                filter((res: HttpResponse<ISystemUser[]>) => res.ok),
                map((res: HttpResponse<ISystemUser[]>) => res.body)
            )
            .subscribe(
                (res: ISystemUser[]) => {
                    this.systemUsers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSystemUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISystemUser) {
        return item.id;
    }

    registerChangeInSystemUsers() {
        this.eventSubscriber = this.eventManager.subscribe('systemUserListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
