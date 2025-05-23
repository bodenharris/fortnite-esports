import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { signInFormSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession();

    if (session) {
        redirect(303, "/account");
    };

    return {
        signInForm: await superValidate(zod(signInFormSchema)),
        url: url.origin,
    };
};

export const actions: Actions = {
    default: async (event) => {
        const signInForm = await superValidate(event, zod(signInFormSchema));
        const {
            url,
            request,
            locals: { supabase },
        } = event;
        if (!signInForm.valid) {
            return fail(400, {
                signInForm,
            });
        };

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "/auth/callback",
            },
        });
        if (error) {
            return fail(500, {
                signInForm,
            });
        };
        if (data.url) {
            redirect(303, data.url);
        };

        return {
            signInForm,
        };
    },
};
