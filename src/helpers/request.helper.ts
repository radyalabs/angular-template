import { environment } from '@/environments/environment';
import { of } from 'rxjs';

/**
 * Can be used for handling error per component or module scope
 *
 */
export function errorHandler<T>(process: string, result?: T) {
  return () => {
    if (!environment.production) {
      console.error(`Something went wrong while processing ${process}`);
    }

    return of(result as T);
  };
}
