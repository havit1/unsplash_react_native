import React from "react";
import { View, StyleSheet, Image } from "react-native";

const PhotoPage = ({ route }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${route.params.regular}` }}
        style={styles.image}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  image: {
    flexGrow: 1,
    height: undefined,
    width: undefined,
    resizeMode: "cover"
  }
});

export default PhotoPage;
