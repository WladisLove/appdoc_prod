import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../';

storiesOf('Button', module)
    .add('Small', () => (
        <div className='flexTest'>
            <Button
                    btnText="Добавить"
                    size="small" 
                    type="float"
                    title="Добавить отзыв"
            />
            <Button
                    btnText='Добавить'
                    size='small'
                    type='blue'
            />
            <Button
                    btnText='Добавить'
                    size='small'
                    type='dark-blue'
            />
            <Button
                    btnText='Добавить'
                    size='small'
                    type='yellow'
            />
            <Button
                    btnText='Добавить'
                    size='small'
                    type='gradient'
            />
            <Button
                    btnText='Добавить'
                    size='small'
                    type='gradient'
                    disable
            />
            <Button
                    btnText='Добавить'
                    size='small'
                    type='no-brd'
            />

            <Button
                    btnText='Добавить'
                    size='small'
                    type='transparent'
            />
        </div>
    ))
    .add('Default', () => (
        <div>
            <Button
                    btnText='Добавить'
                    size='default'
                    type='float'
            />
            <span> size='default'
            type='float' </span>
            <br/>
            <Button
                    btnText='Добавить'
                    size='default'
                    type='blue'
            />
            <span> size='default'
                type='blue'</span>
            <br/>
            <Button
                    btnText='Добавить'
                    size='default'
                    type='dark-blue'
            />
            <span> size='default'
                type='dark-blue'</span>
            <br/>
            <Button
                    btnText='Добавить'
                    size='default'
                    type='yellow'
            />
            <span> size='default'
                type='yellow'</span>
            <br/>
            <Button
                    btnText='Добавить'
                    size='default'
                    type='gradient'
            />
            <span> size='default'
                type='gradient'</span>
            <br/>
            <Button
                    btnText='Добавить'
                    size='default'
                    type='gradient'
                    disable
            />
            <span> size='default'
                type='gradient'
                disable</span>
        </div>
    ))
    .add('Large', () => (
        <div className='flexTest'>
            <Button
                    btnText='Добавить'
                    size='large'
                    type='float'
            />
            <Button
                    btnText='Добавить'
                    size='large'
                    type='blue'
            />
            <Button
                    btnText='Добавить'
                    size='large'
                    type='dark-blue'
            />
            <Button
                    btnText='Добавить'
                    size='large'
                    type='yellow'
            />
            <Button
                    btnText='Добавить'
                    size='large'
                    type='gradient'
            />
            <Button
                    btnText='Добавить'
                    size='large'
                    type='gradient'
                    disable
            />
        </div>
    ))
    .add('Icon', () => (
        <div>
            <Button
                    btnText='Добавить'
                    size='small'
                    type='float'
                    icon='form'
            />
            <br/>
            <Button
                    btnText='ЗАПИСАТЬСЯ НА ПРИЕМ'
                    size='small'
                    type='float'
                    icon='form'
            />
            <br/>
            <Button
                    btnText='ЭКСТРЕННЫЙ ВЫЗОВ'
                    size='small'
                    type='emergensy'
                    icon='emergency-call'
            />
            <br/>
            <Button
                    btnText='Добавить'
                    size='default'
                    type='blue'
                    icon='clock'
                    svg
            />
            <br/>
            <Button
                    btnText='Добавить (antIcon)'
                    size='large'
                    type='yellow'
                    icon='plus-square'
                    iconSize={15}
            />
            <br/>
            <Button
                    btnText=''
                    size='icon'
                    type='icon'
                    icon='clock'
                    svg
            />
            <br/>
            <Button
                    btnText=''
                    size='icon'
                    type='light-blue'
                    icon='clock'
                    svg
                    iconSize={30}
            />
        </div>
    ))
    .add('Link', () => (
        <div className='flexTest'>
            <Button
                    btnText='Показать еще'
                    size='link'
                    type='link'
                    icon='play-circle'
            />
            <Button
                    btnText='Отменить приемы'
                    size='link'
                    type='link'
                    icon='circle_close'
                    svg
            />
            <Button
                    btnText='Добавить интервал'
                    size='file'
                    type='file'
                    icon='add-button'
                    svg
            />
            <Button
                    btnText='Обращение от 13.09.2017'
                    size='go'
                    type='go'
                    icon='circle_arrow_right'
                    svg
            />
        </div>
    ))