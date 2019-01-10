import globalTranslations from './global.json';
import doctorTranslations from "./doctor.json";
import patientTranslations from "./patient.json";
import buttonTranslations from "./button.json";

const translations = {
    ...globalTranslations,
    ...doctorTranslations,
    ...patientTranslations,
    ...buttonTranslations
}

export { translations }
