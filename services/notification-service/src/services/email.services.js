const { Resend } = require("resend");
const {
  resendApiKey,
  emailFrom,
} = require("../config/env");

const resend = new Resend(resendApiKey);

/**
 * Send an email
 *
 * @param {string} toSend
 * @param {string} subject
 * @param {string} message
 */
async function sendEmail(toSend, subject, message) {
  if (!toSend) {
    throw new Error("Recipient email is required");
  }

  if (!subject) {
    throw new Error("Email subject is required");
  }

  if (!message) {
    throw new Error("Email message is required");
  }

  try {
    const response = await resend.emails.send({
      from: emailFrom,
      to: [toSend],
      subject,
      html: message,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log(
      `Email sent successfully to ${toSend}, id=${response.data.id}`
    );

    return {
      success: true,
      messageId: response.data.id,
    };
  } catch (error) {
    console.error(
      `Failed to send email to ${toSend}:`,
      error.message
    );

    throw error;
  }
}

module.exports = {
  sendEmail,
};