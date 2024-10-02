import { z } from "zod";

import { t } from "$lib/trpc/t";

import { env } from "$env/dynamic/private";

const { BIRDEYE_API_KEY } = env;

export const price = t.procedure
    .input(z.string())
    .query(async ({ input: token }) => {
        const response = await fetch(
            `https://public-api.birdeye.so/defi/price/?address=${token}`,
            {
                headers: {
                    Accept: "application/json",
                    "X-API-KEY": BIRDEYE_API_KEY,
                    "x-chain": "solana",
                },
            }
        );

        const json = await response.json();

        return json?.data?.value || 0;
    });
