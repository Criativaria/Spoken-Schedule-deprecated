import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GetPrograms, Program } from "../../../web/get-programs";
import { GetCategories } from "../../../web/get-categories";

export function Categories() {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    passChannel();
  }, []);

  async function passChannel() {
    const passCategories = await GetCategories();
    setInfos(passCategories);
  }

  return (
    <View>
      {infos.map((item, index) => (
        <View key={index}>
          <Text>{item.name}</Text>
          <Text>{item.id}</Text>
        </View>
      ))}
    </View>
  );
}
