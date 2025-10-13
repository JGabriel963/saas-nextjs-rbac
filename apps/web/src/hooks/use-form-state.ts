import { signInWithEmailAndPassword } from "@/app/auth/sign-in/actions";
import { FormEvent, useState, useTransition } from "react";

interface FormState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export function useFormState(
  action: (formData: FormData) => Promise<FormState>,
  initialState?: FormState,
  onSuccess?: () => Promise<void> | void
) {
  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    }
  );
  const [isPending, setIsPending] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsPending(async () => {
      const state = await action(formData);

      if (state.success === true && onSuccess) {
        await onSuccess();
      }

      setFormState(state);
    });
  }

  return [formState, handleSubmit, isPending] as const;
}
