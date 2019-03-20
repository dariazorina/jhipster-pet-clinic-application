import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhPetClinicSharedModule } from 'app/shared';
import {
    DoctorComponent,
    DoctorDetailComponent,
    DoctorUpdateComponent,
    DoctorDeletePopupComponent,
    DoctorDeleteDialogComponent,
    doctorRoute,
    doctorPopupRoute
} from './';

const ENTITY_STATES = [...doctorRoute, ...doctorPopupRoute];

@NgModule({
    imports: [JhPetClinicSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [DoctorComponent, DoctorDetailComponent, DoctorUpdateComponent, DoctorDeleteDialogComponent, DoctorDeletePopupComponent],
    entryComponents: [DoctorComponent, DoctorUpdateComponent, DoctorDeleteDialogComponent, DoctorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhPetClinicDoctorModule {}
