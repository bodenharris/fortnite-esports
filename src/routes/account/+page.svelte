<script lang="ts">
    import type { PageData } from "./$types";
    import { enhance } from "$app/forms";
    import AccountForm from "./account-form.svelte";
    import { Button } from "$lib/components/ui/button";

    let { data }: { data: PageData } = $props();
</script>

<AccountForm {data} />

<form method="POST" action="?/sign-out" use:enhance>
    <Button type="submit" variant="destructive">Sign out</Button>
</form>
