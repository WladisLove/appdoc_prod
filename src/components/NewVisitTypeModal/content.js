import React from 'react';
import Button from '../Button'
import { Translate } from 'react-localize-redux'


class Content extends React.Component {
    render() {
       return (<div>
            <Translate>
                {({ translate }) =>
                    (<div className="new-visit-type">
                        <span>{translate('reception.selectType')}</span>
                        <div className="new-visit-type-buttons">
                            {/*СМЕНИТЬ ССЫЛКУ НА САЙТ ДОКТОРОВ*/}
                            <a href="https://vk.com" target="_blank" >
                                <Button size='default'
                                        btnText={translate('button.title.paidReception')}
                                />
                            </a>
                            <Button size='default'
                                    btnText={translate('button.title.freeReception')}
                                    onClick={this.props.onFree}
                            />
                        </div>
                    </div>)
                }
            </Translate>
        </div>)
    }
}

export default Content
