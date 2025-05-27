<script lang="ts">
 import * as Form from "$lib/components/ui/form/index.js";
 import { Input } from "$lib/components/ui/input/index.js";
 import { formSchema, type FormSchema } from "./schema";
 import {
  type SuperValidated,
  type Infer,
  superForm,
 } from "sveltekit-superforms";
 import { zodClient } from "sveltekit-superforms/adapters";
 
 let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
  $props();
 
 const form = superForm(data.form, {
  validators: zodClient(formSchema),
 });
 
 const { form: formData, enhance } = form;
</script>
 
<form method="POST" use:enhance>
 <Form.Field {form} name="title">
  <Form.Control>
   {#snippet children({ props })}
    <Form.Label></Form.Label>
    <Input {...props} bind:value={$formData.title} />
   {/snippet}
  </Form.Control>
  <Form.FieldErrors />
 </Form.Field>

 <Form.Field {form} name="content">
  <Form.Control>
   {#snippet children({ props })}
    <Form.Label></Form.Label>
    <Input {...props} bind:value={$formData.content} />
   {/snippet}
  </Form.Control>
  <Form.Description>Add something to the discussion.</Form.Description>
  <Form.FieldErrors />
 </Form.Field>
 <Form.Button>Submit</Form.Button>
</form>