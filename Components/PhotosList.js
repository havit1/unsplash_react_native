import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlight,
  View,
  Button
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotos } from "../Redux/ducks/mainPagePhotos";

const PhotosList = ({ navigation }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    onLoadPhotos(
      `https://api.unsplash.com/photos?page=${page}&client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9`
    );
  }, [page]);

  const photos = useSelector(state =>
    state.mainPagePhotos.photos.map(photo => ({
      key: photo.id,
      ...photo
    }))
  );

  const isLoading = useSelector(state => state.mainPagePhotos.loading);

  const dispatch = useDispatch();

  const onLoadPhotos = url => dispatch(fetchPhotos(url));

  const renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          navigation.navigate("PhotoPage", {
            ...item.urls
          });
        }}
        style={styles.imageWrapper}
      >
        <>
          <Image
            style={{ width: `100%`, height: 500 }}
            source={{ uri: `${item.urls.regular}` }}
          />
          <Text style={styles.textName}>{item.user.name}</Text>
          <Text style={styles.textDescription}>{item.description}</Text>
        </>
      </TouchableHighlight>
    );
  };

  return isLoading ? (
    <View style={styles.loadingTextWrapper}>
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  ) : (
    <>
      <FlatList
        styles={styles.container}
        data={photos}
        renderItem={renderItem}
      />
      <Button
        onPress={() => {
          setPage(state => state + 1);
        }}
        title="Load more"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageWrapper: {
    flexGrow: 0.5,
    padding: 10,
    position: "relative"
  },
  textName: {
    color: `#ffff`,
    position: "absolute",
    left: 20,
    bottom: 20
  },
  textDescription: {
    flex: 1,
    color: `#ffff`,
    position: "absolute",
    left: 20,
    bottom: 40,
    fontSize: 20,
    flexWrap: "wrap"
  },
  loadingTextWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    color: "blue",
    fontSize: 80
  }
});

export default PhotosList;
