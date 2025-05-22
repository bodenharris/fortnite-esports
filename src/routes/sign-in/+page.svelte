<script lang="ts">
    import type { PageData } from "./$types";
    import SignInForm from "./sign-in-form.svelte";

    let { data }: { data: PageData } = $props();
</script>

<SignInForm {data} />
