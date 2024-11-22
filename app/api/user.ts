import { API_ENDPOINT_PREFIX } from "./settings";
import * as SecureStorage from "expo-secure-store";
import { base } from "../utils/types";
import { session } from "../hooks/Session";
import { getBaseAxios, postBaseAxios } from "./project";

type userData = {
  username: string;
  email: string;
  points: number;
  uploads: number;
  full_name: string;
};
export async function getUser(id: string) {
  const resp: base<userData> = await fetch(
    `${API_ENDPOINT_PREFIX}/profile/${id}`,
    {
      headers: {
        Authorization: `Bearer ${SecureStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  ).then((resp) => resp.json());
  return resp.data;
}
// (string $user_id, string $project_id)
type like = { success: boolean; action: number };
export async function like(user_id: number, project_id: number): Promise<like> {
  try {
    const resp: like = await fetch(
      `${API_ENDPOINT_PREFIX}/like/${user_id}/${project_id}`,
      {
        headers: {
          Authorization: `Bearer ${SecureStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
    return resp;
  } catch (Error) {
    console.error(Error);
    return { success: false, action: -1 };
  }
}

export const refreshData = async () => {
  const token = await SecureStorage.getItemAsync("token");
  const decoded_token_request = await postBaseAxios.post(
    `${API_ENDPOINT_PREFIX}/decode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { token: `Bearer ${token}` },
    }
  );
  const decoded_token: session = decoded_token_request.data;

  await Promise.all([
    SecureStorage.setItemAsync("username", decoded_token.username),
    SecureStorage.setItemAsync("points", decoded_token.points.toString()),
    SecureStorage.setItemAsync("uploads", decoded_token.uploads.toString()),
    SecureStorage.setItemAsync("user_id", decoded_token.user_id.toString()),
  ]);
};

export const checkUsername = async (username: string) => {
  try {
    const response = await getBaseAxios(`check/${username}`);
    const data: { info?: string; success?: string } = response.data;
    return data;
  } catch {
    return false;
  }
};
