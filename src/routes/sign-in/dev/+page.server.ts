import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { devSignInFormSchema } from "./dev-schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
    const { session } = await safeGetSession();

    if (session) {
        redirect(303, "/account");
    };

    return {
        devSignInForm: await superValidate(zod(devSignInFormSchema)),
        url: url.origin,
    };
};

export const actions: Actions = {
    default: async (event) => {
        const devSignInForm = await superValidate(event, zod(devSignInFormSchema));
        const {
            url,
            request,
            locals: { supabase },
        } = event;
        if (!devSignInForm.valid) {
            return fail(400, {
                devSignInForm,
            });
        };

        const { error } = await supabase.auth.signInWithOtp({
            email: devSignInForm.data.email,
        });
        if (error) {
            return fail(500, {
                devSignInForm,
            });
        };

        return {
            devSignInForm,
        };
    },
};
