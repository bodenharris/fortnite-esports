<script lang="ts">
 import type { PageData } from "./$types.js";
 import DiscussionForm from "./discussion-form.svelte";
 let { data }: { data: PageData } = $props();
</script>
 
<h1> 
    Welcome to discussions!
</h1>

<DiscussionForm {data} />

{#if data.posts} 
    {#each data.posts as post}
    <div class="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 max-w-xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-800">{post.title}</h2>

        <div class="flex items-center gap-3">
           
            <span class="text-lg font-medium text-gray-700">{post.karma}</span>
            
        </div>

        <p class="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
    {/each}
{/if}






