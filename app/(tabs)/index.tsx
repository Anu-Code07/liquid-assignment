import { Image, StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Carousel from "@/components/Cars";
export type CarouselItem = {
  id: string;
  type: "color" | "image" | "video";
  content: string;
  color?: string;
  image?: any; // Use `ImageSourcePropType` if strictly typing images
  video?: any; // `require` returns `any`, so we keep this flexible
};
export default function HomeScreen() {
  const data: CarouselItem[] = [
    { id: "1", type: "color", content: "Welcome", color: "#FF5733" },
    {
      id: "2",
      type: "image",
      content: "Explore",
      image: require("../../assets/images/image1.jpg"),
    },
    {
      id: "3",
      type: "video",
      content: "Watch",
      video: require("../../assets/1.mp4"),
    },
    {
      id: "4",
      type: "video",
      content: "Watch",
      video: require("../../assets/2.mp4"),
    },
    {
      id: "5",
      type: "video",
      content: "Watch",
      video: require("../../assets/3.mp4"),
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Carousel data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
