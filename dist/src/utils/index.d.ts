declare const loadAllData: (dir: any) => Promise<any>;
declare const insertData: (model: any, data: any) => Promise<any>;
declare const insertAllCollection: (models: any, data: any) => Promise<any[]>;
declare const clearAllCollection: (models: any) => Promise<any[]>;
export { insertData, insertAllCollection, clearAllCollection, loadAllData };
