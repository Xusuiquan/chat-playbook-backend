"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    try {
        const loader = new Function('m', 'return import(m)');
        const swagger = (await loader('@nestjs/swagger'));
        const config = new swagger.DocumentBuilder()
            .setTitle('Chat Playbook API')
            .setDescription('API documentation')
            .setVersion('1.0.0')
            .build();
        const document = swagger.SwaggerModule.createDocument(app, config);
        swagger.SwaggerModule.setup('docs', app, document);
    }
    catch {
    }
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map