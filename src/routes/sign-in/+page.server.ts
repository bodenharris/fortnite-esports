import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { signInFormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
    return {
        signInForm: await superValidate(zod(signInFormSchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(signInFormSchema));
        const {
            url,
            request,
            locals: { supabase },
        } = event;
        if (!form.valid) {
            return fail(400, {
                form,
            });
        };

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "/auth/confirm",
            },
        });
        if (error) {
            return fail(500, {
                form,
            });
        };

        return {
            form,
        };
    },
};
