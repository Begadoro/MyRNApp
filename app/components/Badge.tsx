import * as React from "react"
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Feather } from "@expo/vector-icons"

export interface BafgeProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  bgColor?: string
  color?: string
  icon?: typeof Feather[keyof typeof Feather]
  text: string
  onPress?: () => void,
  hasDelete?: boolean
}

/**
 * Describe your component here
 */
export const Badge = observer(function Badge(props: BafgeProps) {

  const $style = getStyle(props.bgColor, props.color);

  return (
    <TouchableOpacity  style={[$style.container, props.style]} onPress={props.onPress}>
      {props.icon ?
        <Feather name={props.icon} size={spacing.sm} color={props.color ?? colors.text}/> : null
      }
      <Text style={$style.text}>{props.text}</Text>
      { props.hasDelete ? <Feather name={"x"} size={spacing.sm} color={props.color ?? colors.text}/> : null}
    </TouchableOpacity>
  )
})

const getStyle = (bgColor?: string, color?: string) => StyleSheet.create({
  container:{
    alignItems: "center",
    backgroundColor: bgColor ?? colors.errorBackground,
    borderRadius: spacing.sm,
    display: "flex",
    flexDirection: "row",
    gap: spacing.xxs,
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    width: 80
  },
  text:{
    color: color ?? colors.text,
    fontSize: spacing.sm
  },
})