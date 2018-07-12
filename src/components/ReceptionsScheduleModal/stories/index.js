import React from 'react';
import {storiesOf} from '@storybook/react';
import ReceptionsScheduleModal from '../';
import moment from 'moment'

const options = ['5', 10, 15, '20'];

// дата обязательно через moment(new Date(2017,11,11))

storiesOf('Modal - ReceptionsScheduleModal', module)
    .add('modal', () => (
        <div>
            <ReceptionsScheduleModal
                visible={true}
                dateSet={{
                    defaultEndValue: moment(new Date(2017, 11, 15)),
                    defaultStartValue: moment(new Date(2017, 11, 10))
                }}
                timeSetCall={[
                    {
                        defaultStartValue: moment(1318781876),
                        defaultEndValue: moment(1378781876),
                    },
                    {
                        defaultStartValue: moment(1318781876),
                        defaultEndValue: moment(1368781876),
                    }
                ]}
                timeSetReception={[
                    {
                        defaultStartValue: moment(new Date(2016, 11, 11, 10, 55), "YYYY-MM-DD HH:mm"),
                        defaultEndValue: moment(new Date(2017, 11, 11, 11, 50), "YYYY-MM-DD HH:mm"),
                    },
                    {
                        defaultStartValue: moment(new Date(2016, 11, 11, 10, 55), "YYYY-MM-DD HH:mm"),
                        defaultEndValue: moment(new Date(2017, 11, 11, 11, 51), "YYYY-MM-DD HH:mm"),
                    },
                    {
                        defaultStartValue: moment(new Date(2016, 11, 11, 10, 55), "YYYY-MM-DD HH:mm"),
                        defaultEndValue: moment(new Date(2017, 11, 11, 11, 52), "YYYY-MM-DD HH:mm"),
                    },
                    {
                        defaultStartValue: moment(new Date(2016, 11, 11, 10, 55), "YYYY-MM-DD HH:mm"),
                        defaultEndValue: moment(new Date(2017, 11, 11, 11, 53), "YYYY-MM-DD HH:mm"),
                    },
                ]}
                type={"voice"}
                selOptions={options}
                onSave={(obj) => console.log(obj)}
            />
        </div>
    ));