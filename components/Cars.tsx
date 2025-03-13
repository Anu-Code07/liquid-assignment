import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Easing,
} from "react-native";
import { Video } from "expo-av";

const { height, width } = Dimensions.get("window");

type CarouselItem = {
  id: string;
  title: string;
  subtext: string;
  type: "color" | "image" | "video";
  color?: string;
  image?: any;
  video?: any;
};

const data: CarouselItem[] = [
  {
    id: "1",
    title: "Welcome",
    subtext: "Start your journey",
    type: "color",
    color: "#FF5733",
  },
  {
    id: "2",
    title: "Explore",
    subtext: "Discover new places",
    type: "image",
    image: require("../assets/images/image1.jpg"),
  },
  {
    id: "3",
    title: "Watch Video",
    subtext: "Experience it live",
    type: "video",
    video: require("../assets/1.mp4"),
  },
  {
    id: "4",
    title: "Enjoy",
    subtext: "Have fun & relax",
    type: "video",
    video: require("../assets/2.mp4"),
  },
];

const CarouselItem = ({
  item,
  isVisible,
}: {
  item: CarouselItem;
  isVisible: boolean;
}) => {
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(-50)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(width)).current;
  const subtextOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateX = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (isVisible) {
      titleOpacity.setValue(0);
      titleTranslateY.setValue(-50);
      textOpacity.setValue(0);
      textTranslateX.setValue(width);
      subtextOpacity.setValue(0);
      taglineTranslateX.setValue(-20);

      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateX, {
          toValue: 0,
          duration: 1200,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(subtextOpacity, {
          toValue: 1,
          duration: 1500,
          delay: 400,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(taglineTranslateX, {
              toValue: 20,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(taglineTranslateX, {
              toValue: -20,
              duration: 1000,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        ).start(),
      ]).start();
    }
  }, [isVisible]);

  return (
    <View style={{ height, justifyContent: "center", alignItems: "center" }}>
      {item.type === "color" && (
        <View style={[styles.background, { backgroundColor: item.color }]} />
      )}
      {item.type === "image" && (
        <Image
          source={item.image}
          style={styles.background}
          resizeMode="cover"
        />
      )}
      {item.type === "video" && (
        <Video
          source={item.video}
          style={styles.background}
          resizeMode="cover"
          shouldPlay
          isLooping
        />
      )}

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        {item.title}
      </Animated.Text>

      <Animated.Text style={[styles.subtext, { opacity: subtextOpacity }]}>
        {item.subtext}
      </Animated.Text>

      <Animated.Text
        style={[
          styles.tagline,
          { transform: [{ translateX: taglineTranslateX }] },
        ]}
      >
        Swipe up to explore!
      </Animated.Text>
    </View>
  );
};

const Carousel = () => {
  const [visibleItem, setVisibleItem] = useState<string | null>(null);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any[];
  }) => {
    if (viewableItems.length > 0) {
      setVisibleItem(viewableItems[0].item.id);
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CarouselItem item={item} isVisible={item.id === visibleItem} />
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
    />
  );
};

const styles = StyleSheet.create({
  background: { position: "absolute", width: "100%", height: "100%" },
  title: { fontSize: 50, fontWeight: "bold", color: "#fff" },
  subtext: { fontSize: 20, color: "#ddd", marginTop: 10 },
  tagline: { fontSize: 18, color: "#fff", position: "absolute", bottom: 50 },
});

export default Carousel;
