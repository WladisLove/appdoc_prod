import React from 'react';
import { Form } from 'antd';
import { Translate, withLocalize } from 'react-localize-redux';
import Select from '../Select';

const FormItem = Form.Item;
const Option = Select.Option;

const LanguageToggle = ({languages, setActiveLanguage}) => {
    const handleChange = (langCode) => langCode && setActiveLanguage(langCode);

    return (
        <div>
            <FormItem>
                <Select
                    placeholder={<Translate id="chooseLanguage" />}
                    onChange={handleChange}
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
