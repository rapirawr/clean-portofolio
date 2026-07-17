import { type ActionFunctionArgs, data, redirect } from "react-router";

// Redirect GET requests back to homepage to prevent "loader not provided" errors
export async function loader() {
  return redirect("/");
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return data({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return data({ error: "All fields are required" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.SMTP_PASS;

    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not configured in .env file.");
      return data({ error: "Email service is not configured" }, { status: 500 });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        subject: `[Portfolio] ${subject}`,
        message: message,
        from_name: `${name} (via Portfolio)`,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return data({ success: true }, { status: 200 });
    } else {
      console.error("Web3Forms error response:", result);
      return data({ error: result.message || "Failed to send email via Web3Forms" }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error submitting to Web3Forms:", error);
    return data({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
