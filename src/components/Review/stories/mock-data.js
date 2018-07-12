const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 24;
const now = Date.now();

const date1 = new Date(now - 5 * minute);

export const data1 = {
    id: "125457",
    id_user: "2664",
    id_doc: "2697",
    id_zap: "120635",
    fio: "Абрамова Анна Константиновна",
    comment: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: '1521201672019',
    dateCommentDoc: "1521169068",
    makingAppDate: "1518598762",
    rating: "3",

    commentDoc: "",
}

export const data2 = {
    id: "125457",
    id_user: "2664",
    id_doc: "2697",
    id_zap: "120635",
    //fio: "Абрамова Анна Константиновна",
    comment: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: '1521201672',
    dateCommentDoc: "1521169068",
    makingAppDate: "1518598762",
    rating: "3",

    commentDoc: "lol",
}

export const data1_old = {
    author: "Иванова А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: date1,
    treatmentDate: '13.10.2017',
    rate: 4,
    secondaryAllowed: true,
};
export const data2_old = {
    text: "Далеко-далеко. Максимально далеко и еще чуть-чуть дальше за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: date1,
    secondary: true,
};

export const data3 = {
    author: "Иванова А. К.",
    avatar: "https://www.proza.ru/pics/2017/06/03/1990.jpg",
    text: "Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. ",
    date: date1,
    treatmentDate: '13.10.2017',
    rate: 3,
    secondaryAllowed: true,
    comment: {
        text: "Далеко-далеко. dddddddddddddddddd Максимально далеко и еще чуть-чуть дальше за словесными горами в стране гласных и согласных живут рыбные тексты. ",
        date: date1,
        secondary: true,
    }
};