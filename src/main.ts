// / <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { isDevMode } from "@angular/core";

async function prepareApp() {
  if (isDevMode()) {
    const { worker } = await import("./app/mocks/browser");
    return worker.start();
  }

  return Promise.resolve();
}

prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
});

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
