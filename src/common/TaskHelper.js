import { DateTime } from 'luxon'

const isProject = task => task.hasOwnProperty('starts_on') && task.hasOwnProperty('ends_on')
const isTask = task => task.hasOwnProperty('remindable_type')
const isOverdue = task => (task.end_date || task.ends_on) && DateTime.fromISO(task.end_date || task.ends_on) <= DateTime.local().minus({ days: 1 })
const isRepeat = task => task.repeat_every || task.repeat_on || task.repeats
const isComplete = task => {
  const { oid } = splitReminderOccurenceId(task.id)
  if (oid !== null) {
    return task.done_occurencies.hasOwnProperty(`${oid}`)
  } else {
    return (task.completed_at || task.done_at)
  }
}
const toEvent = (task) => ({
  ...task,
  ...splitReminderOccurenceId(task.id),
  start: task.starts_on || task.remind_at,
  end: ( task.end_date || task.ends_on )+" 20:00:00",
  title: task.title || task.body,
  icons: iconArray(task)
})
const cssClass = task => isComplete(task) ? 'task-is-complete'
                       : isOverdue(task) ? 'task-is-overdue'
                       : isProject(task) ? 'task-is-project'
                       : isTask(task) ? 'task-is-task'
                       : isRepeat(task) ? 'task-is-repeat' : ''
const iconArray = (task) => [
  isComplete(task) ? 'checkbox-outline' : isOverdue(task) ? 'warning' : null,
  isProject(task) ? 'list-outline' : isTask(task) ? 'checkbox-outline' : null
].filter(i => i).filter((v, i, a) => a.indexOf(v) === i)
const splitReminderOccurenceId = val => {
  const matches = [...`${val}`.matchAll(/(\d+)_(\d+)/ig)]
  return (matches && matches[0])
    ? { taskId: +matches[0][1], oid: +matches[0][2] }
    : { taskId: val, oid: null }
}
const badgeClass = project => project.status_business == "Pending" ? 'badge-secondary'
                            : project.status_business == "In Progress" ? "badge-progress"
                            : project.status_business == "Complete" ? "badge-success"
                            : project.status_business == "Draft" ? 'badge-secondary'
                            : project.status_business == "Published" ? 'badge-success'
                            : isOverdue(project) ? "badge-warning" : ''

const businessProjectBadgeClass = project => project.status_business == "Not Started" ? 'badge-secondary'
                                           : project.status_business == "In Progress" ? "badge-progress"
                                           : project.status_business == "Complete" ? "badge-success"
                                           : project.status_business == "Draft" ? 'badge-light'
                                           : project.status_business == "Pending" ? 'badge-light' : ''

const specialistProjectBadgeClass = project => project.status == "Not Started" ? 'badge-specialist-not-started'
                            : project.status == "In Progress" ? "badge-specialist-progress"
                            : project.status == "Complete" ? "badge-specialist-complete"
                            : project.status == "Draft" ? 'badge-specialist-draft'
                            : project.status == "Pending" ? 'badge-specialist-pending' : ''

const linkedTo = linkableType => linkableType.linkable_type === 'CompliancePolicy' ? 'document-text'
                               : linkableType.linkable_type === "AnnualReport" ? "reader"
                               : linkableType.linkable_type === "LocalProject" ? "list-circle"
                               : linkableType.linkable_type === "Exam" ? "list-circle" : ''

const linkedToClass = linkableType => linkableType.linkable_type === 'CompliancePolicy' ? 'black'
                                    : linkableType.linkable_type === "AnnualReport" ? "yellow"
                                    : linkableType.linkable_type === "LocalProject" ? "blue"
                                    : linkableType.linkable_type === "Exam" ? "red" : ''

export { isProject, isTask, isOverdue, isRepeat, isComplete, toEvent, cssClass, splitReminderOccurenceId, iconArray, badgeClass, businessProjectBadgeClass, specialistProjectBadgeClass, linkedTo, linkedToClass }
