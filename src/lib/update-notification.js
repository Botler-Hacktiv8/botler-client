import { updateSchedule } from '../lib/assign-schedule'

module.exports = {
  async rescheduleAll (tasks, user, travelTimeInSecond = 0, currentUserCoordinate = null) {
    tasks.forEach(task => {
      updateSchedule(task, user, travelTimeInSecond, currentUserCoordinate)
    })
  }
}