import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, StyleSheet, Text, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {
  Badge,
  Button,
  CustomHeader,
  Heading,
  Loader,
  RoundIconButton,
  Screen,
} from "app/components"
import { RouteProp, useRoute } from "@react-navigation/native"
import { api, ProductDetailsFromAPI, ProductFromAPI } from "app/services/api"
import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated"
import Constants from "expo-constants"
import { backgroundAnimatedStyle, imageAnimatedStyle } from "app/utils/animationUtils"
import { spacing } from "app/theme"
import { translate } from "app/i18n"
import { ErrorAlert } from "app/utils/errorAlert"
import { useCachedResult } from "app/utils/useCachedResult"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface ProductScreenProps extends AppStackScreenProps<"Product"> {}

export const ProductScreen: FC<ProductScreenProps> = observer(function ProductScreen({
  navigation,
}) {
  const route: RouteProp<{ product: { product: ProductFromAPI } }> = useRoute()
  const product = route.params.product

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

  const IMG_HEIGHT = Constants.statusBarHeight + 300
  const animatedBackground = backgroundAnimatedStyle(IMG_HEIGHT / 2, scrollOffset)
  const animatedImage = imageAnimatedStyle(IMG_HEIGHT, scrollOffset)
  const style = getStyles(IMG_HEIGHT)

  const [fullProduct, setFullProduct] = useState<ProductDetailsFromAPI>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const cacheContent = useCachedResult(product.id)

  const fetchProductData = async () => {
    setIsLoading(true)
    const res = await api.getProductDetails(product.id)
    if (res.ok) {
      setFullProduct(res.data.data)
      await AsyncStorage.setItem(
        product.id.toString(),
        JSON.stringify({ data: res.data.data, timestamp: new Date().getTime() }),
      )
    } else {
      ErrorAlert(res)
      navigation.goBack()
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const dataRequest = async () => {
      if (await cacheContent) setFullProduct(await cacheContent)
      else await fetchProductData()
    }
    dataRequest().then()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      header: () => (
        <CustomHeader
          leftComponent={
            <RoundIconButton
              icon={"arrow-left"}
              textColor={"white"}
              onPress={() => navigation.goBack()}
              backgroundColor={"rgba(28,28,28,0.77)"}
            />
          }
          rightComponent={
            <RoundIconButton
              icon={"heart"}
              textColor={"white"}
              onPress={() => Alert.alert(translate("productScreen.addedFav"))}
              backgroundColor={"rgba(28,28,28,0.77)"}
            />
          }
          animatedBackgroundStyle={animatedBackground}
        />
      ),
    })
  })

  return (
    <Screen style={style.root} preset="fixed">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={style.scrollViewContainer}
      >
        {fullProduct ? (
          <>
            <Animated.Image
              source={{ uri: fullProduct.image }}
              style={[style.image, animatedImage]}
            />
            <View style={style.mainContainer}>
              <Heading text={fullProduct.title} h={"h2"} />
              <View style={style.badgesContainer}>
                <Badge text={"Cute"} bgColor={"lightgrey"} />
                <Badge text={"Popular"} bgColor={"lightgrey"} />
              </View>
              <Text style={style.rating}>
                {fullProduct.rating} {"⭐".repeat(fullProduct.rating)}
              </Text>
              <View style={style.descriptionContainer}>
                <Text style={style.descriptionText}>{fullProduct.description}</Text>
              </View>
            </View>
          </>
        ) : null}
      </Animated.ScrollView>
      {fullProduct ? (
        <View style={style.addButtonContainer}>
          <Button
            text={translate("productScreen.buy") + fullProduct.price + "€"}
            textStyle={{ color: "white", fontWeight: "bold" }}
          />
        </View>
      ) : null}
      <Loader isLoading={isLoading} />
    </Screen>
  )
})

const getStyles = (IMG_HEIGHT: number) =>
  StyleSheet.create({
    addButtonContainer: {
      bottom: spacing.lg,
      height: 60,
      paddingHorizontal: spacing.sm,
      position: "absolute",
      width: "100%",
    },
    badgesContainer: {
      display: "flex",
      flexDirection: "row",
      gap: spacing.xs,
    },
    descriptionContainer: {
      paddingVertical: spacing.sm,
    },
    descriptionText: {
      fontSize: spacing.md,
    },
    image: {
      height: IMG_HEIGHT,
      width: "100%",
    },
    mainContainer: {
      gap: spacing.sm,
      padding: spacing.md,
      paddingBottom: spacing.xxxl * 10,
    },
    rating: {
      fontSize: spacing.md,
      fontWeight: "bold",
    },
    root: {
      flex: 1,
    },
    scrollViewContainer: {
      height: "100%",
      width: "100%",
    },
  })
