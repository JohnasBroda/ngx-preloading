export abstract class PreloadingEvent<T extends any = string> {
    public readonly message: T;
}
