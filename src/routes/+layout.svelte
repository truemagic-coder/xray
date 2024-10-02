<script lang="ts">
    import "../app.postcss";

    import type { LayoutData } from "./$types";

    import { QueryClientProvider } from "@tanstack/svelte-query";

    import Modals from "$lib/components/modals.svelte";

    export let data: LayoutData;
</script>

<Modals />

<QueryClientProvider client={data.queryClient}>
    <main class="min-h-screen">
        <div class="max-w-screen relative mx-auto">
            <div class="relative mx-auto">
                <slot />
            </div>
        </div>
    </main>
</QueryClientProvider>
