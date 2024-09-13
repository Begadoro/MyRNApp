import { Platform, StyleProp, StyleSheet, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Animated from "react-native-reanimated";
import React, {ReactNode} from "react";
import Constants from "expo-constants";
import { colors, spacing } from "app/theme"


export interface CustomHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
  animatedStyle?: StyleProp<ViewStyle>,
  animatedBackgroundStyle?: StyleProp<ViewStyle>,
  leftComponent?: ReactNode,
  rightComponent?: ReactNode,
}

/**
 * Custom header with left and right components.
 * Props are used to animate the header
 */
export const CustomHeader = observer(function CustomHeader(props: CustomHeaderProps) {

  const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
  const PLATFORM = Platform.OS;
  const HEADER_HEIGHT = STATUS_BAR_HEIGHT + (PLATFORM === 'ios' ? 44 : 50);
  const PD_TOP = STATUS_BAR_HEIGHT - (PLATFORM === 'ios' ? 10 : 5);


  const $style = getStyle(HEADER_HEIGHT, PD_TOP);

  return(
    <Animated.View style={[$style.container, props.animatedStyle, props.animatedBackgroundStyle]}>
      {props.leftComponent ?? null}
      {props.rightComponent ?? null}
    </Animated.View>
  )
})

const getStyle = (HEADER_HEIGHT: number, PD_TOP: number) => StyleSheet.create({
  container:{
    alignItems: 'center',
    backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: PD_TOP,
    width: '100%'
  }
})