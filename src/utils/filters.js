export default {
// 获取当前的时区
  timeZone(time) {
    var nowZone = -8
    var localZone = new Date().getTimezoneOffset() / 60
    var seconds = (localZone - nowZone) * 3600000
    var timestamp = new Date(time).getTime() - seconds
    var unixTimestamp = new Date(timestamp)
    var time_result = unixTimestamp.toLocaleDateString().replace(/\//g, '-') + ' ' + unixTimestamp.toTimeString().substr(0, 8)
    return time_result
  }
}
