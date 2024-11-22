import * as SecureStore from "expo-secure-store";
import React from "react";
import { getUser } from "../api/user";

export const initialValue = {
  LoggedIn: false,
  username: "",
  uploads: -1,
  points: -1,
  user_id: -1,
  isLoading: true,
};

type userData = string | number;

type userInfo = {
  username: string;
  email: string;
  points: number;
  uploads: number;
  full_name: string;
};
export async function useStorageNonCached(
  setState: React.Dispatch<React.SetStateAction<typeof initialValue>>
) {
  let userdata: userInfo[] = [
    {
      email: "",
      full_name: "",
      points: -1,
      uploads: -1,
      username: "",
    },
  ];
  let user_id: userData = -1;
  let points: userData = -1;
  let token: userData = "";
  let uploads: userData = -1;

  try {
    let LoggedIn: boolean;
    points = Number(await SecureStore.getItemAsync("points")) ?? -1;
    uploads = Number(await SecureStore.getItemAsync("uploads")) ?? -1;
    user_id = Number(await SecureStore.getItemAsync("user_id")) ?? -1;
    token = (await SecureStore.getItemAsync("token")) ?? "";
    userdata = await getUser(user_id.toString());
    if (points == -1 || uploads == -1 || user_id == -1 || token == "") {
      LoggedIn = false;
    } else LoggedIn = true;
  } finally {
    setState({
      user_id,
      points,
      username: userdata[0].username,
      LoggedIn: true, // fix this
      uploads: uploads,
      isLoading: false,
    });
  }
}
