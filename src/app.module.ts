import { Module } from '@nestjs/common';
import { AppConfigurationModule } from './config/appconfig.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import { AppConfigurationService } from './config/appconfig.service';

@Module({
  imports: [
    AppConfigurationModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigurationModule],
      inject: [AppConfigurationService],
      useFactory: (appConfigService: AppConfigurationService) => {
        const options: MongooseModuleOptions = {
          uri: appConfigService.connectionString,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
