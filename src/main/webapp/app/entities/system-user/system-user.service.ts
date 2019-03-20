import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISystemUser } from 'app/shared/model/system-user.model';

type EntityResponseType = HttpResponse<ISystemUser>;
type EntityArrayResponseType = HttpResponse<ISystemUser[]>;

@Injectable({ providedIn: 'root' })
export class SystemUserService {
    public resourceUrl = SERVER_API_URL + 'api/system-users';

    constructor(protected http: HttpClient) {}

    create(systemUser: ISystemUser): Observable<EntityResponseType> {
        return this.http.post<ISystemUser>(this.resourceUrl, systemUser, { observe: 'response' });
    }

    update(systemUser: ISystemUser): Observable<EntityResponseType> {
        return this.http.put<ISystemUser>(this.resourceUrl, systemUser, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISystemUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISystemUser[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
