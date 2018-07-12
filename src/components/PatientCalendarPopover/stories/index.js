import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PatientCalendarPopover from '../';

import {dataArr} from './mock-data'

storiesOf('PatientCalendarPopover', module)
    .add('PatientCalendarPopover', () => (
        <div style={{ padding: '30px' }}>
            <PatientCalendarPopover
                onGoto={()=>console.log('clickonGoto')}
                onGotoName={()=>console.log('clickonGotoName')}
                calendarItem={[
                    {
                        appointmentSpec: 'Терапевт', 
                        appointmentName: 'Иванова Александра Константиновна',
                        appointmentDate: '09 ноября 08:00 - 08:30',
                        appointmentType: 'chat1',
                        appointmentText: 'Консультация по результатам анализа крови.',
                        appointmentTypeTitle: 'Чат',
                    },{
                        appointmentSpec: 'Кардиолог', 
                        appointmentName: 'Иванова Елена Александровна',
                        appointmentDate: '09 ноября 16:00 - 16:20',
                        appointmentType: 'video-camera',
                        appointmentText: 'Консультация по результатам анализа крови.',
                        appointmentTypeTitle: 'Видеочат',
                    },
                ]}
            />
        </div>
    ))