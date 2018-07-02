const axios = require('axios');
const { GOOGLE_MAPS_API } = require('./../../config');

function getTimestamp(date) {
  return Math.round(date / 1000);
}

function timeBackTo (timeStart, value) {
  return new Date((getTimestamp(timeStart) - (value + 1200)) * 1000);
}

module.exports = {
  /**
   * 
   * @param {String} home 
   * @param {String} destination 
   * @param {Date} timeStart 
   */
  async getFiredate(home, destination, timeStart) {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${home}&destinations=${destination}&key=${GOOGLE_MAPS_API}`);
      const result = response.data.rows[0].elements[0].duration.value;
      let resultInText = response.data.rows[0].elements[0].duration.text;

      resultInText = resultInText.replace(/hours/i, 'jam')
      resultInText = resultInText.replace(/hour/i, 'jam')
      resultInText = resultInText.replace(/mins/i, 'menit')
      resultInText = resultInText.replace(/min/i, 'menit')

      return [timeBackTo(timeStart, result), resultInText];
    } catch(e) {
      console.log(e);
    }
  }
}


// const home = 'Pondok Indah Mall, Jalan Metro Pondok Indah, Pondok Pinang, South Jakarta City, Jakarta';
// const dest = 'Jalan Sultan Iskandar Muda No.7, RT.5/RW.9, Kebayoran Lama Selatan, Kebayoran Lama, RT.5/RW.9, Kby. Lama Sel., Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240';

// getFiredate(home, dest, new Date('Sun Jul 01 2018 14:21:39 GMT+0700')).then(response => {
//   console.log(response);
// });