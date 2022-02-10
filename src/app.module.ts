import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AdminModule } from './Admin_Module/adminManagement/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Admin_Module/userManagement/user.module';
import { AuthModule } from './Admin_Module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify:false
    }),
    UserModule,
    AuthModule,
    AdminModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
