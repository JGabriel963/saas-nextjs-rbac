import { FormEvent, startTransition, useState, useTransition } from "react";
import { requestFormReset } from "react-dom";

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const state = await action(data);

      if (state.success && onSuccess) {
        await onSuccess();
      }

      setFormState(state);
    });

    requestFormReset(form);
  }

  return [formState, handleSubmit, isPending] as const;
}
