import * as React from "react"
import { Dimensions, StyleProp, StyleSheet, View, ViewStyle, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { useMemo } from "react"

export interface LoaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isLoading?: boolean
}

/**
 * Page overlay showing a loader
 */
export const Loader = observer(function Loader(props: LoaderProps) {

  const WIN_WIDTH = Dimensions.get("window").width;
  const WIN_HEIGHT = Dimensions.get("window").height;

  const $style = getStyle(WIN_WIDTH, WIN_HEIGHT);

  const displayStile : ViewStyle = useMemo(() => {
    return { display: props.isLoading ? "flex" : "none" }
  }, [props.isLoading])

  return (
    <View style={[displayStile, $style.container]}>
      <View style={$style.loadingContainer}>
        <Image source={require("../../assets/icons/cart.gif")} style={$style.image}/>
      </View>
    </View>
  )
})

const getStyle = (WIN_WIDTH: number, WIN_HEIGHT: number) => StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    height: WIN_HEIGHT,
    justifyContent: "center",
    position: "absolute",
    width: WIN_WIDTH,
    zIndex: 1000,
  },
  image: {
    height: 50,
    width: 50
  },
  loadingContainer: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: spacing.md,
    display: "flex",
    flexDirection: "column",
    gap: spacing.xxs,
    height: 100,
    justifyContent: "center",
    width: 100
  },
  text: {
    color: colors.text,
    fontSize: spacing.sm,
    textAlign: "center"
  }
})