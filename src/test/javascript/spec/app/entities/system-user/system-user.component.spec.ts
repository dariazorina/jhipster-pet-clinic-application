/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhPetClinicTestModule } from '../../../test.module';
import { SystemUserComponent } from 'app/entities/system-user/system-user.component';
import { SystemUserService } from 'app/entities/system-user/system-user.service';
import { SystemUser } from 'app/shared/model/system-user.model';

describe('Component Tests', () => {
    describe('SystemUser Management Component', () => {
        let comp: SystemUserComponent;
        let fixture: ComponentFixture<SystemUserComponent>;
        let service: SystemUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhPetClinicTestModule],
                declarations: [SystemUserComponent],
                providers: []
            })
                .overrideTemplate(SystemUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SystemUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SystemUserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SystemUser(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.systemUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
