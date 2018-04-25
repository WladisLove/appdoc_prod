import moment from 'moment';


export const compileToClientDoctor = (doc) => {

    let arrayMain = [];
    let arraySecond = [];
        for(let i = 0; i < doc.educationsgroup1.length; i++){
            let date1 = (+doc.educationsgroup1[i].finishucationyear[0]  * 1000);
            date1 = moment(date1);
            let date2 = (+doc.educationsgroup1[i].finishucationyear[1]  * 1000);
            date2 = moment(date2);

            arrayMain.push({
                id               : i,
                mainInstitution  : doc.educationsgroup1[i].education,
                mainSpecialty    : doc.educationsgroup1[i].speciality,
                mainDateStart    : date1,
                mainDateEnd      : date2,
                documents        : doc.educationsgroup1[i].diplomphoto
            })
        }
        for(let i = 0; i < doc.educationsgroup2.length; i++){
            let date11 = (+doc.educationsgroup2[i].ucationyears[0] * 1000);
            date11 = moment(date11);
            let date22 = (+doc.educationsgroup2[i].ucationyears[1] * 1000);
            date22 = moment(date22);
            arraySecond.push({
                id                 : i,
                secondInstitution  : doc.educationsgroup2[i].education,
                secondSpecialty    : "", //есть только doc.education
                dateStart          : date11,
                dateEnd            : date22,
                documents          : doc.educationsgroup2[i].diplomphoto
            })
        }

   /* doc.workdate*/
    const f = moment(+doc.workdate * 1000);

    const work =(doc.post) ? [
        {
            id: 0,
            post: doc.post,
            placeOfWord: doc.worknow,
            dateStart: f,
            isWorking: doc.isworking
        }] : [];
    if(!doc.language)
        doc.language = [];


    const newProfile = {
        /*personalContact*/
        id          : doc.id,
        fio         : doc.fio ,
        phone       : doc.phone ,
        email       : doc.email ,
        oldPassword : "",
        newPassword : "",
        
        /*personEducation*/
        arrayMainInstitution     : arrayMain,
        arraySecondInstitution   : arraySecond,
        degree : { 'name' : doc.academicdegree },
        /*personExperience*/
        expWork      : doc.experience,
        arrayExpWork : work,
        category : doc.category,

        /*personInformation */
        langData  : doc.language,
        priceData : doc.consultationPrice,
        consultChildren : doc.isChildConsult,
        freeConsult : doc.isFreeConsult,

        /*experience: doc.experience || "Нет опыта",*/
        isWorking : doc.isworking ||  true,

        post      : doc.post,
        datebirth : doc.datebirth,
        sex       : doc.sex,
        academicstatus      : doc.academicstatus,
        academicstatusdoc   : doc.academicstatusdoc,
        copycontract        : doc.copycontract,
        academicdegreedoc   : doc.academicdegreedoc,
        active              : doc.active,
        avatar              : doc.avatar
    };

    return newProfile;
};

export const compileToServerDoctor = (doc) => {
    let arrayMain = [];
    let arraySecond = [];
    // цикл
    for(let i = 0; i < doc.arrayMainInstitution.length; i++){

        let date1 = Math.floor(+doc.arrayMainInstitution[i].mainDateStart.format('x') / 1000);
        let date2 = Math.floor(+doc.arrayMainInstitution[i].mainDateEnd.format('x') / 1000);

        arrayMain.push({
            id               : i,
            education        : doc.arrayMainInstitution[i].mainInstitution ,
            speciality       : doc.arrayMainInstitution[i].mainSpecialty,
            finishucationyear : [ date1, date2],
            diplomphoto       : doc.arrayMainInstitution[i].documents
        })
    }
    for(let i = 0; i < doc.arraySecondInstitution.length; i++){
        let date11 = null;
        let date22 = null;
        if (doc.arraySecondInstitution[i].secondDateStart)  {
            date11 = Math.floor( +doc.arraySecondInstitution[i].secondDateStart.format('x') / 1000);
            date22 = Math.floor( +doc.arraySecondInstitution[i].secondDateEnd.format('x') / 1000);
        }
        else {
            date11 = Math.floor( +doc.arraySecondInstitution[i].dateStart.format('x') / 1000);
            date22 = Math.floor( +doc.arraySecondInstitution[i].dateEnd.format('x') / 1000);
        }

        const spec = doc.arraySecondInstitution[i].secondSpecialty;
        arraySecond.push({
            id               : i,
            education        : doc.arraySecondInstitution[i].secondInstitution + " " + spec,//есть только doc.education
            ucationyears     : [ date11, date22],
            diplomphoto      : doc.arraySecondInstitution[i].documents
        })
    }
    let worknow = null;
    let post = null;
    let workdate = null;
    let copycontract = null;

    if(doc.arrayExpWork[0]){
        worknow = doc.arrayExpWork[doc.arrayExpWork.length-1].placeOfWord;
        post = doc.arrayExpWork[doc.arrayExpWork.length-1].post;
        workdate = String(Math.floor(+doc.arrayExpWork[doc.arrayExpWork.length-1].dateStart.format('x') / 1000));
        copycontract =  doc.arrayExpWork[doc.arrayExpWork.length-1].documents;
    }

    const newDoctor = {
        "email": doc.email,
        "fio": doc.fio,
        "phone": doc.phone,
        "sex": doc.sex, //
        "datebirth": doc.datebirth,
        "educationsgroup1": arrayMain,
        "educationsgroup2": arraySecond,
        "worknow": worknow,
        "post": post,
        "workdate": workdate,
        "category": doc.category,
        "academicdegree": doc.degree.name,
        "academicdegreedoc": doc.degree.documents, // зачем
        "academicstatus": doc.academicstatus,
        "academicstatusdoc": doc.academicstatusdoc,
        "copycontract": copycontract,
        "language": doc.langData,
        "consultationPrice": doc.priceData,
        "isChildConsult": doc.consultChildren,
        "isFreeConsult": doc.freeConsult,
        "id": doc.id,

        "experience": doc.experience,
        "isworking" : doc.isWorking,

        "oldPassword" : doc.oldPassword,
        "newPassword" : doc.newPassword,
        "active"      : doc.active,
        "avatar"      : doc.avatar
    };

    return newDoctor;
};