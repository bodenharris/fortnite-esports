<script lang="ts">
    import type { PageData } from "./$types";
    import SignInForm from "./sign-in-form.svelte";

    let { data }: { data: PageData } = $props();
</script>

<div class="min-h-64 bg-card border rounded-lg flex flex-col md:flex-row items-center gap-8 my-16 mx-4 p-4">
    <h1 class="basis-1/2 text-2xl font-semibold text-center">Sign in or sign up</h1>
    <SignInForm {data} />
</div>
