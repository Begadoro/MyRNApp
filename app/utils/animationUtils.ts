import { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated"
import { colors } from "app/theme"

export const backgroundAnimatedStyle = (IMG_HEIGHT: number, scrollOffset: any) => useAnimatedStyle(() => { return {
  backgroundColor: interpolateColor(scrollOffset.value, [0, IMG_HEIGHT], ['transparent', colors.background]),
}})

export const imageAnimatedStyle = (IMG_HEIGHT: number, scrollOffset: any) => useAnimatedStyle(() => {
  return {
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-IMG_HEIGHT, 0, IMG_HEIGHT],
          [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
        )
      },
      {
        scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1])
      }
    ],
    opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT/2], [1, 0]),
  };
})

export const headerAnimatedStyle = (scrollOffset: any) => useAnimatedStyle(() => {
  return {
    opacity: interpolate(scrollOffset.value, [0, 100/1.5], [0, 1]),
  }
})