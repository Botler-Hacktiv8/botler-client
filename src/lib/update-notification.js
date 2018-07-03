import { updateSchedule } from '../lib/assign-schedule'

module.exports = {
  async rescheduleAll (tasks, user, travelTimeInSecond, currentUserCoordinate) {
    tasks.forEach(task => {
      updateSchedule(task, user, travelTimeInSecond, currentUserCoordinate)
    })
  }
}