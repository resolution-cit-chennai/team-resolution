import { APPLICATION_ENDPOINT } from "../config";
import { validateEmail } from "./validateEmail";

export async function submitApplication(formState) {
  if (
    !APPLICATION_ENDPOINT ||
    APPLICATION_ENDPOINT.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT")
  ) {
    throw new Error(
      "The application endpoint isn't set up yet. Add your Google Apps Script Web App URL to src/config.js."
    );
  }

  // Reject test, xxx, dummy, and disposable emails
  if (formState.email && formState.email.trim()) {
    const emailCheck = validateEmail(formState.email);
    if (!emailCheck.valid) {
      throw new Error(emailCheck.error);
    }
  }

  const payload = {
    name: formState.name,
    department: formState.department,
    email: formState.email,
    registerNumber: formState.registerNumber,
    mobile: formState.mobile,
    reason: formState.reason,
    workLink: formState.workLink,
    software: formState.software,
    equipment: formState.equipment,
    attachment: null,
    submittedAt: new Date().toISOString(),
  };

  try {
    // Google Apps Script Web Apps execute doPost(), insert the row into Sheets,
    // and send the automated email, but then issue a 302 redirect to
    // script.googleusercontent.com/macros/echo which frequently returns 404 or CORS
    // failures in browsers. Using mode: "no-cors" allows the POST payload to be delivered
    // cleanly and resolves without tripping over the usercontent 404 redirect.
    await fetch(APPLICATION_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return {
      ok: true,
      message: "Application submitted successfully.",
    };
  } catch (err) {
    if (err instanceof TypeError && err.message === "Failed to fetch") {
      throw new Error(
        "Unable to connect to the server. Please check your internet connection and try again in a moment."
      );
    }
    throw err;
  }
}
