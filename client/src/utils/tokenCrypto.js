
const TOKEN_KEY = "access_token";
const ENCRYPTION_KEY = "token_encryption_key";

function toBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function fromBase64(value) {
  return Uint8Array.from(atob(value), (char) =>
    char.charCodeAt(0)
  );
}

async function getEncryptionKey(create = false) {
  let storedKey = sessionStorage.getItem(ENCRYPTION_KEY);

  if (!storedKey && !create) {
    return null;
  }

  if (!storedKey && create) {
    const rawKey = crypto.getRandomValues(new Uint8Array(32));
    storedKey = toBase64(rawKey);
    sessionStorage.setItem(ENCRYPTION_KEY, storedKey);
  }

  return crypto.subtle.importKey(
    "raw",
    fromBase64(storedKey),
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function storeToken(token) {
  const key = await getEncryptionKey(true);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(token)
  );

  const payload = {
    iv: toBase64(iv),
    data: toBase64(new Uint8Array(encrypted)),
  };

  localStorage.setItem(TOKEN_KEY, JSON.stringify(payload));
}

export async function getToken() {
  const stored = localStorage.getItem(TOKEN_KEY);

  if (!stored) return null;

  try {
    const key = await getEncryptionKey(false);

    // No key means this tab cannot decrypt the saved token.
    if (!key) {
      clearToken();
      return null;
    }

    const payload = JSON.parse(stored);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: fromBase64(payload.iv),
      },
      key,
      fromBase64(payload.data)
    );

    return new TextDecoder().decode(decrypted);
  } catch {
    clearToken();
    return null;
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(ENCRYPTION_KEY);
}
