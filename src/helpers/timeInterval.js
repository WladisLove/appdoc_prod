/* eslint-disable */
export const findTimeInterval = (date, mode) => {
    if(!(date instanceof Date)) {
        console.log('not a Date');
        return;
    }

    Date.prototype.daysInMonth = function() {
		return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
    };

    switch(mode){
        case 'day':
            return {
                start: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                end: new Date(date.getFullYear(), date.getMonth(), date.getDate()+1),
            };
        case 'week':
            return findWeekInterval(date);
        case 'month': 
            return findMonthInterval(date);
        default: 
            return {};
    }  
}

// ------------- Week ----------------
function findWeekInterval(date){
    let dayNum = date.getDay();

    let start, end;

    !dayNum 
        ? (start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6),
            end = date)
        : (start = new Date(date.getFullYear(), date.getMonth(), date.getDate() - dayNum + 1),
            end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 - dayNum));

    return {
        start,
        end,
    }
}

// ------------- Month ----------------
function findMonthInterval(date){
    const start = new Date(date.getFullYear(), date.getMonth(),1),
        end = new Date(date.getFullYear(), date.getMonth(), date.daysInMonth());

    return {
        start,
        end,
    }
}
/*function findMonthInterval(date){
    const start = findCalendarBegin(new Date(date.getFullYear(), date.getMonth(),1)),
        end = findCalendarEnd(new Date(date.getFullYear(), date.getMonth(), date.daysInMonth()));

    return {
        start,
        end,
    }
}

function findCalendarBegin(date){
    let dayNum = date.getDay(),
        temp;
    return (dayNum === 1) 
            ? date 
            : (dayNum === 0) 
                ? (temp = new Date(date.getFullYear(), date.getMonth()-1),
                    new Date(date.getFullYear(), date.getMonth()-1, temp.daysInMonth()-5)) 
                : (
                    temp = new Date(date.getFullYear(), date.getMonth()-1),
                    new Date(date.getFullYear(), date.getMonth()-1, temp.daysInMonth()-dayNum+2)
                );
}

function findCalendarEnd(date){
    let dayNum = date.getDay(),
        temp;
    return (dayNum === 0) 
        ? date 
        : (
            temp = new Date(date.getFullYear(), date.getMonth()),
            new Date(date.getFullYear(), date.getMonth(), temp.daysInMonth()+7-dayNum)
        );
}*/