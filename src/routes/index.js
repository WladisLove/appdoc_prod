import MainPage from '../containers/MainPage'
import Schedule from '../containers/Schedule'
import Treatment from '../containers/Treatment'
import Patients from '../containers/Patients'
import PatientsPage from '../containers/PatientsPage'
import PersonalInfo from '../containers/PersonalInfo'
import Reviews from '../containers/Reviews'
import MyDoctors from '../containers/MyDoctors'

import Chat from '../containers/Chat'
import DoctorPage from "../containers/DoctorPage";

export const docRoutes = [
    {
        path: '/',
        component: MainPage,
        exact: true,
    },
    {
        path: '/schedule',
        component: Schedule,
        exact: true,
    },
    {
        path: '/treatment',
        component: Treatment,
        exact: true,
    },
    {
        path: '/patients',
        component: Patients,
        exact: true,
    },
    {
        path: '/patient:id',
        component: PatientsPage,
        exact: true,
    },
    {
        path: '/personal-info',
        component: PersonalInfo,
        exact: true,
    },
    {
        path: '/chat',
        component: Chat,
        exact: true,
    },
    {
        path: '/reviews',
        component: Reviews,
        exact: true,
    },
];

export const patientRoutes = [
    {
        path: '/',
        component: MainPage,
        exact: true,
    },
    {
        path: '/calendar',
        component: Schedule,
        exact: true,
    },
    {
        path: '/treatment',
        component: Treatment,
        exact: true,
    },
    {
        path: '/doctors',
        component: MyDoctors,
        exact: true,
    },
    {
        path: '/doctor:id',
        component: DoctorPage,
        exact: true,
    },
    {
        path: '/personal-info',
        component: PersonalInfo,
        exact: true,
    },
    {
        path: '/chat',
        component: Chat,
        exact: true,
    },
    {
        path: '/reviews',
        component: Reviews,
        exact: true,
    },
];

export const menuDoc =[
    {name: '', title: 'Главная', iconType: 'dashboard', svg: true},
    {name: 'schedule', title: 'График работы', iconType: 'calendar', svg: true},
    {name: 'treatment', title: 'Обращения', iconType: 'order-form', svg: true},
    {name: 'patients', title: 'Мои пациенты', iconType: 'user',},
    {name: 'personal-info', title: 'Личные данные', iconType: 'setting_edit', svg: true},
    {name: 'reviews', title: 'Отзывы пациентов', iconType: 'chat', svg: true},
];

export const menuPatient =[
    {name: '', title: 'Главная', iconType: 'dashboard', svg: true},
    {name: 'calendar', title: 'Календарь', iconType: 'calendar', svg: true},
    {name: 'treatment', title: 'Обращения', iconType: 'order-form', svg: true},
    {name: 'doctors', title: 'Мои врачи', iconType: 'user',},
    {name: 'personal-info', title: 'Личные данные', iconType: 'setting_edit', svg: true},
    {name: 'reviews', title: 'Мои отзывы', iconType: 'chat', svg: true},
];

