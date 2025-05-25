<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import * as Sheet from "$lib/components/ui/sheet";

    let { isSignedIn }: { isSignedIn: boolean } = $props();
</script>

<header class="flex flex-row items-center justify-between p-4">
    <a class="md:basis-1/5 text-lg font-semibold" href="/">Fortnite Esports</a>
    <nav class="max-md:hidden flex items-center gap-4">
        <Button variant="ghost" href="/">Home</Button>
        <Button variant="ghost" href="/tournaments">Tournaments</Button>
        <Button variant="ghost" href="/discussion">Discussion</Button>
    </nav>
    <div class="md:basis-1/5 flex justify-end gap-4">
        <Button variant="outline" href="/sign-in">
            {#if isSignedIn}
                Account
            {:else}
                Sign In
            {/if}
        </Button>
        <Sheet.Root>
            <Sheet.Trigger class="md:hidden">Open</Sheet.Trigger>
            <Sheet.Content>
                <nav class="h-full flex flex-col items-center justify-center gap-4">
                    <Sheet.Close>
                        {#snippet child({ props })}
                            <Button {...props} variant="ghost" size="lg" href="/">Home</Button>
                        {/snippet}
                    </Sheet.Close>
                    <Sheet.Close>
                        {#snippet child({ props })}
                            <Button {...props} variant="ghost" size="lg" href="/tournaments">Tournaments</Button>
                        {/snippet}
                    </Sheet.Close>
                    <Sheet.Close>
                        {#snippet child({ props })}
                            <Button {...props} variant="ghost" size="lg" href="/discussion">Discussion</Button>
                        {/snippet}
                    </Sheet.Close>
                </nav>
            </Sheet.Content>
        </Sheet.Root>
    </div>
</header>
