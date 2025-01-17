<script lang="ts">
    import { page } from "$app/stores";
    // @ts-ignore

    import Icon from "$lib/components/icon.svelte";
    import AccountHeader from "$lib/components/account-header.svelte";
    import { showModal } from "$lib/state/stores/modals";
    import { trpcWithQuery } from "$lib/trpc/client";

    const client = trpcWithQuery($page);

    const account = $page.params.account;
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network === "mainnet";
    const selectedNetwork = `network=${isMainnetValue ? "mainnet" : "devnet"}`;
    const accountInfo = client.accountInfo.createQuery([
        account,
        isMainnetValue,
    ]);

    const assets = client.assets.createQuery({
        account,
        isMainnet: isMainnetValue,
    });

    $: endsWith = (str: string) => $page.url.pathname.endsWith(str);
    $: hasAssets = $assets?.data?.total > 0;
</script>

<div class="relative mx-auto w-full max-w-2xl pb-32">
    <AccountHeader
        {account}
        link={$page.url.href}
    />

    <div>
        <div
            class="mx-3 mb-5 mt-3 flex items-center justify-between rounded-lg border"
        >
            <div class="tabs w-full pt-1 md:w-auto">
                <div />
                <a
                    href={`/account/${account}?${selectedNetwork}`}
                    class="tab tab-bordered"
                    class:tab-active={endsWith(`${account}`)}>Transactions</a
                >
                <a
                    href={`/account/${account}/tokens?${selectedNetwork}`}
                    class="tab tab-bordered"
                    class:tab-active={endsWith("/tokens")}>Tokens</a
                >
                {#if hasAssets}
                    <a
                        href={`/account/${account}/assets?${selectedNetwork}`}
                        class="tab tab-bordered"
                        class:tab-active={endsWith("/assets")}>Assets</a
                    >
                {/if}
            </div>
            {#if !endsWith("/tokens") && !endsWith("/assets") && !endsWith("/idl")}
                <button
                    class="btn btn-ghost btn-sm"
                    on:click={() => showModal("TRANSACTION_FILTER")}
                >
                    <Icon id="settings" />
                </button>
            {/if}
        </div>
    </div>

    <div class="content px-3">
        <slot />
    </div>
</div>
