import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhPetClinicSharedModule } from 'app/shared';
import {
    SystemUserComponent,
    SystemUserDetailComponent,
    SystemUserUpdateComponent,
    SystemUserDeletePopupComponent,
    SystemUserDeleteDialogComponent,
    systemUserRoute,
    systemUserPopupRoute
} from './';

const ENTITY_STATES = [...systemUserRoute, ...systemUserPopupRoute];

@NgModule({
    imports: [JhPetClinicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SystemUserComponent,
        SystemUserDetailComponent,
        SystemUserUpdateComponent,
        SystemUserDeleteDialogComponent,
        SystemUserDeletePopupComponent
    ],
    entryComponents: [SystemUserComponent, SystemUserUpdateComponent, SystemUserDeleteDialogComponent, SystemUserDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhPetClinicSystemUserModule {}
