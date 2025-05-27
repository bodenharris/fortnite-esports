<script lang="ts">
 import type { PageData } from "./$types.js";
 import DiscussionForm from "./discussion-form.svelte";
 let { data }: { data: PageData } = $props();
</script>
 
<DiscussionForm {data} />
<h1> 
    Welcome to discussions!
</h1>
