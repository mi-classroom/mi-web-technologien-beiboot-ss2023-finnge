export function check(key: string, value?: string): boolean {
  const cookies = document.cookie.split("; ");

  const correctRow = cookies.find((row) => row.startsWith(key + "="));

  if (!correctRow) {
    return false;
  }

  if (!value) {
    return true;
  }

  return correctRow.split("=")[1] === value;
}

export function set(key: string, value: string) {
  document.cookie = `${key}=${value}`;
}
