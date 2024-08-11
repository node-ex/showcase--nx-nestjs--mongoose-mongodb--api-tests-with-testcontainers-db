import { Module } from '@nestjs/common';
import { MongooseModule as _MongooseModule } from '@nestjs/mongoose';

export const _mongooseModuleForRoot = _MongooseModule.forRoot(
  'mongodb://127.0.0.1:27018/nest',
);

@Module({
  imports: [_mongooseModuleForRoot],
})
export class MongooseModule {}
