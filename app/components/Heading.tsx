import * as React from "react"
import { StyleProp, View, ViewStyle, StyleSheet, Text } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { ReactNode } from "react"
import { bold, h1, h2, h3 } from "app/utils/constants"

export interface HeadingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
  text: string
  fontColor?: string
  icon?: ReactNode
  h?: string
}

/**
 * Describe your component here
 */
export const Heading = observer(function Heading(props: HeadingProps) {

  const $style = getStyle(props.fontColor ?? colors.text);

  const headings = new Map([
    ['h1',h1],
    ['h2',h2],
    ['h3',h3],
  ])
  const heading = props.h ? headings.get(props.h) : h1;

  return (
    <View style={[$style.container, props.style]}>
      {props.icon ? props.icon : null}
      <Text style={[heading, bold, $style.text]}>{props.text}</Text>
    </View>
  )
})

const getStyle = (fontColor: string) => StyleSheet.create({
  container:{
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: spacing.xxs
  },
  text:{
    color: fontColor
  }
})