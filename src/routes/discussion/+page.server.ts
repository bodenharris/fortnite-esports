import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
 
export const load: PageServerLoad = async (event) => {
const {locals: { supabase, safeGetSession }} = event;

const { data, error } = await supabase
  .from('posts')
  .select()

 return {
  form: await superValidate(zod(formSchema)),
  posts: data
 };
};
 
export const actions: Actions = {
 default: async (event) => {
  const form = await superValidate(event, zod(formSchema));
  if (!form.valid) {
   return fail(400, {
    form,
   });
  }

  // add post
  const {locals: { supabase, safeGetSession }} = event;
  const {session} = await safeGetSession();
  const { error } = await supabase
  .from('posts')
  .insert({ title: form.data.title, content: form.data.content, user_id: session?.user.id})
  if (error) console.log(error);


  return {
   form,
  };
 },
};