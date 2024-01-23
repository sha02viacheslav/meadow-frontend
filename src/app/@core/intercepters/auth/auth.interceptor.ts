import { throwError as observableThrowError, Observable, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  const authReq = req.clone({
    headers: req.headers.set('authorization', `Bearer ${authService.getToken() || ''}`),
  });
  return next(authReq).pipe(
    retry(1),
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && err.error.message === 'Token error: jwt expired') {
        authService.logout();
      }
      return observableThrowError(err);
    })
  );
};
