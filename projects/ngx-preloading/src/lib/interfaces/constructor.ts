import { AbstractClass } from './abstract-class';
export interface Constructor<T> extends AbstractClass<T> {
    new (...args: any[]): T;
}
