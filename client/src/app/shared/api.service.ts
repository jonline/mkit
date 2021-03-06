import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import config from '../config';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {

  private baseUrl = config.api.base;

  constructor(private http: Http, private auth: AuthService) { }

  get (url: string) {
    return this.request(url, RequestMethod.Get);
  }

  post (url: string, body: Object) {
    return this.request(url, RequestMethod.Post, body);
  }

  put (url: string, body: Object) {
    return this.request(url, RequestMethod.Put, body);
  }

  delete (url: string) {
    return this.request(url, RequestMethod.Delete);
  }

  request (url: string, method: RequestMethod, body?: Object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.auth.token}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers
    });

    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
  }

  onRequestError (res: Response) {
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    console.log(error);

    return Observable.throw(error);
  }
}
