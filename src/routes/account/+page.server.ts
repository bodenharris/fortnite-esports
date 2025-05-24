import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { accountFormSchema } from "./account-schema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();

    if (!session) {
        redirect(303, "/sign-in");
    };

    const { data: profile } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', session.user.id)
        .single();

    return {
        accountForm: await superValidate(zod(accountFormSchema)),
        session,
        profile,
    };
};

export const actions: Actions = {
    update: async (event) => {
        const accountForm = await superValidate(event, zod(accountFormSchema));
        if (!accountForm.valid) {
            return fail(400, {
                accountForm,
            });
        };

        const {
            request,
            locals: { supabase, safeGetSession },
        } = event;
        const { session } = await safeGetSession();
        if (!session) {
            return fail(401, {
                accountForm,
            });
        };
        const { error } = await supabase.from('profiles').upsert({
            id: session?.user.id,
            username: accountForm.data.username,
            updated_at: new Date(),
        });
        if (error) {
            return fail(500, {
                accountForm,
            });
        };
        const { data: profile } = await supabase
            .from('profiles')
            .select(`username`)
            .eq('id', session.user.id)
            .single();

        return {
            accountForm,
            profile,
        };
    },

    signout: async ({ locals: { supabase, safeGetSession } }) => {
        const { session } = await safeGetSession();
        if (session) {
            await supabase.auth.signOut();
            redirect(303, "/sign-in");
        };
    },
};
