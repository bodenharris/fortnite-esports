<script lang="ts">
    import type { PageData } from "./$types";
    import DevSignInForm from "./dev-sign-in-form.svelte";

    let { data }: { data: PageData } = $props();
</script>

<DevSignInForm {data} />
