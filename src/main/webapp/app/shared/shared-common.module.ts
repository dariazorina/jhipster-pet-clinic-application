import { NgModule } from '@angular/core';

import { JhPetClinicSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhPetClinicSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhPetClinicSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhPetClinicSharedCommonModule {}
