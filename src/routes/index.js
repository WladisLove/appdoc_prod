import MainPage from '../containers/MainPage'
import Schedule from '../containers/Schedule'
import Treatment from '../containers/Treatment'
import Patients from '../containers/Patients'
import PatientsPage from '../containers/PatientsPage'
import PersonalInfo from '../containers/PersonalInfo'
import Reviews from '../containers/Reviews'

import Chat from '../containers/Chat'

export const appRoutes = [
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
        path: '/patients-page',
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

export const menuItems =[
    {name: '', title: 'Главная', iconType: 'dashboard', svg: true},
    {name: 'chat', title: 'Чат', iconType: 'incoming-calls', svg: true},
    {name: 'schedule', title: 'График работы', iconType: 'calendar', svg: true},
    {name: 'treatment', title: 'Обращения', iconType: 'order-form', svg: true},
    {name: 'patients', title: 'Мои пациенты', iconType: 'user',},
    {name: 'personal-info', title: 'Личные данные', iconType: 'setting_edit', svg: true},
    {name: 'reviews', title: 'Отзывы пациентов', iconType: 'chat', svg: true},
];

