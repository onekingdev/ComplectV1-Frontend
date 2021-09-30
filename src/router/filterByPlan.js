const DENY_FOR_FREE_PLAN = [
  'policies',
  'annual-reviews',
  'risks',
  'settings-users',
  'file-folders',
  'exam-management',
  'exam-portal',
  'reports-organizations',
  'reports-risks',
  'settings-notification-center'
]

const DENY_FOR_TEAM_PLAN = [
  'exam-portal'
]

export default function isDenyRoute(routeName, plan) {
  if (plan === 'free') return DENY_FOR_FREE_PLAN.includes(routeName)
  if (plan === 'team') return DENY_FOR_TEAM_PLAN.includes(routeName)

  return false
}
