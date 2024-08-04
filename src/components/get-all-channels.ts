import { Broadcaster, GetBroadcasters } from "../../web/get-broadcasters";


export async function GetAllChannels(categorylId: string[]): Promise<string[]> {

    const channelsNamePromisses = categorylId.map(async (categorylId) => {
        const channelReceived: Broadcaster[] = await GetBroadcasters(categorylId)
        return channelReceived.map((item) => item.name)
    })

    const channelsArray = await Promise.all(channelsNamePromisses)

    const JustChannelsName = channelsArray.flat()

    console.log(JustChannelsName)
    return JustChannelsName;

}