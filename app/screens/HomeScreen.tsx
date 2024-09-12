import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Badge, CategorySquare, CustomHeader, CustomInput, Heading, ItemSquare, Screen } from "app/components"
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated"
import { colors, spacing } from "app/theme"
import Constants from "expo-constants"
import { categories } from "app/utils/constants"
import { api, ProductFromAPI } from "app/services/api"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}



export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {

  const style = getStyles();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<ProductFromAPI[]>([]);
  const [category, setCategory] = useState<string>("All");

  const headerAnimatedView = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 100/1.5], [0, 1]),
    }
  })

  const fetchData = useCallback(async (thisCategory?: string) => {
    setCategory(thisCategory ?? "All");
    const res = await api.getProducts(searchValue, thisCategory ?? "All");
    if(res.ok){
      setProducts(res.data)
    }
  }, [searchValue, category])

  useEffect(() => {
    fetchData().then();
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
      header: () => <CustomHeader
        animatedStyle={headerAnimatedView}
        leftComponent={<Heading text={"Explore"} h={'h2'}/>}
        rightComponent={
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.buttonsBg }}>Back</Text>
        </TouchableOpacity>}
      />
    })
  });

  return (
    <Screen style={style.root} preset="fixed">
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={style.scrollViewContainer}
      >
        <View style={style.mainContainer}>
          <View style={style.topContainer}>
            <Heading text={"Explore"} h={'h1'}/>
            <CustomInput onChange={setSearchValue} value={searchValue} icon={"search"} onEndEditing={() =>fetchData(category)}/>
          </View>
          <ScrollView horizontal={true} style={style.sectionContainer} showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: spacing.md}}>
            {categories.map((cat) => {
              return (<CategorySquare key={cat.id} text={cat.name} image={cat.image} onPress={() => fetchData(cat.name)}/>)
            })}
          </ScrollView>
          <Heading text={"Popular"} h={'h2'}/>
          {category !== "All" ? <Badge text={category} bgColor={colors.buttonsBg} color={"white"} onPress={() => fetchData("All")}/> : null}
          {products.map((product: ProductFromAPI) => {
            return <ItemSquare key={product.id} image={product.image} text={product.name} price={product.price}/>
          })}
        </View>
      </Animated.ScrollView>
    </Screen>
  )
})

const getStyles = () => StyleSheet.create({
  root:{
    flex: 1
  },
  mainContainer:{
    flex: 1,
    gap: spacing.md,
    paddingBottom: spacing.xxxl * 4
  },
  sectionContainer:{
    width: "100%",
  },
  scrollViewContainer:{
    height: "100%",
    padding: spacing.md,
    paddingTop: Constants.statusBarHeight + spacing.md,
    width: "100%",
  },
  topContainer:{
    gap: spacing.sm,
  }
})
