/**
 * Asset Management for Mobile App
 *
 * All images, icons, videos, and sounds are defined here.
 * Use require() statements for React Native asset loading.
 *
 * Usage:
 * import { ASSETS } from "@/constants";
 * <Image source={ASSETS.icons.appIcon} />
 */

export const ASSETS = {
  icons: {
    // Add your icon assets here
    // appIcon: require("../assets/icons/app-icon.png"),
  },
  images: {
    // Add your image assets here
    // background: require("../assets/images/background.png"),
  },
  videos: {
    // Add your video assets here
    // promo: require("../assets/videos/promo.mp4"),
  },
  sounds: {
    // Add your sound assets here
    // notification: require("../assets/sounds/notification.wav"),
  },
} as const;
