import { GetPrograms, Program } from "../../web/get-programs";

export function GetAllPrograms(channelId: any) {
    const justProgramsNames = []

    channelId.forEach(async item => {
        const programReceived: Program[] = await GetPrograms(item)
        justProgramsNames.push(programReceived.map((element) => element.name))
    });
    return justProgramsNames.flat();
}