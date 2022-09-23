import * as fs from "fs";

const _mapDirContentKey = async (dirContent, dirPath) => {
    const mappedJsonFile = dirContent.map(file => {
        return fs.promises.readFile(dirPath+'/'+file)
            .then(content => {
                const splitKey = file.split('.json')[0];
                return {[splitKey]: JSON.parse(content.toString())};
            })
    })
    return Promise.all(mappedJsonFile)
}
const _reduceResultsFile = (results) => {
    return results.reduce((a,b) => {
        return {...a,...b}
    })
}

const loadAllData = async (dir) => {
    return fs.promises.readdir(dir)
        .then((content) => _mapDirContentKey(content, dir))
        .then(_reduceResultsFile)
}

const insertData = async (model, data) => {
    return model.insertMany(data, {ordered: false}).catch((err) => true)
}

const insertAllCollection = async (models, data) => {
    const insertPromises = Object.keys(models).map(key => {
        if(data[key.toLowerCase()]){
            return insertData(models[key], data[key.toLowerCase()]);
        }
        return Promise.resolve(true);
    })
    return Promise.all(insertPromises)
}

const clearAllCollection = async (models) => {
    const deletePromises = Object.keys(models).map(key => {
        return models[key].deleteMany();
    })
    return Promise.all(deletePromises);
}

export {
    insertData,
    insertAllCollection,
    clearAllCollection,
    loadAllData
}
