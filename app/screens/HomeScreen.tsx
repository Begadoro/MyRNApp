import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import {
    Badge,
    Button,
    CategorySquare,
    CustomHeader,
    CustomInput,
    Heading,
    ItemSquare,
    Loader, RoundIconButton,
    Screen,
} from "app/components"
import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated"
import { colors, spacing } from "app/theme"
import Constants from "expo-constants"
import { categories } from "app/utils/constants"
import { api, ProductFromAPI } from "app/services/api"
import { useStores } from "app/models"
import { headerAnimatedStyle } from "app/utils/animationUtils"
import { translate } from "app/i18n"
import { ErrorAlert } from "app/utils/errorAlert"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }: any) {
  const style = getStyles()
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const { UserStore } = useStores()

  const [searchValue, setSearchValue] = useState("")
  const [products, setProducts] = useState<ProductFromAPI[]>([])
  const [category, setCategory] = useState<string>("All")
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalItems, setTotalItems] = useState<number>(0)
  const headerAnimatedView = headerAnimatedStyle(scrollOffset)

  const fetchData = useCallback(
    async (myPage: number) => {
      setIsLoading(true)
      const res = await api.getProducts(myPage)
      if (res.ok) {
        setProducts((prevState) => [...prevState, ...res.data.data.values])
        setTotalItems(res.data.data.pagination.totalItems)
      } else {
        ErrorAlert(res);
      }
      setIsLoading(false)
    },
    [page],
  )

  const profileButtonPressed = async () => {
    if (UserStore.isLoggedIn) {
      setIsLoading(true)
      const res = await api.executeLogout()
      if (res.ok) {
        UserStore.setIsLoggedIn(false)
        Alert.alert("Logout", translate("common.loggedOut"))
      } else {
        ErrorAlert(res);
      }
      setIsLoading(false)
    } else {
      navigation.navigate("Login")
    }
  }

  const loadMorePressed = async () => {
    setPage((prevState) => prevState + 1)
    await fetchData(page + 1)
  }

  useEffect(() => {
    fetchData(page).then()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      header: () => (
        <CustomHeader
          animatedStyle={headerAnimatedView}
          leftComponent={
            <Heading
              text={translate("homeScreen.explore")}
              h={"h2"}
              icon={"shopping-bag"}
              iconColor={colors.buttonsBg}
            />
          }
          rightComponent={
            <TouchableOpacity onPress={profileButtonPressed}>
              <Text style={{ color: colors.buttonsBg }}>
                {UserStore.isLoggedIn ? "Logout" : "Login"}
              </Text>
            </TouchableOpacity>
          }
        />
      ),
    })
  }, [UserStore.isLoggedIn])

  return (
    <Screen style={style.root} preset="fixed">
      <Animated.ScrollView
        nestedScrollEnabled={true}
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={style.scrollViewContainer}
      >
        <View style={style.mainContainer}>
          <View style={style.topContainer}>
            <Heading
              text={translate("homeScreen.explore")}
              h={"h1"}
              icon={"shopping-bag"}
              iconColor={colors.buttonsBg}
            />
            <CustomInput
              onChange={setSearchValue}
              value={searchValue}
              icon={"search"}
              placeholder={translate("homeScreen.search")}
            />
          </View>
          <Heading text={translate("homeScreen.categories")} h={"h3"} />
          <ScrollView
            horizontal={true}
            style={style.sectionContainer}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.md }}
          >
            {categories.map((cat) => {
              return (
                <CategorySquare
                  key={cat.id}
                  text={cat.name}
                  image={cat.image}
                  onPress={() => setCategory(cat.name)}
                />
              )
            })}
          </ScrollView>
          <Heading text={translate("homeScreen.popular")} h={"h2"} />
          {category !== "All" ? (
            <Badge
              text={category}
              bgColor={colors.buttonsBg}
              color={"white"}
              onPress={() => setCategory("All")}
              hasDelete={true}
            />
          ) : null}
          {products.length > 0 ? (
            <View style={style.productsContainer}>
              {products
                .filter((product: ProductFromAPI) =>
                  product.title.toLowerCase().includes(searchValue.toLowerCase()),
                )
                .filter((product: ProductFromAPI) =>
                  category === "All" ? true : product.title === category,
                )
                .map((product: ProductFromAPI) => (
                  <ItemSquare
                    key={product.id}
                    product={product}
                    onPress={() => navigation.navigate("Product", { product })}
                  />
                ))}
              <View>
                <Button
                  text={translate("homeScreen.more")}
                  style={style.loadMoreButton}
                  textStyle={style.loadMoreButtonText}
                  onPress={loadMorePressed}
                />
                <Text style={style.totalText}>
                  {products.length}/{totalItems}
                </Text>
              </View>
            </View>
          ) : (
              <View style={style.noFoundContainer}>
                  <Text>{translate("homeScreen.noFounds")}</Text>
                  <RoundIconButton icon={"refresh-ccw"} onPress={() => fetchData(page)} backgroundColor={colors.border} />
              </View>
          )}
        </View>
      </Animated.ScrollView>
      <Loader isLoading={isLoading} />
    </Screen>
  )
})

const getStyles = () =>
  StyleSheet.create({
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    loadMoreButtonText: {
      color: colors.buttonsBg,
      fontWeight: "bold",
    },
    loadMoreButton: {
      backgroundColor: "transparent",
    },
    root: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      gap: spacing.md,
      paddingBottom: spacing.xxxl * 4,
    },
      noFoundContainer:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: 20
      },
    productsContainer: {
      gap: spacing.sm,
    },
    sectionContainer: {
      width: "100%",
    },
    scrollViewContainer: {
      height: "100%",
      padding: spacing.md,
      paddingTop: Constants.statusBarHeight + spacing.md,
      width: "100%",
    },
    topContainer: {
      gap: spacing.sm,
    },
    totalText: {
      color: colors.buttonsBg,
      fontSize: spacing.sm,
      textAlign: "center",
    },
  })
