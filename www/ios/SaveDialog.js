let exec = require("cordova/exec");
let moduleMapper = require("cordova/modulemapper");
let FileReader = moduleMapper.getOriginalSymbol(window, "FileReader") || window.FileReader;

let saveFile = (blob, name) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
        exec(resolve, reject, "SaveDialog", "saveFile", [reader.result, name]);
    };
    reader.onerror = () => {
        reject(reader.error);
    };
    reader.onabort = () => {
        reject("Blob reading has been aborted");
    };
    reader.readAsArrayBuffer(blob);
});

module.exports = {
    saveFile(blob, name = "untitled") {
        return saveFile(blob, name);
    },
    copyFile(filePath) {
        return new Promise((resolve, reject) => {
            exec(resolve, reject, "SaveDialog", "copyFile", [filePath]);
        });
    }
};
