// import LandingPage from '@/module/page/landing/Container'
import { lazy } from 'react'

const HomePage = lazy(() => import('@/module/page/home/Container'))
const SSOPage = lazy(() => import('@/module/page/sso/Container'))
const DeveloperPage = lazy(() => import('@/module/page/developer/Container'))
const DeveloperLearnPage = lazy(() => import('@/module/page/developer/learn/Container'))
const DeveloperSearchPage = lazy(() => import('@/module/page/developer/search/Container'))
const LeaderPage = lazy(() => import('@/module/page/leader/Container'))
const Cr100Page = lazy(() => import('@/module/page/cr_100/Container'))
const Emp35Page = lazy(() => import('@/module/page/empower_35/Container'))
const Ambassadors = lazy(() => import('@/module/page/ambassadors/Container'))
const CrVideo = lazy(() => import('@/module/page/static/cr-video/Container'))

const PrivacyPage = lazy(() => import('@/module/page/static/privacy/Container'))
const TermsPage = lazy(() => import('@/module/page/static/terms/Container'))

// this is the leaders link in the header
const DirectoryPage = lazy(() => import('@/module/page/directory/Container'))

const TeamsPage = lazy(() => import('@/module/page/teams/Container'))
const TasksPage = lazy(() => import('@/module/page/tasks/Container'))
const TaskDetailPage = lazy(() => import('@/module/page/task_detail/Container'))
const TaskApplicationPage = lazy(() => import('@/module/page/task_application/Container'))
const ProjectDetailPage = lazy(() => import('@/module/page/project_detail/Container'))
const TeamDetailPage = lazy(() => import('@/module/page/team_detail/Container'))
const CircleDetailPage = lazy(() => import('@/module/page/circle_detail/Container'))

const LoginPage = lazy(() => import('@/module/page/login/Container'))
const RegisterPage = lazy(() => import('@/module/page/register/Container'))
const ForgotPasswordPage = lazy(() => import('@/module/page/forgot_password/Container'))
const ResetPasswordPage = lazy(() => import('@/module/page/reset_password/Container'))

const HelpPage = lazy(() => import('@/module/page/static/help/Container'))
const FAQPage = lazy(() => import('@/module/page/static/faq/Container'))
const AboutPage = lazy(() => import('@/module/page/static/about/Container'))
const SlackPage = lazy(() => import('@/module/page/static/slack/Container'))
const EventsPage = lazy(() => import('@/module/page/static/events/Container'))
const EventPage = lazy(() => import('@/module/page/static/details/Container'))
const VisionPage = lazy(() => import('@/module/page/vision/Container'))

const ProfileInfoPage = lazy(() => import('@/module/page/profile/info/Container'))
const ProfileTasksPage = lazy(() => import('@/module/page/profile/tasks/Container'))
const ProfileTaskApplicationDetailPage = lazy(() => import('@/module/page/profile/task_candidate_detail/Container'))
const ProfileTeamsPage = lazy(() => import('@/module/page/profile/teams/Container'))
// import ProfileTeamCreatePage from '@/module/page/profile/team_create/Container'
const ProfileProjectsPage = lazy(() => import('@/module/page/profile/projects/Container'))
const ProfileSubmissionsPage = lazy(() => import('@/module/page/profile/submissions/Container'))
// import ProfileSubmissionCreatePage from '@/module/page/profile/submission_create/Container'
const ProfileCommunitiesPage = lazy(() => import('@/module/page/profile/communities/Container'))
const ProfileSubmissionDetailPage = lazy(() => import('@/module/page/profile/submission_detail/Container'))
const ProfileSuggestionListPage = lazy(() => import('@/module/page/profile/suggestion/list/Container'))

const MemberPage = lazy(() => import('@/module/page/member/Container'))

// admin pages
const TeamListPage = lazy(() => import('@/module/page/admin/teams/TeamListPage'))
const AdminSuggestionPage = lazy(() => import('@/module/page/admin/suggestion/list/Container'))
const AdminPermissionPage = lazy(() => import('@/module/page/admin/permission/main/Container'))
const AdminUsersPage = lazy(() => import('@/module/page/admin/users/Container'))
const AdminProfileDetailPage = lazy(() => import('@/module/page/admin/profile_detail/Container'))
const AdminFormsPage = lazy(() => import('@/module/page/admin/forms/Container'))

const CountryCommunitiesPage = lazy(() => import('@/module/page/admin/community/CountryCommunities/Container'))
const CommunityDetailPage = lazy(() => import('@/module/page/admin/community/CommunityDetail/Container'))

const PublicCountryCommunitiesPage = lazy(() => import('@/module/page/community/PublicCountryCommunities/Container'))
const PublicCommunityDetailPage = lazy(() => import('@/module/page/community/PublicCommunityDetail/Container'))

const TaskCreatePage = lazy(() => import('@/module/page/task_create/Container'))

// external forms
const FormTraining1Page = lazy(() => import('@/module/page/form_ext/training_1/Container'))

// council
const CouncilSecretariatPage = lazy(() => import('@/module/page/council_secretariat/Container'))
const SecretariatPositionPage = lazy(() => import('@/module/page/council_secretariat/SecretariatPosition/Container'))
const CouncilPage = lazy(() => import('@/module/page/council/Container'))
const CouncilListPage = lazy(() => import('@/module/page/council/list/Container'))
const CouncilDetailPage = lazy(() => import('@/module/page/council/detail/Container'))

// candidates
const CandidatesPage = lazy(() => import('@/module/page/candidates/Container'))

// import CVoteCreatePage from '@/module/page/CVote/create/Container'
const CVoteDetailPage = lazy(() => import('@/module/page/CVote/detail/Container'))
const CVoteEditPage = lazy(() => import('@/module/page/CVote/edit/Container'))

// what's new
const ReleaseList = lazy(() => import('@/module/page/release/list/Container'))

// suggestion
const SuggestionListPage = lazy(() => import('@/module/page/suggestion/list/Container'))
const SuggestionCreatePage = lazy(() => import('@/module/page/suggestion/create/Container'))
const SuggestionEditPage = lazy(() => import('@/module/page/suggestion/edit/Container'))
const SuggestionDetailPage = lazy(() => import('@/module/page/suggestion/detail/Container'))
const SuggestionEditHistoryPage = lazy(() => import('@/module/page/suggestion/edit_history/Container'))

// elips
const ElipListPage = lazy(() => import('@/module/page/elip/Container'))
const ElipNewPage = lazy(() => import('@/module/page/elip/new/Container'))
const ElipDetailPage = lazy(() => import('@/module/page/elip/detail/Container'))
const ElipEditPage = lazy(() => import('@/module/page/elip/edit/Container'))

const WhitepaperPage = lazy(() => import('@/module/page/whitepaper/Container'))

const NotFound = lazy(() => import('@/module/page/error/NotFound'))

export default [
  {
    path: '/',
    page: HomePage,
  },
  {
    path: '/home',
    page: HomePage,
  },
  {
    path: '/whitepaper',
    page: WhitepaperPage,
  },
  {
    path: '/sso/login',
    page: SSOPage,
  },
  {
    path: '/cr100',
    page: Cr100Page,
  },
  {
    path: '/crcles',
    page: Emp35Page,
  },
  {
    path: '/ambassadors',
    page: Ambassadors,
  },
  {
    path: '/developer',
    page: DeveloperPage,
  },
  {
    path: '/developer/learn',
    page: DeveloperLearnPage,
  },
  {
    path: '/developer/search',
    page: DeveloperSearchPage,
  },
  {
    path: '/developer/country/:country',
    page: DeveloperPage,
  },
  {
    path: '/developer/country/:country/region/:region',
    page: DeveloperPage,
  },
  {
    path: '/leader',
    page: LeaderPage,
  },
  {
    path: '/directory',
    page: DirectoryPage,
  },
  {
    path: '/teams',
    page: TeamsPage,
  },
  {
    path: '/tasks',
    page: TasksPage,
  },
  {
    path: '/task-detail/:taskId',
    page: TaskDetailPage,
  },
  {
    path: '/admin/task-detail/:taskId',
    page: TaskDetailPage,
  },
  {
    path: '/task-app/:taskId/:applicantId',
    page: TaskApplicationPage,
  },
  {
    path: '/task-create',
    page: TaskCreatePage,
  },
  /*
    ********************************************************************************
    * Login/Register
    ********************************************************************************
      */
  {
    path: '/login',
    page: LoginPage,
  },
  {
    path: '/register',
    page: RegisterPage,
  },
  {
    path: '/forgot-password',
    page: ForgotPasswordPage,
  },
  {
    path: '/reset-password',
    page: ResetPasswordPage,
  },
  /*
    ********************************************************************************
    * Minor Pages
    ********************************************************************************
      */
  {
    path: '/help',
    page: HelpPage,
  },
  {
    path: '/faq',
    page: FAQPage,
  },
  {
    path: '/about',
    page: AboutPage,
  },
  {
    path: '/slack',
    page: SlackPage,
  },
  {
    path: '/events',
    page: EventsPage,
  },
  {
    path: '/events/:eventId',
    page: EventPage,
  },
  {
    path: '/vision',
    page: VisionPage,
  },
  {
    path: '/join-cr',
    page: CrVideo,
  },
  {
    path: '/privacy',
    page: PrivacyPage,
  },
  {
    path: '/terms',
    page: TermsPage,
  },
  /*
     ********************************************************************************
     * What's new page
     ********************************************************************************
     */
  {
    path: '/what-is-new',
    page: ReleaseList,
  },
  /*
     ********************************************************************************
     * Suggestion page
     ********************************************************************************
     */
  {
    path: '/suggestion',
    page: SuggestionListPage,
  },
  {
    path: '/suggestion/create',
    page: SuggestionCreatePage,
  },
  {
    path: '/suggestion/:id/edit',
    page: SuggestionEditPage,
  },
  {
    path: '/suggestion/:id',
    page: SuggestionDetailPage,
  },
  {
    path: '/suggestion/history/:id',
    page: SuggestionEditHistoryPage,
  },
  {
    path: '/suggestions/:id',
    page: SuggestionDetailPage,
  },
  /*
   ********************************************************************************
   * ELIP page
   ********************************************************************************
   */
  {
    path: '/elips',
    page: ElipListPage,
  },
  {
    path: '/elips/new',
    page: ElipNewPage,
  },
  {
    path: '/elips/:id',
    page: ElipDetailPage,
  },
  {
    path: '/elips/:id/edit',
    page: ElipEditPage,
  },
  /*
    ********************************************************************************
    * Profile page
    ********************************************************************************
      */
  {
    path: '/profile/info',
    page: ProfileInfoPage,
  },
  {
    path: '/profile/tasks',
    page: ProfileTasksPage,
  },
  {
    path: '/profile/task-detail/:taskId',
    page: TaskDetailPage,
  },
  {
    path: '/profile/team-detail/:teamId',
    page: TeamDetailPage,
  },
  {
    path: '/profile/task-app/:taskId/:applicantId',
    page: ProfileTaskApplicationDetailPage,
  },
  {
    path: '/profile/projects',
    page: ProfileProjectsPage,
  },
  {
    path: '/profile/project-detail/:taskId',
    page: TaskDetailPage,
  },
  {
    path: '/project-detail/:taskId',
    page: ProjectDetailPage,
  },
  {
    path: '/profile/teams',
    page: ProfileTeamsPage,
  },
  // {
  //   path: '/profile/teams/create',
  //   page: ProfileTeamCreatePage,
  // },
  {
    path: '/team-detail/:teamId',
    page: TeamDetailPage,
  },
  {
    path: '/profile/submissions',
    page: ProfileSubmissionsPage,
  },
  // {
  //   path: '/profile/submissions/create',
  //   page: ProfileSubmissionCreatePage,
  // },
  {
    path: '/profile/communities',
    page: ProfileCommunitiesPage,
  },
  {
    path: '/profile/submission-detail/:submissionId',
    page: ProfileSubmissionDetailPage,
  },
  {
    path: '/crcles-detail/:circleId',
    page: CircleDetailPage,
  },
  {
    path: '/profile/suggestion',
    page: ProfileSuggestionListPage,
  },
  /*
    ********************************************************************************
    * External Forms
    ********************************************************************************
      */
  {
    path: '/form/training1',
    page: FormTraining1Page,
  },
  /*
    ********************************************************************************
    * Users
    ********************************************************************************
      */
  {
    // public profile page
    path: '/member/:userId',
    page: MemberPage,
  },
  /*
    ********************************************************************************
    * Admin
    ********************************************************************************
      */
  {
    path: '/admin/users',
    page: AdminUsersPage,
  },
  {
    path: '/admin/profile/:userId',
    page: AdminProfileDetailPage,
  },
  {
    path: '/admin/forms',
    page: AdminFormsPage,
  },
  {
    path: '/admin/community',
    page: CountryCommunitiesPage,
  },
  {
    path: '/admin/community/country/:country',
    page: CountryCommunitiesPage,
  },
  {
    path: '/admin/community/:community/country/:country',
    page: CommunityDetailPage,
  },
  {
    path: '/admin/community/:community/country/:country/region/:region',
    page: CommunityDetailPage,
  },
  {
    path: '/admin/suggestion',
    page: AdminSuggestionPage,
  },
  {
    path: '/admin/permission',
    page: AdminPermissionPage,
  },
  /*
    ********************************************************************************
    * Community
    ********************************************************************************
      */
  {
    path: '/community',
    page: PublicCountryCommunitiesPage,
  },
  {
    path: '/community/country/:country',
    page: PublicCountryCommunitiesPage,
  },
  {
    path: '/community/:community/country/:country',
    page: PublicCommunityDetailPage,
  },
  {
    path: '/community/:community/country/:country/region/:region',
    page: PublicCommunityDetailPage,
  },
  /*
    ********************************************************************************
    * TODO
    ********************************************************************************
      */
  {
    path: '/admin/teams',
    page: TeamListPage,
  },
  {
    path: '/admin/teams/:teamId',
    page: TeamDetailPage,
  },

  // council
  {
    path: '/proposals',
    page: CouncilPage,
  },
  {
    path: '/cvote/:id',
    page: CVoteDetailPage,
  },
  // {
  //   path: '/proposals/new',
  //   page: CVoteCreatePage,
  // },
  {
    path: '/proposals/:id',
    page: CVoteDetailPage,
  },
  {
    path: '/proposals/:id/edit',
    page: CVoteEditPage,
  },
  {
    path: '/council',
    page: CouncilSecretariatPage,
  },
  {
    path: '/position/secretariat/:id',
    page: SecretariatPositionPage,
  },
  {
    path: '/council/list',
    page: CouncilListPage,
  },
  {
    path: '/council/detail/:id',
    page: CouncilDetailPage,
  },

  // candidates
  {
    path: '/candidates',
    page: CandidatesPage,
  },

  // Other
  {
    page: NotFound,
  },
]
