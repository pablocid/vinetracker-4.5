import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableAkitaProdMode, persistState } from '@datorama/akita';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
  if ('serviceWorker' in navigator ) {
    navigator.serviceWorker.register('ngsw-worker.js');
  }
}
persistState();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
