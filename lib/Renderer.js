const path = require('path');
const Listok = require('listok.js');
const { outputFileSync } = require('fs-extra');
const { mergeObjects, getRandomInt } = require('./utils');

const MAIN_FILE = 'main.html';

class Renderer {
    constructor(themeDir, outputDir) {
        this.listok = new Listok(themeDir);
        this.outputDir = outputDir;
        this.context = {};
    }

    setContext(ctx) {
        this.context = ctx;
    }

    saveStatic(fileName, ctx) {
        let htmlContent = this.listok.renderFile(MAIN_FILE, ctx);
        return outputFileSync(path.join(this.outputDir, fileName), htmlContent);
    }

    generateStatic(pageManager) {
        let pages = pageManager.getAllPages();

        this.listok.defineFunction('renderPage', ({ name }) => {
            // в name путь до .md файла
            let page = pageManager.findByFileName(name);
            return page ? page.getView() : '';
        });

        this.listok.defineFunction('getPages', ({ sortBy, sortDir, limit }) => {
            return pageManager.getPagesByFilter({
                limit,
                sortBy,
                sortDir,
            });
        });

        this.listok.defineFunction('dateTimeFormat', ({ format }, ctx, rootCtx) => {
            return rootCtx.dateTime.format(format);
        });

        this.context.randomNum = getRandomInt(1, 9999);

        pages.forEach((page) => {
            // console.log('page', page);
            // console.log(this.context, page.getView());
            let pageCtx = mergeObjects(this.context, page.getView());
            this.saveStatic(page.url + '.html', pageCtx);
        });
    }
}

module.exports = Renderer;
