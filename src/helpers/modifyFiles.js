export function previewFile(file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
        //console.log('res');
        return callback(reader.result);
    };
    reader.readAsDataURL(file);
};