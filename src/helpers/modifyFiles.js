export function previewFile(file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
        console.log(reader.result, "READER RESULT");
        return callback(reader.result);
    };
    reader.readAsDataURL(file);
};