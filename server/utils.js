function currentTime() {
    let today = new Date();
    let time = today.toString().slice(16,21)
    return time
  }

  module.exports = { currentTime }