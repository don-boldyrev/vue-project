import VueRouter from 'vue-router'
import EditSession from './components/pages/EditSession/EditSession'
import SessionSettingsTbl from './components/pages/SessionSettingsTbl/SessionSettingsTbl'

export default new VueRouter ({
    routes: [
        {
            path: '',
            redirect: '/SessionSettings'
        },
        {
            path: '/SessionSettings',
            component: SessionSettingsTbl
        },
        {
            name: 'editSession',
            path: '/SessionSettings/Edit',
            component: EditSession,
        },
        {
            name: 'editSessionId',
            path: '/SessionSettings/Edit/:id',
            component: EditSession,
        }
    ]
    //mode: 'history'
})