import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  try {
    type DocumentBuilderLike = {
      setTitle(v: string): DocumentBuilderLike;
      setDescription(v: string): DocumentBuilderLike;
      setVersion(v: string): DocumentBuilderLike;
      build(): unknown;
    };
    type SwaggerModuleLike = {
      DocumentBuilder: new () => DocumentBuilderLike;
      SwaggerModule: {
        createDocument(app: unknown, config: unknown): unknown;
        setup(path: string, app: unknown, document: unknown): void;
      };
    };
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const loader = new Function('m', 'return import(m)') as (
      m: string,
    ) => Promise<unknown>;
    const swagger = (await loader('@nestjs/swagger')) as SwaggerModuleLike;
    const config = new swagger.DocumentBuilder()
      .setTitle('Chat Playbook API')
      .setDescription('API documentation')
      .setVersion('1.0.0')
      .build();
    const document = swagger.SwaggerModule.createDocument(app, config);
    swagger.SwaggerModule.setup('docs', app, document);
  } catch {
    // swagger optional
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
