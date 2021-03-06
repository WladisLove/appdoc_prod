import globalTranslations from './global.json';
import doctorTranslations from "./doctor.json";
import doctorTypesTranslations from "./doctorTypes.json";
import patientTranslations from "./patient.json";
import personalTranslations from "./personal.json";
import receptionTranslations from "./reception.json";
import treatmentTranslations from "./treatment.json";
import scheduleTranslations from "./schedule.json";
import reviewTranslations from "./review.json";
import formTranslations from "./form.json";
import modalTranslations from "./modal.json";
import buttonTranslations from "./button.json";
import authTranslations from "./auth.json";
import filterTranslations from "./filter.json";
import notificationsTranslations from "./notifications.json";
import menuTranslations from "./menu.json";
import languagesTranslations from "./languages.json";


const translations = {
    ...globalTranslations,
    ...doctorTranslations,
    ...doctorTypesTranslations,
    ...patientTranslations,
    ...personalTranslations,
    ...receptionTranslations,
    ...treatmentTranslations,
    ...scheduleTranslations,
    ...reviewTranslations,
    ...formTranslations,
    ...modalTranslations,
    ...buttonTranslations,
    ...authTranslations,
    ...filterTranslations,
    ...notificationsTranslations,
    ...menuTranslations,
    ...languagesTranslations
}

export { translations }
