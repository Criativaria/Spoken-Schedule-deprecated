import axios from "axios";
import { load } from "cheerio";

export type Program = {
  type: string;
  name: string;
  time: string;
};

export async function GetPrograms(channelId: string): Promise<Program[]> {
  const response = await axios.get(
    "https://meuguia.tv/programacao/canal/" + channelId
  );
  const htmlReq = load(response.data);
  const programs: Program[] = [];

  htmlReq("a.devicepadding").each((_index, element: any) => {
    programs.push({
      time: htmlReq(element).find(".lileft.time").text().trim(),
      name: htmlReq(element).find(".licontent h2").text().trim(),
      type: htmlReq(element).find(".licontent h3").text().trim(),
    });
  });
  return programs;
}
