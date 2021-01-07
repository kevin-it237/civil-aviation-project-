/**
 * @description Convert seconds to h:m:s
 * @param {number} durationInSeconds
 * @returns {string}
 */
 export const formatTime = (durationInSeconds) => {
    let h = Math.floor(durationInSeconds / 3600);
    let m = Math.floor(durationInSeconds % 3600 / 60);
    let s = Math.floor(durationInSeconds % 3600 % 60);

    if(h < 10) h = `0${h}`
    if(m < 10) m = `0${m}`
    if(s < 10) s = `0${s}`

    return `${h}:${m}:${s}`
 }
 
 /**
 * @description Format Date to h:m
 * @param {Date} date
 * @returns {string}
 */
 export const formatTimeFromDate = (date) => {
    return `${date.getHours()}:${date.getMinutes()}`
 }

 /**
  * @description Format date to YYYY-MM-DD
  * @param {Date} date 
  * @returns {String}
  */
 export const formatDate = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    if(month.length === 1) month = `0${month}`
    if(day.length === 1) day = `0${day}`

    return `${year}-${month}-${day}`
 }

 /**
 * @description Display notification
 * @param {string} title
 * @param {string} body
 */
export const displayNotification = (title, body) => {
    new Notification(title, {
        body,
        icon: 'https://res.cloudinary.com/dlsjtyc17/image/upload/v1604945719/info_kqqdzb.png'
    })
 }

 /**
 * @description Get midnight time from today date
 * @param {Date} today
 * @returns {Date} 
 */
export const getMidnightTime = (today) => {
    let midnight = new Date();
    midnight.setDate(today.getDate() + 1)
    midnight.setHours(0)
    midnight.setMinutes(0)
    midnight.setSeconds(0)
    
    return midnight
}