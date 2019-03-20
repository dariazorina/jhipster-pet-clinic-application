import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SystemUser } from 'app/shared/model/system-user.model';
import { SystemUserService } from './system-user.service';
import { SystemUserComponent } from './system-user.component';
import { SystemUserDetailComponent } from './system-user-detail.component';
import { SystemUserUpdateComponent } from './system-user-update.component';
import { SystemUserDeletePopupComponent } from './system-user-delete-dialog.component';
import { ISystemUser } from 'app/shared/model/system-user.model';

@Injectable({ providedIn: 'root' })
export class SystemUserResolve implements Resolve<ISystemUser> {
    constructor(private service: SystemUserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISystemUser> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<SystemUser>) => response.ok),
                map((systemUser: HttpResponse<SystemUser>) => systemUser.body)
            );
        }
        return of(new SystemUser());
    }
}

export const systemUserRoute: Routes = [
    {
        path: '',
        component: SystemUserComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SystemUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SystemUserDetailComponent,
        resolve: {
            systemUser: SystemUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SystemUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SystemUserUpdateComponent,
        resolve: {
            systemUser: SystemUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SystemUsers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SystemUserUpdateComponent,
        resolve: {
            systemUser: SystemUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SystemUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const systemUserPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SystemUserDeletePopupComponent,
        resolve: {
            systemUser: SystemUserResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SystemUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
