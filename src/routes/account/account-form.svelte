<script lang="ts">
    import type { PageData } from "./$types";
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { accountFormSchema, type AccountFormSchema } from "./account-schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { toast } from "svelte-sonner";

    let { data }: { data: PageData } = $props();

    const accountForm = superForm(data.accountForm, {
        validators: zodClient(accountFormSchema),
        resetForm: false,
        onUpdated: ({ form: f }) => {
            if (f.valid) {
                toast.success("Saved");
            } else {
                toast.error("Please fix the errors in the form");
            };
        },
        onError: ({ result }) => {
            toast.error("Something went wrong. Try again later.");
        },
    });

    const { form: accountFormData, enhance } = accountForm;

    $accountFormData.username = data.profile.username;
</script>

<form class="bg-card min-w-64 max-w-128 w-full flex flex-col gap-4 border rounded-lg p-4" method="POST" action="?/update" use:enhance>
    <Form.Field form={accountForm} name="username">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Username</Form.Label>
                <Input {...props} bind:value={$accountFormData.username} />
            {/snippet}
        </Form.Control>
        <Form.Description>This is your public username.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Input disabled type="email" placeholder={data.session.user.email} />
    <Form.Button>Save</Form.Button>
</form>
