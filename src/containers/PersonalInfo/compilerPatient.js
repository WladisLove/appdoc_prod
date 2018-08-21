import moment from 'moment';


export const compileToClientPatient = (patient) => {
    return {
        id: patient.id,
        fio: patient.fio,
        phone: patient.phone,
        email: patient.email,
        sex: patient.sex,
        address: patient.adress,
        active: patient.active,
        avatar: patient.avatar,
        chronic: [...patient.chronic],
    };
};

export const compileToServerPatient = (patient, id) => {

    let obj = {
        "adress": patient.addressField,
        "email": patient.emailField,
        "name": patient.fioField,
        "phone": patient.phoneField,
        "id": id,
        "avatar": patient.avatar
        };

    console.log(obj);
    return obj;
};