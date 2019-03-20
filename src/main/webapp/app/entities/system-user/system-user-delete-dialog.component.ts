import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISystemUser } from 'app/shared/model/system-user.model';
import { SystemUserService } from './system-user.service';

@Component({
    selector: 'jhi-system-user-delete-dialog',
    templateUrl: './system-user-delete-dialog.component.html'
})
export class SystemUserDeleteDialogComponent {
    systemUser: ISystemUser;

    constructor(
        protected systemUserService: SystemUserService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.systemUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'systemUserListModification',
                content: 'Deleted an systemUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-system-user-delete-popup',
    template: ''
})
export class SystemUserDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ systemUser }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SystemUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.systemUser = systemUser;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/system-user', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/system-user', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
