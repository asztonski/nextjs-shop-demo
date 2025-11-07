/**
 * API do rejestracji użytkowników - warstwa komunikacji z serwerem
 * Odpowiedzialność:
 * - Wykonywanie żądań HTTP do API rejestracji
 * - Formatowanie danych do wysłania
 * - Obsługa odpowiedzi serwera i błędów sieciowych
 */
export const registerUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<void> => {
  const REGISTER_USER_URL = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_REGISTER_USER_ENDPOINT}`;

  console.log("Register URL:", REGISTER_USER_URL);

  // Przygotowanie danych do wysłania
  const requestData = {
    username: username,
    email: email,
    password: password,
  };

  console.log("Wysyłanie danych:", requestData);
  console.log("URL:", REGISTER_USER_URL);

  const response = await fetch(REGISTER_USER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);

  if (!response.ok) {
    // Błąd odpowiedzi serwera
    let errorMessage = `Błąd rejestracji: ${response.status}`;

    try {
      // Sprawdź content-type odpowiedzi
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        // Jeśli odpowiedź jest JSON-em, sparsuj ją
        const errorData = await response.json();
        console.log("Error data from server:", errorData);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } else {
        // Jeśli nie JSON, spróbuj pobrać jako tekst
        const textResponse = await response.text();
        console.log("Text response:", textResponse);
        errorMessage = `Błąd serwera: ${response.status}`;
      }
    } catch (parseError) {
      // Jeśli nie można sparsować odpowiedzi, używaj domyślnej wiadomości
      console.error("Nie można sparsować odpowiedzi błędu:", parseError);
    }

    throw new Error(errorMessage);
  }
};
