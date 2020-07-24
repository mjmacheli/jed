const brandSuccess = require("../../theme/variables/commonColor").brandSuccess;
const brandDanger = require("../../theme/variables/commonColor").brandDanger;
const brandWarning = require("../../theme/variables/commonColor").brandWarning;
const brandInfo = require("../../theme/variables/commonColor").brandInfo;

const data = [
  {
    icon: "camera",
    iconColor: brandSuccess,
    text: "Photo/Video/Screenshot"
  },
  {
    icon: "video",
    iconColor: brandDanger,
    text: "Go Live"
  },
  {
    icon: "ios-pin",
    iconColor: "#008b8b",
    text: "Check In"
  },
  {
    icon: "emoticon-happy-outline",
    iconColor: brandWarning,
    text: "Feeling/Activity/Sticker"
  },
  {
    icon: "filmstrip",
    iconColor: "#e0b0ff",
    text: "Slideshow"
  },
  {
    icon: "flag-variant-outline",
    iconColor: "#ff69b4",
    text: "Life Event"
  },
  {
    icon: "ios-people",
    iconColor: brandInfo,
    text: "Tag Friends"
  }
];

module.exports = data;
