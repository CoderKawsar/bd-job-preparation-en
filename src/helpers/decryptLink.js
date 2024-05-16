import crypto from "crypto";

const key = process.env.NEXT_PUBLIC_LINK_SECURITY_KEY;
const iv = process.env.NEXT_PUBLIC_LINK_SECURITY_IV;

// Utility function to decrypt a link
function decryptLink(encryptedLink) {
  try {
    const decipher = crypto.createDecipheriv(
      "aes-128-cbc",
      Buffer.from(key, "hex"),
      Buffer.from(iv, "hex")
    );
    let decryptedLink = decipher.update(encryptedLink, "hex", "utf-8");
    decryptedLink += decipher.final("utf-8");
    return decryptedLink;
  } catch (error) {
    return "Invalid link";
  }
}

export default decryptLink;
