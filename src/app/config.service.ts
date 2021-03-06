import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ConfigService {
  API_ENDPOINT = 'http://0.0.0.0:8000/'
  constructor(private http: HttpClient) { }

  signup(data:any){

    return new Promise(resolve => {
        this.http.post(
          this.API_ENDPOINT + 'api/v1/auth/company_register',
          data,
          {
            headers: {'organisation':'ondotfreight'}
          }
        ).subscribe((data: any) => {
            if (data.success) {
              resolve(data.data);
            } else {
              resolve(false);
            }
          },
          error => {
            resolve(true);
          });
      });
  }

  authenticatelogin(data:any) {
    return new Promise(resolve => {
      this.http.post(
        this.API_ENDPOINT + 'api/v1/auth/login',
        data
      ).subscribe((data: any) => {
          if (data.success) {
            resolve(data.data);
          } else {
            resolve(false);
          }
        },
        error => {
          resolve(true);
        });
    });
  }

  submit(data){
    return new Promise(resolve => {
        this.http.post(
          this.API_ENDPOINT + 'api/v1/incollection/quotation',
          data
        ).subscribe((data: any) => {
            if (data.success) {
              resolve(data.data);
            } else {
              resolve(false);
            }
          },
          error => {
            resolve(true);
          });
      });
  }

}