import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event } from './../../models/event';
import { Order } from 'src/app/models/order';
// import { EnvironmentService } from "../shared/service/environment.service";
import { UserNotOrderMailInfo } from './../../models/user-not-order-mail-info';
import { UserNotOrder } from 'src/app/models/user-not-order';
import { UserReorder } from 'src/app/models/user-reorder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string;

  constructor(
    private http: HttpClient // , private envService: EnvironmentService
  ) {
    // this.baseUrl = envService.getApiUrl() + "/api/order";
  }

  getAllEvent(userId: string): Promise<Array<Event>> {
    return new Promise<Array<Event>>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<Array<Event>>>(
          environment.apiUrl + 'api/splist/getallevent',
          {
            params: {
              userId
            }
          }
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          }
        })
        .catch(alert => console.log(alert));
    });
  }
  SetOrder(order: Order, isWildOrder: boolean): Promise<void> {
    var apiUrl = isWildOrder ? 'AddWildOrder' : 'UpDateOrder';
    return new Promise<void>((resolve, reject) => {
      this.http
        .post<ApiOperationResult<void>>(
          environment.apiUrl + 'api/Order/' + apiUrl,
          order
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          } else {
            reject(result.ErrorMessage);
          }
        })
        .catch(alert => console.log(alert));
    });
  }
  GetOrder(orderId: string): Promise<Order> {
    return new Promise<Order>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<Order>>(
          environment.apiUrl + 'api/Order/GetById',
          {
            params: {
              orderId: orderId
            }
          }
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          } else reject(new Error(JSON.stringify(result.ErrorMessage)));
        })
        .catch(alert => console.log(alert));
    });
  }
  GetOrdersByEventId(eventId: string): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<Order[]>>(
          environment.apiUrl + 'api/Order/GetAllByEventId',
          {
            params: {
              eventId
            }
          }
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          } else reject(new Error(JSON.stringify(result.ErrorMessage)));
        })
        .catch(alert => console.log(alert));
    });
  }
  GetUserNotOrdered(eventId: string) {
    return new Promise<UserNotOrder[]>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<UserNotOrder[]>>(
          environment.apiUrl + 'api/Order/GetUserNotOrdered',
          {
            params: {
              eventId
            }
          }
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          } else {
            reject(result.ErrorMessage);
          }
        })
        .catch(alert => console.log(alert));
    });
  }
  SendEmailToNotOrderedUser(users: UserNotOrderMailInfo[]) {
    return new Promise<ApiOperationResult<void>>((resolve, reject) => {
      this.http
        .put<ApiOperationResult<void>>(
          environment.apiUrl + 'SendEmailToNotOrderedUser',
          users
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(null);
          } else {
            reject(result.ErrorMessage);
          }
        })
        .catch(alert => console.log(alert));
    });
  }
  SendEmailToReOrderedUser(users: UserReorder[]) {
    return new Promise<ApiOperationResult<void>>((resolve, reject) => {
      this.http
        .put<ApiOperationResult<void>>(
          environment.apiUrl + 'SendEmailToReOrderedUser',
          users
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(null);
          } else {
            reject(result.ErrorMessage);
          }
        })
        .catch(alert => console.log(alert));
    });
  }
  GetByEventvsUserId(eventId: string, userId: string) {
    return new Promise<Order>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<Order>>(
          environment.apiUrl + 'api/Order/GetByEventvsUserId',
          {
            params: {
              eventId: eventId,
              userId: userId
            }
          }
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          } else reject(new Error(JSON.stringify(result.ErrorMessage)));
        })
        .catch(alert => console.log(alert));
    });
  }
  GetOrderIdOfUserInEvent(eventId: string, userId: string) {
    return new Promise<string>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<string>>(
          environment.apiUrl + 'api/Order/GetOrderIdOfUserInEvent',
          {
            params: {
              eventId,
              userId
            }
          }
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          } else reject(new Error(JSON.stringify(result.ErrorMessage)));
        })
        .catch(alert => console.log(alert));
    });
  }
  UpdateOrderStatusByOrderId(
    OrderId: string,
    OrderStatus: number
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<boolean>>(
          environment.apiUrl + 'api/Order/UpdateOrderStatusByOrderId',
          {
            params: {
              OrderId: OrderId,
              OrderStatus: OrderStatus.toString()
            }
          }
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          }
        })
        .catch(alert => console.log(alert));
    });
  }
  UpdateFoodDetailByOrderId(
    OrderId: string,
    FoodDetail: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .get<ApiOperationResult<boolean>>(
          environment.apiUrl + 'api/Order/UpdateFoodDetailByOrderId',
          {
            params: {
              OrderId: OrderId,
              FoodDetail: FoodDetail
            }
          }
        )
        .toPromise()
        .then(result => {
          if (result.Success) {
            resolve(result.Data);
          }
        })
        .catch(alert => console.log(alert));
    });
  }
}
