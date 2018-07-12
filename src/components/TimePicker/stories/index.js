import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import { action } from '@storybook/addon-actions';

import TimePicker from '../';

const rangeSet = {
    placeholderStart: 'Начало',
    placeholderEnd: 'Конец',
    defaultStartValue: moment("01:26", "hh:mm"), /*задать в доступный промежуток времени(желательно)*/
    defaultEndValue: moment("15:26", "hh:mm"), /*задать в доступный промежуток времени*/
};
const valueTime = moment("13:45", "hh:mm");

storiesOf('TimePicker', module)
    .add('single', () => (
        <div>
            <br/>
            <TimePicker format="HH:mm"
                        onChange={action('Time picked')}
                        minuteStep={5}
                        availableArea={[
                            {
                                from : 1395985227000,
                                to   : 1395990227000
                            },
                            {
                                from : 1396005227000,
                                to   : 1396010327000
                            },
                            {
                                from : 1396020027000,
                                to   : 1396025327000
                            }
                        ]}
                        placeholder= "Время деньги"
                        value = {valueTime} //если убрать, то будет placeholder
                        isReset={true}
            />
        </div>
    ))
    .add('range', () => (
        <div>
            <TimePicker format="HH:mm"
                        minuteStep={5}
                        value = {valueTime}

                        range
                        rangeSet={rangeSet}
                        delimiter="&mdash;"
                        onChange={action('Time picked')}
                        availableArea={[
                            {
                                from : 1395985227000,
                                to   : 1395990227000
                            },
                            {
                                from : 1396005227000,
                                to   : 1396010327000
                            },
                            {
                                from : 1396020027000,
                                to   : 1396025327000
                            }
                        ]}
            />

        </div>
    ));