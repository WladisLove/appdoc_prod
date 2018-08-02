import moment from 'moment'

export function dateToString(timestamp) {
    let now = new Date(),
        tmp = timestamp*1000;
    const dist = now - tmp;
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;

    moment.locale('ru');

    if (dist < (minute - 1)) {
        return moment(tmp)
            .startOf('second')
            .fromNow()
    }

    if (dist < (hour - 1)) {
        return moment(tmp)
            .startOf('minute')
            .fromNow()
    }

    if (dist < (6*hour - 1)) {
        return moment(tmp)
            .startOf('hour')
            .fromNow()
    }

    if (dist < (day-1) && now.getDate() === tmp.getDate()) {
        return moment(tmp)
            .format('HH:mm');
    }

    return moment(tmp)
        .format('HH:mm DD.MM.YYYY');
}
