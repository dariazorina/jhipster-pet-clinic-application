import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'system-user',
                loadChildren: './system-user/system-user.module#JhPetClinicSystemUserModule'
            },
            {
                path: 'admin',
                loadChildren: './admin/admin.module#JhPetClinicAdminModule'
            },
            {
                path: 'client',
                loadChildren: './client/client.module#JhPetClinicClientModule'
            },
            {
                path: 'doctor',
                loadChildren: './doctor/doctor.module#JhPetClinicDoctorModule'
            },
            {
                path: 'appointment',
                loadChildren: './appointment/appointment.module#JhPetClinicAppointmentModule'
            },
            {
                path: 'pet',
                loadChildren: './pet/pet.module#JhPetClinicPetModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhPetClinicEntityModule {}
