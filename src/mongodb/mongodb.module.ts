import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL!, {
      dbName: process.env.MONGO_DB!
    })
  ]
})
export class MongoDBModule {}