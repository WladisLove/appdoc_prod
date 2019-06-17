import React from 'react';
import { Form } from 'antd';
import { Translate, withLocalize } from 'react-localize-redux';
import Select from '../Select';

const FormItem = Form.Item;
const Option = Select.Option;

const LanguageToggle = ({languages, setActiveLanguage, className=""}) => {
    const handleChange = (langCode) => {
        localStorage.setItem("lang", langCode);
        setActiveLanguage(langCode)
    }

    return (
        <div className={className}>
            <FormItem>
                <Select
                    placeholder={<Translate id="chooseLanguage" />}
                    onChange={(code) => handleChange(code)}
                >
                    {languages.map((lang) =>
                        <Option value={lang.code}>{lang.name}</Option>
                    )}
                </Select>
            </FormItem>
        </div>
    );
};

export default withLocalize(LanguageToggle);
