import { z } from "zod";

import { t } from "$lib/trpc/t";

import { connect } from "$lib/xray";
import { getRPCUrl } from "$lib/util/get-rpc-url";
import { Connection } from "@solana/web3.js";

import { env } from "$env/dynamic/private";

const { HELIUS_API_KEY } = env;

export const rawTransaction = t.procedure
    .input(z.tuple([z.string(), z.boolean()]))
    .query(async ({ input }) => {
        try {
            const [signature, isMainnet] = input;

            const connection = new Connection(
                getRPCUrl(`?api-key=${HELIUS_API_KEY}`, isMainnet),
                "confirmed"
            );

            const transaction = await connection.getTransaction(signature, {
                maxSupportedTransactionVersion: 0,
            });

            if (!transaction) {
                return { data: null, error: "Raw transaction not found" };
            }

            return {
                transaction,
            };
        } catch (error) {
            return { data: null, error: "Server error" };
        }
    });
