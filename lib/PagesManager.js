const { join } = require('path');
const { readdirSync, statSync } = require('fs');
const Page = require('./Page');
const { sortCollection, objectDefaults } = require('./utils');

class PagesManager {
    constructor(config) {
        this.config = config;
        this.pages = this.#readPages();
    }

    #findFiles(dir, extn, files, result, regex) {
        files = files || readdirSync(dir);
        result = result || [];
        regex = regex || new RegExp(`\\${extn}$`);

        for (let i = 0; i < files.length; i++) {
            let file = join(dir, files[i]);
            if (statSync(file).isDirectory()) {
                try {
                    result = this.#findFiles(file, extn, readdirSync(file), result, regex);
                } catch (error) {}
            } else {
                if (regex.test(file)) {
                    result.push(file);
                }
            }
        }
        return result;
    }

    #readPages() {
        let pages = this.#findFiles(this.config.pagesDir, '.md');
        return pages.map((pageFile) => {
            return new Page(pageFile, null, this.config);
        });
    }

    findByFileName(name) {
        let res = this.pages.filter((page) => {
            return (page.fileName = name);
        });
        return res ? res[0] : null;
    }

    getAllPages() {
        let homePage = new Page(null, Page.PAGE_TYPES.HOME, this.config); // add home page
        return [...this.pages, homePage].filter((p) => p.visible);
    }

    /*
        params.limit=10
        params.sortBy=dateTime
        params.sortDir=desc
        params.category
     */
    getPagesByFilter(params = {}) {
        const { limit, sortBy, sortDir, category } = objectDefaults(params, {
            limit: 10,
            sortBy: 'dateTime',
            sortDir: 'desc',
            category: null,
        });

        let list = sortCollection([...this.pages], sortBy, sortDir);

        return list
            .filter((page) => {
                if (!page.visible) return false;
                if (category) {
                    return category === page.category;
                }
                return true;
            })
            .slice(0, parseInt(limit));
    }
}

module.exports = PagesManager;
