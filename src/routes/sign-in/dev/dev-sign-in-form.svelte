<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input";
    import { devSignInFormSchema, type DevSignInFormSchema } from "./dev-schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { toast } from "svelte-sonner";

    let { data }: { data: { devSignInForm: SuperValidated<Infer<DevSignInFormSchema>> } } = $props();

    const devSignInForm = superForm(data.devSignInForm, {
        validators: zodClient(devSignInFormSchema),
        onUpdated: ({ form: f }) => {
            if (f.valid) {
                toast.success("Submitted");
            } else {
                toast.error("Please fix the errors in the form");
            };
        },
        onError: ({ result }) => {
            toast.error("Error");
        },
    });

    const { form: devSignInFormData, enhance } = devSignInForm;
</script>

<form method="POST" use:enhance>
    <Form.Field form={devSignInForm} name="email">
        <Form.Control>
            {#snippet children({ props })}
                <Form.Label>Email</Form.Label>
                <Input {...props} bind:value={$devSignInFormData.email} type="email" placeholder="email" />
            {/snippet}
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
</form>
