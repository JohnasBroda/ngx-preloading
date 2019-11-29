import { Observable } from 'rxjs';
import { PreloadingTarget } from '../types';


export interface IPreloadingGuard<> {
    hookSignal$: Observable<PreloadingTarget>;
    signal(hook: PreloadingTarget): void;
}
