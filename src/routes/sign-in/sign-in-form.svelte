<script lang="ts">
    import * as Form from "$lib/components/ui/form/index.js";
    import { signInFormSchema, type SignInFormSchema } from "./schema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    let { data }: { data: { signInForm: SuperValidated<Infer<SignInFormSchema>> } } = $props();

    const signInForm = superForm(data.signInForm, {
        validators: zodClient(signInFormSchema),
    });

    const { form: signInFormData, enhance } = signInForm;
</script>

<form class="w-full max-w-64 flex flex-col gap-4" method="POST" use:enhance>
    <Form.Button>Sign in with Google</Form.Button>
</form>
