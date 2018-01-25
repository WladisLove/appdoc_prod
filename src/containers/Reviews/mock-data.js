const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 24;
const now = Date.now();

export const dataArr = [{
    id: 1,
    author: "Абрамова А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 17 * minute),
    treatmentDate: '13.10.2017',
    rate: 4,
    secondaryAllowed: true,
}, {
    id: 7,
    author: "Борисова А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 3 * hour),
    treatmentDate: '13.10.2017',
    rate: 4,
    secondaryAllowed: true,
}, {
    id: 8,
    author: "Винокурова А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 9 * hour),
    treatmentDate: '13.09.2017',
    rate: 4,
    secondaryAllowed: true,
    comment: {
        text: "Далеко-далеко. Максимально далеко и еще чуть-чуть дальше за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        date: new Date(now - 3 * hour),
        secondary: true,
    }
},{
    id: 9,
    author: "Григорьева А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 20 * hour),
    treatmentDate: '13.09.2017',
    rate: 4,
    secondaryAllowed: true,
    comment: {
        text: "Далеко-далеко. Максимально далеко и еще чуть-чуть дальше за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        date: new Date(now - 3 * hour),
        secondary: true,
    }
}, {
    id: 10,
    author: "Дробыш А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 3 * day),
    treatmentDate: '13.09.2017',
    rate: 4,
    secondaryAllowed: true,
},{
    id: 11,
    author: "Егоренко А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 5 * day),
    treatmentDate: '13.09.2017',
    rate: 4,
    secondaryAllowed: true,
    comment: {
        text: "Далеко-далеко. Максимально далеко и еще чуть-чуть дальше за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        date: new Date(now - 3 * hour),
        secondary: true,
    }
},{
    id: 13,
    author: "Жук А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 5 * day),
    treatmentDate: '13.09.2017',
    rate: 4,
    secondaryAllowed: true,
},{
    id: 17,
    author: "Зинкович А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 7 * day),
    treatmentDate: '13.09.2017',
    rate: 4,
    secondaryAllowed: true,
},{
    id: 19,
    author: "Иванова А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: new Date(now - 9 * day),
    treatmentDate: '13.09.2017',
    rate: 4,
    secondaryAllowed: true,
},];


// const data1 = {
//     author: "Иванова А. К.",
//     avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
//     text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
//     date: date1,
//     treatmentDate: '13.10.2017',
//     rate: 4,
// };
// const data2 = {
//     text: "Далеко-далеко. Максимально далеко и еще чуть-чуть дальше за словесными горами в стране гласных и согласных живут рыбные тексты. ",
//     date: date1,
//     secondary: true,
// };