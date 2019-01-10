import globalTranslations from './global.json';
import doctorTranslations from "./doctor.json";
import patientTranslations from "./patient.json";
import buttonTranslations from "./button.json";
import authTranslations from "./auth.json";

const translations = {
    ...globalTranslations,
    ...doctorTranslations,
    ...patientTranslations,
    ...buttonTranslations,
    ...authTranslations
}

export { translations }
