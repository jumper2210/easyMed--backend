const { Expo } = require("expo-server-sdk");
const expo = new Expo();
let savedPushTokens = [];

const handlePushTokens = ({ title, body }) => {
  let notifications = [];
  for (let pushToken of savedPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      data: { body },
    });
  }
  let chunks = expo.chunkPushNotifications(notifications);
  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};
const saveToken = (token) => {
  const exists = savedPushTokens.find((t) => t === token);
  if (!exists) {
    savedPushTokens.push(token);
  }
};

exports.saveTokenHandler = (req, res, next) => {
  saveToken(req.body.token);
};

exports.messageTokenHandler = (req, res) => {
  handlePushTokens(req.body);
};
