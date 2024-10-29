import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule, registerEnumType } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { config } from 'dotenv';
import { Role } from '@prisma/client';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { FAQModule } from './entities/faq/faq.module';
import { UserModule } from './entities/user/user.module';
import { AuthModule } from './auth/auth.module';

config();
registerEnumType(Role, { name: 'Role' });

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          introspection: process.env.PLAYGROUND_ENABLED == 'true',
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          fieldResolverEnhancers: ['guards', 'interceptors'],
          playground: false,
          bodyParserConfig: {
            limit: '50mb',
          },
          plugins: [],
          formatError: (error: GraphQLError) => {
            const originalError: any = error.extensions?.originalError;
            const statusCode =
              originalError?.statusCode || error.extensions?.status;
            if (process.env.DISCORD_BOT_LOG_LEVEL == 'error') {
              switch (statusCode) {
                case 400:
                case 401:
                case 403:
                case 404:
                case 409:
                  break;
                default: {
                  console.log(error);
                }
              }
            }
            return error;
          },
          context: () => ({}),
        };
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    AuthModule,
    PrismaModule,
    FAQModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
