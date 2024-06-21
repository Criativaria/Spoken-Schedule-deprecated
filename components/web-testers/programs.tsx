import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GetPrograms, Program } from "../../web/get-programs";

export type ProgramsProps = {
  channelId: string;
};

export function Programs(props: ProgramsProps) {
  const [infos, setInfos] = useState<Program[]>([]);

  useEffect(() => {
    passChannel();
  }, []);

  async function passChannel() {
    const passPrograms = await GetPrograms(props.channelId);
    setInfos(passPrograms);
  }

  return (
    <View>
      {infos.map((item, index) => (
        <View key={index}>
          <Text>{item.time}</Text>
          <Text>{item.name}</Text>
          <Text>{item.type}</Text>
        </View>
      ))}
    </View>
  );
}
