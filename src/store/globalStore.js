import Vue from "vue";
import Vuex from "vuex";
import backendUrl from '@/services/axios/backendUrl'
Vue.use(Vuex);


import shared from "./modules/shared";
import auth from "./modules/auth";
import roles from "./modules/roles-and-permissions";
import policies from "./modules/policies";
import marketplace from "./modules/marketplace";
import annual from "./modules/annual"
import filefolders from "./modules/filefolders"
import exams from "./modules/exams"
import risks from "./modules/risks";
import bankAccounts from "./modules/bank_accounts";
import stripeAccounts from "./modules/stripe_accounts";
import projects from "./modules/projects";
import tasks from "./modules/tasks";
import settings from "./modules/settings";
import work_experiences from "./modules/work_experiences";


const URL_PROJECT_SHOW = "/business/projects/:id";
const URL_PROJECT_POST = `/business/project_posts/:id`;
const URL_API_PROJECT = `/api${URL_PROJECT_SHOW}`;
const URL_API_PROJECT_APPLICATIONS = `/api${URL_PROJECT_SHOW}/applications`;
const URL_API_PROJECT_HIRES = `/api${URL_PROJECT_SHOW}/hires`;
const URL_POST_LOCAL_PROJECT = "/business/projects/new/:id";


const URL_MY_PROJECT_SHOW = '/specialist/my-projects/:id'
const URL_API_MY_PROJECT = '/api/specialist/projects/:id'
const URL_API_MY_PROJECTS = '/api/specialist/projects/my'


const URL_POLICIES_SHOW = "/business/compliance_policies/:id";
const URL_RISKS_SHOW = "/business/risks/:id";

const URL_PROJECT_TIMESHEET = '/specialist/my-projects/:id/timesheets'
const URL_PROJECT_TIMESHEETS = `${URL_PROJECT_SHOW}/timesheets`;
const URL_API_PROJECT_TIMESHEET = '/api/specialist/projects/:id/timesheets'
const URL_API_PROJECT_TIMESHEETS = `/api${URL_PROJECT_TIMESHEETS}`;


const URLS = {
	URL_PROJECT_SHOW,
	URL_PROJECT_POST,
	URL_API_PROJECT,
	URL_API_PROJECT_APPLICATIONS,
	URL_API_PROJECT_HIRES,
	URL_POST_LOCAL_PROJECT,
	URL_PROJECT_TIMESHEETS,
	URL_API_PROJECT_TIMESHEETS,

	URL_MY_PROJECT_SHOW,
	URL_API_MY_PROJECT,
	URL_API_MY_PROJECTS,

	URL_POLICIES_SHOW,
	URL_RISKS_SHOW,

	
	URL_PROJECT_TIMESHEET,
	URL_API_PROJECT_TIMESHEET,
}



const store = new Vuex.Store({
	getters: {
		url: () => (url, id) => URLS[url].replace(":id", id),
		backendUrl: () => backendUrl,
		authHeaders: state => ({ headers: { 'Authorization': state.auth.accessToken }})
	},

	modules: {
		policies,
		risks,
		// policies: {
		//   namespaced: true,
		//   ...policies,
		//   // archives: {
		//   //
		//   // }
		// },
		auth,
		shared,
		work_experiences,
		annual: {
			namespaced: true,
			...annual,
		},
		filefolders: {
			namespaced: true,
			...filefolders,
		},
		marketplace: {
			namespaced: true,
			...marketplace,
		},
		exams: {
			namespaced: true,
			...exams,
		},
		settings: {
			namespaced: true,
			...settings,
		},
		reminders: {
			namespaced: true,
			...tasks,
		},
		projects: {
			namespaced: true,
			...projects,
		},
		roles: {
			namespaced: true,
			...roles,
		},
		stripe_accounts: {
			namespaced: true,
			...stripeAccounts
		},
		bank_accounts: {
			namespaced: true,
			...bankAccounts
		}
	},
});

export default store;
