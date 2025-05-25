<script lang="ts">
	import "../app.css";
	import Header from "./Header.svelte";
	import { ModeWatcher } from "mode-watcher";
	import { Toaster } from "$lib/components/ui/sonner";
	import { invalidate } from "$app/navigation";
  	import { onMount } from "svelte";

	let { data, children } = $props();
  	let { session, supabase } = $derived(data);

	onMount(() => {
    	const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
    	  	if (newSession?.expires_at !== session?.expires_at) {
    	  	  	invalidate("supabase:auth");
    	  	};
    	});

		return () => data.subscription.unsubscribe();
	});
</script>

<ModeWatcher defaultMode="dark"/>

<Toaster richColors />

<Header isSignedIn={data.session ? true : false} />

{@render children()}
