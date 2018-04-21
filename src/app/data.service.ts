import 'rxjs/add/operator/map';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Configuration} from './constants';
import {LectureToSend} from "./lectureToSend";

@Injectable()
export class DataService {
  private actionUrl: string;
  constructor(private http: HttpClient, private _configuration: Configuration) {
    this.actionUrl = _configuration.Server;
  }

  public getAll<Answer>(urlPlace: string): Observable<Answer> {
    return this.http.get<Answer>(this.actionUrl + urlPlace);
  }
  public post(lectureToSend: LectureToSend, urlPlace: string): Promise<LectureToSend> {
    console.log("DataService.postLecture()");
    return this.http.post(this.actionUrl + urlPlace, JSON.stringify(lectureToSend))
      .toPromise()
      .then(() => lectureToSend);
  }
}

/*@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    console.log(JSON.stringify(req.headers));
    return next.handle(req);
  }
}*/
