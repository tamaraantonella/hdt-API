import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

type Data<T = unknown> = {
  data: T;
  count: number;
};

@Injectable()
export class DataInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return {
            data: data,
            count: data.length
          } satisfies Data;
        }
        return data;
      })
    );
  }
}
