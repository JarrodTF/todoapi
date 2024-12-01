import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginRequest } from '../interfaces/login-request';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { RegisterRequest } from '../interfaces/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl;

  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}user/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {

            // alert(response.userId);
            var convertedId = response.userId.toString();

            var newToken = this.appendTokenKeyWithUserId(response.token, convertedId)

            localStorage.setItem(this.tokenKey, newToken);
          }

          return response;
        })
      );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}user/register`, data);

  }

  getUserDetail = () => {
    const token = this.getToken();

    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.id,
      fullName: decodedToken.name,
      email: decodedToken.email
    }

    return userDetail;
  }

  logout = (): void => {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn = (): boolean => {
    const token = this.getToken();

    if (!token) return false;

    return !this.isTokenExpired()
  }

  private isTokenExpired() {
    const token = this.getToken();

    if (!token) return true;

    const decoded = jwtDecode(token)
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;

    if (isTokenExpired) this.logout();

    return isTokenExpired;
  }

  private getToken = (): string | null => localStorage.getItem(this.tokenKey) || "";

  private appendTokenKeyWithUserId(token: string, userId: string): string {
    try {
      const decoded = jwtDecode<any>(token);

      // Append the userId to the decoded payload
      decoded.userId = userId;

      // Re-encode the payload back into the token
      const tokenParts = token.split('.');
      const updatedPayload = btoa(JSON.stringify(decoded)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      
      return `${tokenParts[0]}.${updatedPayload}.${tokenParts[2]}`;
    } catch (error) {
      console.error('Error decoding token:', error);
      return token;
    }
  }
}



