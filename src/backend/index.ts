import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app/app.module';
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(path.resolve(__dirname, 'public'));
    app.setGlobalPrefix('api');

    app.listen(7000);
}

bootstrap();
