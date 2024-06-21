import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Broadcaster, GetBroadcasters } from "../../web/get-broadcasters";

export type BroadcastersProps = {
  category: string;
};

export function Broadcasters(props: BroadcastersProps) {
  const [infos, setInfos] = useState<Broadcaster[]>([]);

  useEffect(() => {
    passBroadcaster();
  }, []);

  async function passBroadcaster() {
    const passPrograms = await GetBroadcasters(props.category);
    setInfos(passPrograms);
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
