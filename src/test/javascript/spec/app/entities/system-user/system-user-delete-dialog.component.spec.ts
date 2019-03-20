/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhPetClinicTestModule } from '../../../test.module';
import { SystemUserDeleteDialogComponent } from 'app/entities/system-user/system-user-delete-dialog.component';
import { SystemUserService } from 'app/entities/system-user/system-user.service';

describe('Component Tests', () => {
    describe('SystemUser Management Delete Component', () => {
        let comp: SystemUserDeleteDialogComponent;
        let fixture: ComponentFixture<SystemUserDeleteDialogComponent>;
        let service: SystemUserService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhPetClinicTestModule],
                declarations: [SystemUserDeleteDialogComponent]
            })
                .overrideTemplate(SystemUserDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SystemUserDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SystemUserService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
