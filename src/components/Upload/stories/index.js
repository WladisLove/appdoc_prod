import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload from '../';

const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };


storiesOf('Upload', module)
    .add('upload', () => (
        <div>
            <Upload text="Прикрепить файл" onChange={e => console.log(e)} {...props}/>
        </div>
    ));