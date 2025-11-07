import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { registerUser } from "../auth/register";
import { useAuthStore } from "@/app/store/auth";

// Definicje interfejsów dla danych formularza
export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Definicje interfejsów dla funkcji walidacyjnych
export interface RegisterValidationHandlers {
  handleUsernameValidation: (username: string) => boolean;
  handleEmailValidation: (email: string) => boolean;
  handlePasswordValidation: (password: string) => boolean;
  handleConfirmPasswordValidation: (
    password: string,
    confirmPassword: string
  ) => boolean;
}

// Funkcja obsługująca przesłanie formularza rejestracji
export interface RegisterSubmitOptions {
  formData: RegisterFormData;
  validationHandlers: RegisterValidationHandlers;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setSubmitError: (error: string) => void;
  router: AppRouterInstance;
}

/**
 * Handler formularza rejestracji - zarządza logiką UI
 * Odpowiedzialność:
 * - Walidacja formularza
 * - Zarządzanie stanem UI (loading, błędy)
 * - Koordynacja procesu rejestracji
 * - Nawigacja po sukcesie
 */
export const handleRegisterSubmit = async ({
  formData,
  validationHandlers,
  setIsSubmitting,
  setSubmitError,
  router,
}: RegisterSubmitOptions): Promise<void> => {
  const { username, email, password, confirmPassword } = formData;
  const {
    handleUsernameValidation,
    handleEmailValidation,
    handlePasswordValidation,
    handleConfirmPasswordValidation,
  } = validationHandlers;

  // Walidacja wszystkich pól przed wysłaniem
  const isUsernameValidNow = handleUsernameValidation(username);
  const isEmailValidNow = handleEmailValidation(email);
  const isPasswordValidNow = handlePasswordValidation(password);
  const isConfirmPasswordValidNow = handleConfirmPasswordValidation(
    password,
    confirmPassword
  );

  // Jeśli wszystkie pola są poprawne, wyślij formularz
  if (
    isUsernameValidNow &&
    isEmailValidNow &&
    isPasswordValidNow &&
    isConfirmPasswordValidNow
  ) {
    setIsSubmitting(true);

    try {
      await registerUser({ username, email, password });
      // Sukces - ustaw użytkownika jako zalogowanego i przekieruj do strony głównej
      useAuthStore.getState().setIsUserLoggedIn(true);
      router.push("/");
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Nieznany błąd rejestracji"
      );
    } finally {
      setIsSubmitting(false);
    }
  }
};
