const fs = require('fs');
const path = require('path');
const core = require('@actions/core');

async function run() {
    try {
        // Получаем входные параметры
        const title = core.getInput('title');
        const content = core.getInput('content');

        // Генерируем HTML
        const html = `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>${title}</title>
              </head>
              <body>
                  <h1>${title}</h1>
                  <p>${content}</p>
              </body>
              </html>`;


        // Сохраняем HTML файл
        const outputDir = './dist/';
        const outputPath = path.join(outputDir, 'index2.html');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    fs.writeFileSync(outputPath, html);

    // Устанавливаем путь для выхода
    core.setOutput('html_path', outputPath);

    console.log(`HTML generated: ${outputPath}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run().catch(console.error);