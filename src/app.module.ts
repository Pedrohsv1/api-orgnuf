import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';
import { ToDosModule } from './todos/todos.module';
import { ActivitiesModule } from './activities/activities.module';
import { LinksModule } from './links/links.module';
import { GoalsModule } from './goals/goal.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ToDosModule,
    ActivitiesModule,
    LinksModule,
    GoalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
