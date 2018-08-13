import React from 'react';
import Button from '../Button'



class Content extends React.Component {


    render() {
       return (
            <div className="new-visit-type">
                <span>Выберите тип приёма</span>
                <div className="new-visit-type-buttons">
                    {/*СМЕНИТЬ ССЫЛКУ НА САЙТ ДОКТОРОВ*/}
                    <a href="https://vk.com" target="_blank" >
                        <Button size='default'
                                btnText='Платный'
                        />
                    </a>
                    <Button size='default'
                            btnText='Бесплатный'
                            onClick={this.props.onFree}
                    />
                </div>
            </div>

        )
    }
}

export default Content
