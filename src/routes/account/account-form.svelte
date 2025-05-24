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

    let { data }: { data: PageData } = $props();

    const accountForm = superForm(data.accountForm, {
        validators: zodClient(accountFormSchema),
    });

    const { form: accountFormData, enhance } = accountForm;
</script>

<form class="flex flex-col gap-4" method="POST" action="?/update" use:enhance>
    <Form.Field form={accountForm} name="username">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Username</Form.Label>
                <Input {...props} bind:value={$accountFormData.username} defaultValue={data.profile.username} />
            {/snippet}
        </Form.Control>
        <Form.Description>This is your public username.</Form.Description>
        <Form.FieldErrors />
    </Form.Field>
    <Input disabled type="email" placeholder={data.session.user.email} />
    <Form.Button>Save</Form.Button>
</form>
