export let search = (value, dataArr) => {
    let str = value.toLowerCase();
    let newArr = dataArr.filter(elem => {
        return str.split(' ').length === 1 
            ? search1word(elem, str)
            : searchSeveralWords(elem, str);
        
    })

    return newArr;    
}

function search1word(elem, str){
    let fioArr = elem.name.toLowerCase().split(' ');
    for (let i =0, len = fioArr.length; i < len; i++){
        if(fioArr[i].indexOf(str) === 0){
            return true;
        }
    }
}
function searchSeveralWords(elem, str){
    let searchArr = str.split(' ');
    for(let j = 0, len = searchArr.length; j < len; j++){
        if (!search1word(elem, searchArr[j])){
            return false;
        }
        else if(j == len - 1) return true;
    }
    
}