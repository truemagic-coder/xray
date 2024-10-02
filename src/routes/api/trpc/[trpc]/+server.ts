import type { RequestEvent } from "@sveltejs/kit";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { router } from "$lib/trpc/router";
import { createContext } from "$lib/trpc/context";

const handler = (event: RequestEvent) =>
    fetchRequestHandler({
        createContext: () => createContext(event),
        endpoint: "/api/trpc",
        req: event.request,
        router,
    });

export const GET = handler;
export const POST = handler;
