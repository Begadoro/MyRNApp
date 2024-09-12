import * as React from "react"
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle, Text} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Feather } from "@expo/vector-icons"

export interface RoundIconButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  icon: typeof Feather[keyof typeof Feather]
  text?: string
  textColor?: string
  backgroundColor?: string
  onPress?: () => void
  opacity?: number,
}

/**
 * Describe your component here
 */
export const RoundIconButton = observer(function RoundIconButton(props: RoundIconButtonProps) {
  const $style = getStyle(props.backgroundColor ?? colors.background, props.opacity ?? 1, !!props.text, props.textColor);

  return (
    <TouchableOpacity onPress={props.onPress} style={[$style.container, props.style]}>
      {props.text ? <Text style={$style.text}>{props.text}</Text> : null}
      {props.icon ? <Feather name={props.icon} size={spacing.lg} color={props.textColor ?? colors.text} /> : null }
    </TouchableOpacity>
  )
})

const getStyle = (bgColor: string, opacity: number, hasText: boolean, textColor?: string) => StyleSheet.create({
  container:{
    alignItems: "center",
    backgroundColor: bgColor,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    gap: spacing.xs,
    height: 44,
    justifyContent: "center",
    opacity,
    paddingHorizontal: hasText ? spacing.sm : 0,
    width: hasText ? 'auto' : 44
  },
  text: {
    color: textColor ?? colors.text,
    fontSize: spacing.md
  }
})

