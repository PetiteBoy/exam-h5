import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Home from '@/components/Home'

import UserAdmin from '@/components/User/Admin'
import UserEducationRecord from '@/components/User/EducationRecord'
import UserExamRecord from '@/components/User/ExamRecord'
import UserPrint from '@/components/User/Print'

import ExamineIndex from '@/components/Examine/Index'
import ExamineVideoNotice from '@/components/Examine/Video/Notice'
import ExamineVideoList from '@/components/Examine/Video/List'
import ExamineVideoInfo from '@/components/Examine/Video/Info'

import ExamineExamineNotice from '@/components/Examine/Examine/Notice'
import ExamineExamineExamine from '@/components/Examine/Examine/Examine'
import ExamineExamineResult from '@/components/Examine/Examine/Result'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Login
  }, {
    path: '/Login',
    component: Login
  }, {
    path: '/Home',
    component: Home,
    children: [{
      path: '/',
      component: ExamineIndex
    }, {
      path: '/User/Admin',
      component: UserAdmin
    }, {
      path: '/User/EducationRecord',
      component: UserEducationRecord
    }, {
      path: '/User/ExamRecord',
      component: UserExamRecord
    }, {
      path: '/User/Print',
      component: UserPrint
    }, {
      path: '/Examine/Video/Notice',
      component: ExamineVideoNotice
    }, {
      path: '/Examine/Video/List',
      component: ExamineVideoList
    }, {
      path: '/Examine/Video/Info',
      component: ExamineVideoInfo
    }, {
      path: '/Examine/Examine/Notice',
      component: ExamineExamineNotice
    }]
  }, {
    path: '/Examine/Examine/Examine',
    component: ExamineExamineExamine
  }, {
    path: '/Examine/Examine/Result',
    component: ExamineExamineResult
  }]
})
