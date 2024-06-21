import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { GetCategories } from "../web/get-categories";

export function CategoriesChoice({ navigation }) {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    passChannel();
  }, []);

  async function passChannel() {
    const passCategories = await GetCategories();
    setInfos(passCategories);
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginTop: 100,
        gap: 30,
      }}
    >
      {infos.map((item, index) => (
        <View key={index}>
          <Pressable
            onPress={() =>
              navigation.navigate("BroadcastersChoice", { category: item.id })
            }
          >
            <Text style={{ fontSize: 20 }}>{item.name}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}
