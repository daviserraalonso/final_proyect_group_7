import { platformDynamicServer } from '@angular/platform-server';
import { AppModule } from './app/app.module';

platformDynamicServer().bootstrapModule(AppModule)
  .catch(err => console.error(err));
