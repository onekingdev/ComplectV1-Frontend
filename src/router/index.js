import Vue from "vue"
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
Vue.use(VueRouter)

// LAYOUTS
const AuthLayout = () => import('@/layouts/Auth')
const MainLayout = () => import('@/layouts/Main')

// COMMON
const PageNotFound = () => import ('@/common/PageNotFound')
const AccessDenied = () => import ('@/common/AccessDenied')
const PaymentRequired = () => import ('@/common/PaymentRequired')

// AUTH
const SignIn = () => import ('@/auth/SingIn/Page')
const SignUp = () => import ('@/auth/SignUp/Page')
const SignUpEmployee = () => import ('@/auth/SignUp/Employee/Page')
const ResetPassword = () => import ('@/auth/ResetPassword/Page')
const ChangePassword = () => import ('@/auth/ChangePassword/Page')
const Verification = () => import ('@/auth/components/OtpConfirm')
const BusinessOnboarding = () => import ('@/auth/SignUp/Onboarding/Business/BusinessPage')
const SpecialistOnboarding = () => import ('@/auth/SignUp/Onboarding/Specialist/SpecialistPage')

// BUSINESS
const Dashboard = () => import ('@/business/dashboard/Page')
const Projects = () => import ('@/business/projects/Page')
const ProjectReview = () => import ('@/business/projects/ShowPage')
const PostProjectPage = () => import ('@/business/projects/PostProjectPage')
const ShowPostPage = () => import ('@/business/projects/ShowPostPage')
const ProjectTimesheetsShowPage = () => import ('@/business/projects/TimesheetsShowPage')
const Tasks = () => import ('@/business/tasks/Page')
const Policies = () => import ('@/business/policies/Page')
const PoliciesEntire = () => import ('@/business/policies/PoliciesEntire')
const PolicyCurrentNoSections = () => import ('@/business/policies/Details/PolicyDetailsWithoutSections')
const AnnualReviews = () => import ('@/business/annual/Page')
const AnnualReviewsCurrentGeneral = () => import ('@/business/annual/PageCurrentGeneral')
const AnnualReviewsCurrentReviewCategory = () => import ('@/business/annual/PageCurrentReviewCategory')
const Risks = () => import ('@/business/riskregister/Page')
const RiskDetail = () => import ('@/business/riskregister/RiskDetail')
const ReportsRisks = () => import ('@/business/reportsrisks/Page')
const ReportsOrganizations = () => import ('@/business/organizations/Page.vue')
const ReportsFinancials = () => import ('@/business/financials/Page.vue')
const FileFolders = () => import ('@/business/filefolders/Page')
const Exams = () => import ('@/business/exams/Page')
const ExamCurrentReview = () => import ('@/business/exams/PageCurrentReviewExam')
const Profile = () => import ('@/business/profile/Page')
const Settings = () => import ('@/business/settings/Page')
const SettingsNotifications = () => import ('@/business/notifications/Page')
const SpecialistsMarketplace = () => import ('@/business/marketplace/Page')
const PageAuditorPortalExternalAccess = () => import ('@/business/exams/PageAuditorPortalExternalAccess')
const PageAuditorPortalInternalAccess = () => import ('@/business/exams/PageAuditorPortalInternalAccess')
// const PolicyCurrent = () => import ('@/business/policies/Details/PolicyCreate')

// SPECIALISTS
const DashboardS = () => import ('@/specialist/dashboard/Page')
const ProjectsS = () => import ('@/specialist/projects/MyProjectsPage')
const ProjectReviewS = () => import ('@/specialist/projects/MyProjectShowPage')
const CreateProposalPage = () => import ('@/specialist/projects/CreateProposalPage')
const ProjectTimesheetsPage = () => import ('@/specialist/projects/ProjectTimesheetsPage')
const SettingsS = () => import ('@/specialist/settings/Page')
const SettingsNotificationsS = () => import ('@/specialist/notifications/Page')
const ProjectsMarketplaceS = () => import ('@/specialist/projects/IndexPage')
const ProfileS = () => import ('@/specialist/profile/Page')
const SpecialistTasksPage = () => import ('@/specialist/tasks/Page')

const paramsToInts = paramNames =>
  route => Object.fromEntries(paramNames.map(paramName => [paramName, +route.params[paramName]]))



const router = new VueRouter({
  routes: [
    //NOT FOUND
    { path: "*", component: PageNotFound },

    //ROLES AND PERMISSIONS
    { path: "/access-denied", component: AccessDenied },
    { path: "/payment-required", component: PaymentRequired },

    // REDIRECTS
    // { path: '/business', redirect: '/business/dashboard' },
    // { path: '/business/dashboard', redirect: '/business/dashboard' },
    // { path: '/specialist', redirect: '/specialist/dashboard' },
    // { path: '/specialist/dashboard', redirect: '/specialist/dashboard' },
    { path: '/business/new', redirect: '/business/onboarding' },
    { path: '/specialists/new', redirect: '/specialist/onboarding' },

    // AUTH
    { path: '/', component: AuthLayout,
      children:  [
        { path: '/', name: 'home', component: SignIn },
        { path: '/users/sign_in', name: 'sign-in', component: SignIn },
        { path: '/users/sign_up', name: 'sign-up', component: SignUp },
        { path: '/employee/new', name: 'sign-up-employee', props: true, component: SignUpEmployee },
        { path: '/users/password/new', name: 'password-new', component: ResetPassword },
        { path: '/users/password/edit', name: 'password-change', component: ChangePassword },
        { path: '/verification', name: 'verification', component: Verification, props: true },
        { path: '/business/onboarding', name: 'business-onboarding', component: BusinessOnboarding, props: true },
        { path: '/businesses/new', name: 'business-onboarding-new', component: BusinessOnboarding, props: true },
        { path: '/specialist/onboarding', name: 'specialist-onboarding', component: SpecialistOnboarding, props: true },
        { path: '/specialist/new', name: 'specialist-onboarding-new', component: SpecialistOnboarding, props: true },
      ]
    },

    // MAIN
    { path: '/', component: MainLayout,
      // BUSINESS
      children:  [
        { path: '/business', name: 'dashboard', component: Dashboard },
        { path: '/business/projects', name: 'projects', component: Projects },
        { path: '/business/projects/:id(\\d+)', name: 'project-review', props: route => ({ projectId: +route.params.id }), component: ProjectReview },
        { path: '/business/projects/:id(\\d+)/timesheets', name: 'project-timesheets', props: route => ({ projectId: +route.params.id }), component: ProjectTimesheetsShowPage },
        { path: '/business/projects/new', name: 'project-post', component: PostProjectPage },
        { path: '/business/projects/new/:id(\\d+)', name: 'project-post-from-local', props: route => ({ localProjectId: +route.params.id }), component: PostProjectPage },
        { path: '/business/project_posts/:id(\\d+)', name: 'project-post-view', props: route => ({ projectId: +route.params.id }), component: ShowPostPage },
        { path: '/business/project_posts/:id(\\d+)/edit', name: 'project-post-edit', props: route => ({ projectId: +route.params.id }), component: PostProjectPage },
        { path: '/business/reminders', name: 'tasks', component: Tasks },
        { path: '/business/compliance_policies', name: 'policies', component: Policies, beforeEnter: AuthGuard },
        { path: '/business/compliance_policies/entire', name: 'policies-entire', props: true, component: PoliciesEntire, beforeEnter: AuthGuard },
        { path: '/business/compliance_policies/:policyId(\\d+)', name: 'policy-current', props: route => ({ policyId: +route.params.policyId, toggleVueEditor: route.params.toggleVueEditor }), component: PolicyCurrentNoSections, beforeEnter: AuthGuard },
        { path: '/business/annual_reviews', name: 'annual-reviews', component: AnnualReviews, beforeEnter: AuthGuard },
        { path: '/business/annual_reviews/:annualId(\\d+)', name: 'annual-reviews-general', props: route => ({ annualId: +route.params.annualId }), component: AnnualReviewsCurrentGeneral, beforeEnter: AuthGuard },
        { path: '/business/annual_reviews/:annualId(\\d+)/:revcatId(\\d+)', name: 'annual-reviews-review-category', props: route => ({ annualId: +route.params.annualId, revcatId: +route.params.revcatId }), component: AnnualReviewsCurrentReviewCategory, beforeEnter: AuthGuard },
        { path: '/business/risks', name: 'risks', component: Risks, beforeEnter: AuthGuard },
        { path: '/business/risks/:riskId(\\d+)', name: 'risk-review', props: route => ({ riskId: +route.params.riskId }), component: RiskDetail, beforeEnter: AuthGuard },
        { path: '/business/file_folders', name: 'file-folders', component: FileFolders, beforeEnter: AuthGuard },
        { path: '/business/exam_management', name: 'exam-management', component: Exams, beforeEnter: AuthGuard },
        { path: '/business/exam_management/:examId(\\d+)', name: 'exam-management-current-review', props: route => ({ examId: +route.params.examId }), component: ExamCurrentReview, beforeEnter: AuthGuard },
        { path: '/business/reports/risks', name: 'reports-risks', component: ReportsRisks, beforeEnter: AuthGuard },
        { path: '/business/reports/organizations', name: 'reports-organizations', component: ReportsOrganizations, beforeEnter: AuthGuard },
        { path: '/business/reports/financials', name: 'reports-financials', component: ReportsFinancials, beforeEnter: AuthGuard },
        { path: '/business/profile', name: 'profile', component: Profile},
        { path: '/business/settings', name: 'settings', component: Settings,
          children:  [
            { path: '/business/settings/general', name: 'settings-general', component: Settings, },
            { path: '/business/settings/users', name: 'settings-users', component: Settings, },
            { path: '/business/settings/roles', name: 'settings-roles', component: Settings, },
            { path: '/business/settings/security', name: 'settings-security', component: Settings, },
            { path: '/business/settings/subscriptions', name: 'settings-subscriptions', component: Settings, },
            { path: '/business/settings/billings', name: 'settings-billings', component: Settings, },
            { path: '/business/settings/notifications', name: 'settings-notifications', component: Settings, }
          ],
        },
        { path: '/business/settings/notification-center', name: 'settings-notification-center', component: SettingsNotifications },
        { path: '/specialistmarketplace', name: 'specialists-marketplace', component: SpecialistsMarketplace },
        { path: '/exams/:examUuid(.{36})', component: PageAuditorPortalExternalAccess, props: true },
        { path: '/business/exam_management/:examId(\\d+)/portal', component: PageAuditorPortalInternalAccess, props: paramsToInts(['examId']) },
        
        // SPECIALISTS
        { path: '/specialist', name: 'dashboard-specialist', component: DashboardS },
        { path: '/specialist/reminders', name: 'tasks-specialist', component: SpecialistTasksPage },
        { path: '/specialist/my-projects', name: 'projects-specialist', component: ProjectsS },
        { path: '/specialist/my-projects/:id(\\d+)', name: 'project-review-specialist', props: paramsToInts(['id']), component: ProjectReviewS },
        { path: '/specialist/settings', name: 'settings-specialist', component: SettingsS,
          children:  [
            { path: '/specialist/settings/general', name: 'settings-general-specialist', component: SettingsS, },
            { path: '/specialist/settings/roles', name: 'settings-roles-specialist', component: SettingsS, },
            { path: '/specialist/settings/security', name: 'settings-security-specialist', component: SettingsS, },
            { path: '/specialist/settings/subscriptions', name: 'settings-subscriptions-specialist', component: SettingsS, },
            { path: '/specialist/settings/billings', name: 'settings-billings-specialist', component: SettingsS, },
            { path: '/specialist/settings/notifications', name: 'settings-notifications-specialist', component: SettingsS, }
          ],
        },
        { path: '/specialist/settings/notification-center', name: 'settings-notification-center-specialist', component: SettingsNotificationsS },
        { path: '/job_board', name: 'projects-marketpalce-specialist', component: ProjectsMarketplaceS },
        { path: '/job_board/:initialOpenId(\\d+)', name: 'projects-marketpalce-specialist-view', props: paramsToInts(['initialOpenId']), component: ProjectsMarketplaceS },
        { path: '/job_board/:projectId(\\d+)/applications/new', name: 'projects-marketplace-create-proposal', props: paramsToInts(['projectId']), component: CreateProposalPage, beforeEnter: AuthGuard },
        { path: '/specialist/my-projects/:id(\\d+)/timesheets', name: 'my-project-timesheet-page', props: paramsToInts(['id']), component: ProjectTimesheetsPage },
        { path: '/specialist/profile', name: 'profile-specialist', component: ProfileS },
      ]
    }
  ],
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   let auth = false
//   if(to.name !== 'sign-in' && !auth) next({ name: 'sign-in' })
//   else next()
// })


export default router