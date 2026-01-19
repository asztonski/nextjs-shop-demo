// Funkcja do logowania użytkownika
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_LOGIN_USER_ENDPOINT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    // Jeśli odpowiedź nie jest OK, parsuj błąd z backendu
    if (!response.ok) {
      const errorData = await response.json();

      // Status 400 - Brak wymaganych pól
      if (response.status === 400) {
        throw new Error(
          errorData.error ||
            "Missing required fields: email and password are required"
        );
      }

      // Status 401 - Nieprawidłowe dane logowania
      if (response.status === 401) {
        const remainingAttempts = errorData.remainingAttempts;
        let errorMessage = "Invalid email or password";

        if (remainingAttempts !== undefined && remainingAttempts > 0) {
          errorMessage += `. ${remainingAttempts} attempt${
            remainingAttempts !== 1 ? "s" : ""
          } remaining`;
        } else if (remainingAttempts === 0) {
          errorMessage +=
            ". No attempts remaining - your account will be locked on next failed attempt";
        }

        throw new Error(errorMessage);
      }

      // Status 403 - Konto nieaktywowane
      if (response.status === 403) {
        throw new Error(errorData.error || "ACCOUNT_NOT_ACTIVATED");
      }

      // Status 423 - Konto zablokowane
      if (response.status === 423) {
        const { remainingMinutes } = errorData;
        let errorMessage =
          "Account temporarily locked due to too many failed login attempts";

        if (remainingMinutes && remainingMinutes > 0) {
          errorMessage += `. Please try again in ${remainingMinutes} minute${
            remainingMinutes !== 1 ? "s" : ""
          }`;
        } else {
          errorMessage += ". Please try again later";
        }

        throw new Error(errorMessage);
      }

      // Status 500 lub inne błędy
      throw new Error(
        errorData.error || "Failed to log in. Please try again later"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
