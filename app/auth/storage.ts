import * as SecureStore from "expo-secure-store";

export function validateSession() {
  if (
    !(
      SecureStore.getItem("token") &&
      SecureStore.getItem("username") &&
      SecureStore.getItem("points") &&
      SecureStore.getItem("uploads")
    )
  ) {
    return false;
  }
  return true;
}
