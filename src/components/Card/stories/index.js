import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Col, Row, Icon } from 'antd';
import Card from '../';
// import Fonts from '../../fonts.css';

storiesOf('Card', module)
    .add('Card', () => (
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={24}>
                <Card title="Новые отзывы" extra={<a href=""><Icon type="message" /> <span>Все отзывы</span></a>}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
              </Col>
            </Row>
          </div>
    ))
    .add('Card2', () => (
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={24}>
                <Card title="График работы на сегодня" extra={<div className="sum">Приемы: 12</div>}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                  </Card>
              </Col>
            </Row>
          </div>
    ))