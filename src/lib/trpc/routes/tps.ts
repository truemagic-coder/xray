import { Helius } from "helius-sdk";

import { t } from "$lib/trpc/t";
import { z } from "zod";

import { env } from "$env/dynamic/private";

const { HELIUS_API_KEY } = env;

export const tps = t.procedure.input(z.boolean()).query(async ({ input }) => {
    let helius;
    if (input == true) {
        helius = new Helius(HELIUS_API_KEY || "");
    } else {
        helius = new Helius(HELIUS_API_KEY || "", "devnet");
    }
    const tps = await helius.rpc.getCurrentTPS();
    return tps;
});
