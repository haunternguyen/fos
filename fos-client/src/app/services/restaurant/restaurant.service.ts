import { Injectable } from '@angular/core';
import { HttpClient, XhrFactory } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  ids: any;

  constructor(private http: HttpClient) {}

  getRestaurantIds() {
    return this.http.get<any>(environment.apiUrl + 'api/Restaurant/GetIds', {
      params: {
        IdService: '1',
        province_id: '217'
      }
    });
  }
  getRestaurants(ids: any) {
    return this.http.put<any>(
      environment.apiUrl + 'api/Delivery/PutRestaurantIds',
      {
        restaurant_ids: ids
      },
      {
        params: {
          IdService: '1',
          city_id: '217'
        }
      }
    );
  }
  addFavoriteRestaurant(userId: any, restaurantId: any) {
    return this.http.post<any>(
      environment.apiUrl + 'api/favorite/add',
      {
          UserId: userId,
          RestaurantId: restaurantId,
      },
    )
  }
  removeFavoriteRestaurant(userId: any, restaurantId: any) {
    return this.http.post<any>(
      environment.apiUrl + 'api/favorite/remove',
      {
          UserId: userId,
          RestaurantId: restaurantId,
      },
    )
  }
  getFavorite(userId: any) {
    return this.http.get<any>(environment.apiUrl + 'api/favorite/GetAllById/' + userId);
  }
  getCurrentUserId() {
    return this.http.get<any>(environment.apiUrl + 'api/spuser/GetCurrentUser');
  }
}
