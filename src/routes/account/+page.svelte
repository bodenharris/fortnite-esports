<script lang="ts">
    import type { PageData } from "./$types";
    import { enhance } from "$app/forms";
    import AccountForm from "./account-form.svelte";
    import { Button } from "$lib/components/ui/button";

    let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-4 items-center my-16 mx-4">

    <AccountForm {data} />

    <form method="POST" action="?/signout" use:enhance>
        <Button type="submit" variant="destructive">Sign out</Button>
    </form>

</div>
