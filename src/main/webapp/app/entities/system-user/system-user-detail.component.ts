import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISystemUser } from 'app/shared/model/system-user.model';

@Component({
    selector: 'jhi-system-user-detail',
    templateUrl: './system-user-detail.component.html'
})
export class SystemUserDetailComponent implements OnInit {
    systemUser: ISystemUser;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ systemUser }) => {
            this.systemUser = systemUser;
        });
    }

    previousState() {
        window.history.back();
    }
}
