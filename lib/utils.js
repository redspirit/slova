const fs = require('fs');
const path = require('path');
const moment = require('moment');

const copyDirectoryRecursive = (sourceDir, destDir, exclude) => {
    fs.mkdirSync(destDir, { recursive: true });
    const files = fs.readdirSync(sourceDir);
    for (const file of files) {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);

        if (fs.statSync(sourcePath).isDirectory()) {
            copyDirectoryRecursive(sourcePath, destPath, exclude);
        } else if (!exclude.split(',').includes(path.extname(file).toLowerCase())) {
            fs.copyFileSync(sourcePath, destPath);
        }
    }
}

const mergeObjects = (target, source) => {
    const result = { ...target };
    for (const key in source) {
        if (source[key] !== null && source[key] !== undefined) {
            result[key] = source[key];
        }
    }
    return result;
}

const sortCollection = (arr, key, order = 'asc') => {
    return arr.sort((a, b) => {
        if (order === 'asc') {
            return a[key] - b[key];
        } else {
            return b[key] - a[key];
        }
    });
}

const objectDefaults = (objA, objB) => {
    for (const key in objB) {
        if (typeof objA[key] === 'undefined' || objA[key] === undefined) {
            objA[key] = objB[key];
        }
    }
    return objA;
}

const extractDateAndName = (fileName) => {
    const parts = fileName.split(/[_.-]/g);
    if (parts[0].length === 4 && parts[1].length === 2 && parts[2].length === 2) {
        let dateStr = parts.slice(0, 3).join('-');
        let md = moment(dateStr, 'YYYY-MM-DD');
        return {
            date: md.isValid() ? md.toDate() : null,
            name: parts.slice(3).join('-')
        };
    } else {
        return {
            date: null,
            name: fileName.split(/[_.-]/g).join('-')
        };
    }
}

const getUrlFromPath = (filePath, pagesRootPath) => {
    let relFilePath = filePath.slice(pagesRootPath.length + 1);
    let components = path.parse(relFilePath);
    return path.join(components.dir, components.name);
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    copyDirectoryRecursive,
    mergeObjects,
    sortCollection,
    objectDefaults,
    extractDateAndName,
    getRandomInt,
    getUrlFromPath,
}