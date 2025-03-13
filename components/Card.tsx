import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { ResizeMode, Video } from "expo-av";

const { height } = Dimensions.get("window");

interface CardProps {
  item: any;
  index: number;
  scrollY: Animated.Value;
}

export default function Card({ item, index, scrollY }: CardProps) {
  const inputRange = [
    (index - 1) * height,
    index * height,
    (index + 1) * height,
  ];

  // Scale animation for the entire card
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  // Animated values for text: opacity, scale, and translateY for moving effect
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.8)).current;
  const textTranslateY = useRef(new Animated.Value(30)).current; // Start 30px lower

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      // When the card is visible in the viewport:
      if (value >= index * height && value < (index + 1) * height) {
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(textScale, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        // Reset the values when the card goes off-screen
        textOpacity.setValue(0);
        textScale.setValue(0.8);
        textTranslateY.setValue(30);
      }
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      {item.type === "color" && (
        <View style={[styles.background, { backgroundColor: item.color }]} />
      )}
      {item.type === "image" && (
        <Image source={item.image} style={styles.background} />
      )}
      {item.type === "video" && (
        <Video
          source={item.video}
          style={styles.background}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
        />
      )}
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: textOpacity,
            transform: [{ scale: textScale }, { translateY: textTranslateY }],
          },
        ]}
      >
        {item.content}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});
