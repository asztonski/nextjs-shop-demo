export const resendActivationLink = async (
  email: string
): Promise<{ success: boolean; error?: string }> => {
  const RESEND_ACTIVATION_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_RESEND_ACTIVATION_ENDPOINT}`;

  const requestData = { email };

  try {
    const response = await fetch(RESEND_ACTIVATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      let errorMessage = `Error resending activation link: ${response.status}`;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } else {
          const textResponse = await response.text();
          console.log("Text response:", textResponse);
          errorMessage = `Server error: ${response.status}`;
        }
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
      }
      return { success: false, error: errorMessage };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
};
