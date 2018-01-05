const {ipcRenderer} = require('electron')

let notifications = {
  comments : true,
  votes : false,
  transfers : true,
  authorRewards : true,
  commentRewards : true,
  mentions : true
}

$('.active-btn').on('click', () => {
  enableNotifications(notifications)
})
$('.de-active-btn').on('click', () => {
  disableNotifications(notifications)
})

$('.check-box').on('click', (e) => {
  let currentCheckBox = $(e.currentTarget)
  let checkData = currentCheckBox.parent().data('notification')
  let isChecked = currentCheckBox.hasClass('checked');
  if( isChecked ) {
    currentCheckBox.removeClass('checked')
    notifications[checkData] = false;
  } else {
    currentCheckBox.addClass('checked')
    notifications[checkData] = true;
  }
})

function enableNotifications(notifications){
  let username = $('.username-input').val();
  let data = {
    notifications: notifications,
    username : username
  }
  ipcRenderer.send('enable-notifications', data)
  showOverlay('Enabled ✅');
  switchButtons();
}
function disableNotifications(){
  ipcRenderer.send('disable-notifications')
  switchButtons()
  showOverlay('Disabled ❌')
}
