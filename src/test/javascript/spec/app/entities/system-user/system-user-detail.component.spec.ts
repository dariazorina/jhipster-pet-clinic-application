/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhPetClinicTestModule } from '../../../test.module';
import { SystemUserDetailComponent } from 'app/entities/system-user/system-user-detail.component';
import { SystemUser } from 'app/shared/model/system-user.model';

describe('Component Tests', () => {
    describe('SystemUser Management Detail Component', () => {
        let comp: SystemUserDetailComponent;
        let fixture: ComponentFixture<SystemUserDetailComponent>;
        const route = ({ data: of({ systemUser: new SystemUser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhPetClinicTestModule],
                declarations: [SystemUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SystemUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SystemUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.systemUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
