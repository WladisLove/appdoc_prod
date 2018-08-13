export function previewFile(file, callback) {
    if(file.originFileObj) {
        file=file.originFileObj;
    }
    var reader = new FileReader();
    reader.onloadend = function () {
        return callback(reader.result);
    };
    reader.readAsDataURL(file);
};