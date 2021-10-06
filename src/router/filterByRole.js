const DENY_FOR_BASIC_ROLE = [
	'project-timesheets',
	'annual-reviews',
	'annual-reviews-general',
	'annual-reviews-review-category',
	'settings-users',
	'settings-roles',
	'settings-subscriptions',
	'settings-billings',
	'exam-management',
	'exam-management-current-review',
	'exam-portal',
	'reports-organizations',
	'reports-financials',
	'specialists-marketplace'
]

const DENY_FOR_TRUSTED_ROLE = [
	'settings-billings',
	'reports-financials'
]
  
export default function isDenyRouteByRole(routeName, role) {
	if (role === 'basic') return DENY_FOR_BASIC_ROLE.includes(routeName)
	if (role === 'trusted') return DENY_FOR_TRUSTED_ROLE.includes(routeName)
	return false
 }
  