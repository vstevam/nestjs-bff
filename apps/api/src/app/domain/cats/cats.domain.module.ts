import { CoreDomainModule } from '@nestjs-bff/backend/domain/core/domain.core.module';
import { MongoSysProviderTokens } from '@nestjs-bff/backend/shared/database/mongo/mongo.shared.constants';
import { Module } from '@nestjs/common';
import { CatProviderTokens } from './cat.domain.constants';
import { CatSchema } from './model/cat.domain.schema';
import { CatRepoCache } from './repo/cat.domain.cache-repo';
import { CatRepoRead } from './repo/cat.domain.read-repo';

const CatsModelProvider = {
  provide: CatProviderTokens.Models.Cat,
  useFactory: mongoose => mongoose.connection.model('Cat', CatSchema),
  inject: [MongoSysProviderTokens.Connections.Mongoose],
};

@Module({
  imports: [CoreDomainModule],
  providers: [CatsModelProvider, CatRepoRead, CatRepoCache],
  exports: [CatRepoRead, CatRepoCache],
})
export class CatsDomainModule {}