import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PatientAnalyzesItem from '../';

import {panelArr} from './mock-data'

storiesOf('PatientAnalyzesItem', module)
    .add('PatientAnalyzesItem', () => (
        <div>
            <PatientAnalyzesItem 
                comeDate
                analyzesDate= "10 января"
                analyzesType= "blood"
                analyzesText= "Общий анализ крови (без лейкоцитарной формулы и СОЭ) (Complete Blood Count, CBC)"
            />
        </div>
    )) 