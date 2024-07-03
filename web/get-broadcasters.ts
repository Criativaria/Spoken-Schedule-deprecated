import axios from "axios";
import { load } from "cheerio";
import { error } from "console";
import { useEffect, useState } from "react";
import { Broadcasters } from "../src/components/web-testers/broadcasters";

//oi amiga nao precisa mexer aqui! É a pag que eu faço o webScrapping das emissoras, se quiser eu te explico bonitinho dps

export type Broadcaster = {
    name: string;
    id: string;
}

export async function GetBroadcasters(category: string) {


    const response = await axios.get("https://meuguia.tv/programacao/categoria/" + category);
    const htmlReq = load(response.data)
    const broadcast: Broadcaster[] = [];

    htmlReq("li").each((_index, element: any) => {

        const link = htmlReq(element).find("a.devicepadding")

        if (link && link.attr("href")) {
            const href = link.attr("href");
            const parts = href.split("/")

            broadcast.push({
                name: htmlReq(element).find(".licontent h2").text().trim(),
                id: parts && parts.length > 3 ? parts[3] : ""
            })
        }

    })
    return broadcast
}
