import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import DownloadLink from '../';

storiesOf('DownloadLink', module)
    .add('DownloadLink', () => (
        <div className='flexTest'>
            <DownloadLink
                btnText="Прикрепленный файл с длинным предлинным названием.doc"
                size="default"
                type="link"
                download
                svg
                icon="file"
                iconSize={16}
            />
        </div>
    ))