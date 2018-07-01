// @ import module here
import { getFiredate } from './get-firedate';
import PushNotification from 'react-native-push-notification';

module.exports = {
  async assignSchedule(home, destination, timeStart, objUser = {}, objTask = {}) {
    // @ firedate
    let fireDate = await getFiredate(home, destination, new Date(timeStart));
    console.log('fireDate', fireDate);

    PushNotification.configure({
      onNotification: function(notification) {
        console.log('onNotification', notification);
      }
    })

    PushNotification.localNotificationSchedule({
      message: "My Notification Message",
      date: fireDate, // new Date(Date.now() + (3 * 1000))
      bigText: "My big text that will be shown when notification is expanded",
      color: "red",
      vibrate: true,
      vibration: 300,
      tag: 'ini_id_198239shiusbf938qhasjhasfu',
      /* iOS and Android properties */
      title: "My Notification Title",
    })
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