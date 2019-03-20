/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhPetClinicTestModule } from '../../../test.module';
import { SystemUserUpdateComponent } from 'app/entities/system-user/system-user-update.component';
import { SystemUserService } from 'app/entities/system-user/system-user.service';
import { SystemUser } from 'app/shared/model/system-user.model';

describe('Component Tests', () => {
    describe('SystemUser Management Update Component', () => {
        let comp: SystemUserUpdateComponent;
        let fixture: ComponentFixture<SystemUserUpdateComponent>;
        let service: SystemUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhPetClinicTestModule],
                declarations: [SystemUserUpdateComponent]
            })
                .overrideTemplate(SystemUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SystemUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SystemUserService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SystemUser(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.systemUser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SystemUser();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.systemUser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
