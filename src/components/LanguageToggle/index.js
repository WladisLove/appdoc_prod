import React from 'react';
import { Form } from 'antd';
import axios from 'axios';
import { Translate, withLocalize } from 'react-localize-redux';
import Select from '../Select';

const FormItem = Form.Item;
const Option = Select.Option;

const LanguageToggle = ({languages, setActiveLanguage, className="", changeLangSelector}) => {
    const handleChange = (langCode) => {
        localStorage.setItem("lang", langCode);
        setActiveLanguage(langCode)
        changeLangSelector(langCode)
    }
    const activeLang = localStorage.getItem("lang");

    const setBackendLang = (lang) => {
        axios.get(`https://appdoc.by/~api/json/catalog.doc2/setLang/lang/${lang}`)
        console.log(lang)
    }

    return (
        
        <div className={className}>
            <FormItem>
                <Select
                    placeholder={<Translate id="chooseLanguage" />}
                    onChange={(code) => handleChange(code)}
                    defaultValue={activeLang}
                    onChange={setBackendLang}
                >
                    {languages.map((lang) =>
                        <Option value={lang.code} key={lang.code}>{lang.name}</Option>
                    )}
                </Select>
            </FormItem>
        </div>
    );
};

export default withLocalize(LanguageToggle);
