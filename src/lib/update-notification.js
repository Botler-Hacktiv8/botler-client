import { assignSchedule } from '../lib/assign-schedule'

module.exports = {
  async rescheduleAll (tasks, user, travelTimeInSecond) {
    tasks.forEach(task => {
      assignSchedule(user.address, task.address, timeStart, objUser, objTask)
    })
  }
}