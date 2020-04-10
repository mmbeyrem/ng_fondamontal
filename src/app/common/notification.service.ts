import { InjectionToken } from "@angular/core";

export let Notify = new InjectionToken<INotify>("toaster wrapper");
export interface INotify {
  success(message: string, title?: string): void;
  info(message: string, title?: string): void;
  warning(message: string, title?: string): void;
  error(message: string, title?: string): void;
}
