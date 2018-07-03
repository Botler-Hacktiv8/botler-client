// @ import module here
import { getFiredate } from './get-firedate';
import PushNotification from 'react-native-push-notification';
import { Linking } from 'react-native';

module.exports = {
  async assignSchedule(home, destination, timeStart, objUser, objTask) {
    // @ firedate
    let fireDate = await getFiredate(home, destination, new Date(timeStart));
    console.log('firedate ->', fireDate[0]);

    let activityDateObj = new Date(objTask.timeStart);
    let timeBeginActivity = `${activityDateObj.getHours()}:${activityDateObj.getMinutes()}`;

    // @ obj for id
    let newObjActivity = new Date(objTask.createdAt);
    let notificationId = `${newObjActivity.getDate()}${newObjActivity.getHours()}${newObjActivity.getMinutes()}`;

    PushNotification.configure({
      onNotification: function(notification) {
        // console.log('onNotification', notification);
        Linking.openURL(`https://www.google.co.id/maps/dir/${home}/${destination}`);
      }
    })

    PushNotification.localNotificationSchedule({
      id: notificationId,
      title: `Lakukan persiapan untuk aktivitas`,
      message: `Aktivitas pada ${timeBeginActivity} memiliki waktu tempuh ${fireDate[1]}`,
      date: fireDate[0], // new Date(Date.now() + (3 * 1000))
      bigText: `Aktivitas anda "${objTask.text}" akan dimulai pada ${timeBeginActivity}. Perkiraan waktu tempuh adalah ${fireDate[1]}`,
      vibrate: true,
      vibration: 300
    })
  },
  cancelSchedule(objTask) {
    // @ obj for id
    let newObjActivity = new Date(objTask.createdAt);
    let notificationId = `${newObjActivity.getDate()}${newObjActivity.getHours()}${newObjActivity.getMinutes()}`;
    console.log('deleted task', notificationId);

    PushNotification.cancelLocalNotifications({ id: notificationId });
  }
}

/*
const { getFiredate } = require('./get-firedate');
const home = 'Bogor, Kp. Parung Jambu, Bogor City, West Java';
const dest = 'Jalan Sultan Iskandar Muda No.7, RT.5/RW.9, Kebayoran Lama Selatan, Kebayoran Lama, RT.5/RW.9, Kby. Lama Sel., Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240';
(async () => {
  console.log('hello')
  const result = await getFiredate(home, dest, new Date('Sun Jul 01 2018 14:21:39 GMT+0700'));
  console.log(result.getHours() +'' +result.getMinutes() +'' +result.getSeconds());
})();
*/