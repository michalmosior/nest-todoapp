import { AppConfigurationService } from './appconfig.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  exports: [AppConfigurationService],
  imports: [ConfigModule.forRoot()],
  providers: [AppConfigurationService],
})
export class AppConfigurationModule {}
