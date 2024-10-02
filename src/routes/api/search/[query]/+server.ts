import { json, type RequestEvent } from "@sveltejs/kit";

import { search, connect } from "$lib/xray";

import { env } from "$env/dynamic/private";

const { HELIUS_API_KEY } = env;

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    const conection = connect("mainnet", HELIUS_API_KEY);

    const result = await search(params?.query || "", conection);

    return json(result);
}
