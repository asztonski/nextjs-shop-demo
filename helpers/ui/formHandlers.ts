import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { registerUser } from "../auth/register";
import { useAuthStore } from "@/app/store/auth";
import { loginUser } from "../auth/login";
// Definicje interfejsów dla danych formularza
export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  activationAccessToken?: string;
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
      const response = await registerUser({ username, email, password });
      if (response.activationAccessToken) {
        router.push(
          `/activation-required?token=${response.activationAccessToken}`
        );
      } else {
        // Fallback - zapisz email w sessionStorage
        sessionStorage.setItem("pendingActivation", email);
        router.push("/activation-required");
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Nieznany błąd rejestracji"
      );
    } finally {
      setIsSubmitting(false);
    }
  }
};

// Definicje interfejsów dla danych formularza logowania
export interface LoginFormData {
  email: string;
  password: string;
}

// Funkcja obsługująca przesłanie formularza logowania
export interface LoginSubmitOptions {
  formData: LoginFormData;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setSubmitError: (error: string) => void;
  router: AppRouterInstance;
}

export const handleLoginSubmit = async ({
  formData,
  setIsSubmitting,
  setSubmitError,
  router,
}: LoginSubmitOptions): Promise<void> => {
  const { email, password } = formData;

  setIsSubmitting(true);

  try {
    const response = await loginUser(email, password);
    const token = response.token;

    if (token) {
      // Zaktualizuj stan logowania użytkownika
      useAuthStore.getState().login(token);

      // Sprawdź flagę AFTER ustawienia tokenu
      const isUserLoggedIn = useAuthStore.getState().isUserLoggedIn;
      console.log("handleLoginSubmit - isUserLoggedIn:", isUserLoggedIn);

      if (isUserLoggedIn) {
        router.push("/profile");
      }
    } else {
      throw new Error("Brak tokenu w odpowiedzi z serwera");
    }
  } catch (error) {
    setSubmitError(
      error instanceof Error ? error.message : "Nieznany błąd logowania"
    );
  } finally {
    setIsSubmitting(false);
  }
};
