import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { connectToServer } from './app/services/socket-client';

// connectToServer();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
