import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserOrder } from 'src/app/models/user-order';
import { ExcelModel } from 'src/app/models/excel-model';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient) { }
  CreateCSV(excelModel: ExcelModel): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .post<ApiOperationResult<void>>(
          environment.apiUrl + 'api/Excel/CreateCSV/',
          excelModel
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Success);
          } else { reject(new Error(JSON.stringify(result.ErrorMessage))); }
        })
        .catch(alert => console.log(alert));
    });
  }
  DownloadCSV(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<void>>(
          environment.apiUrl + 'api/Excel/DownloadCSV/',
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          } else { reject(new Error(JSON.stringify(result.ErrorMessage))); }
        })
        .catch(alert => console.log(alert));
    });
  }
}