<script lang="ts">
    import type { PageData } from "./$types";
    import DevSignInForm from "./dev-sign-in-form.svelte";

    let { data }: { data: PageData } = $props();
</script>

<div class="flex justify-center my-16 mx-4">
    <DevSignInForm {data} />
</div>
