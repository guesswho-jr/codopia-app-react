import axios, { isAxiosError } from "axios";
import {
  cacheDirectory,
  createDownloadResumable,
  moveAsync,
} from "expo-file-system";

import { project } from "../utils/types";
import { base } from "../utils/types";
import { session } from "../hooks/Session";
import * as SecureStorage from "expo-secure-store";
import { API_ENDPOINT_PREFIX, DOWNLOAD_PATH } from "./settings";
import React from "react";

export const getBaseAxios = axios.create({
  baseURL: API_ENDPOINT_PREFIX,
  method: "GET",

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SecureStorage.getItem("token")}`,
  },
  timeout: 60 * 100,
});

export const postBaseAxios = axios.create({
  baseURL: API_ENDPOINT_PREFIX,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${SecureStorage.getItem("token")}`,
  },
});
export async function getAllProjects(): Promise<base<project> | null> {
  try {
    const req = await getBaseAxios.get(`projects_all`);
    const data: base<project> = req.data;
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      return null;
    }
    return null;
  }
}

type paramType = { username: string; password: string };
export async function login(params: paramType) {
  try {
    const req = await postBaseAxios.post(`${API_ENDPOINT_PREFIX}/login`, {
      data: params,
    });
    const response: { token: string } = req.data;
    console.log(response);

    if (!response.token) return false;
    const token = response.token;
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
    try {
      await Promise.all([
        SecureStorage.setItemAsync("username", decoded_token.username),
        SecureStorage.setItemAsync("points", decoded_token.points.toString()),
        SecureStorage.setItemAsync("uploads", decoded_token.uploads.toString()),
        SecureStorage.setItemAsync("user_id", decoded_token.user_id.toString()),
        SecureStorage.setItemAsync("token", token),
      ]);
    } finally {
      return true;
    }
  } catch (err) {
    if (isAxiosError(err)) {
      console.log("============================");
      
      console.log(err, err.response?.data);

      return false;
    }
  }
}

export async function getProjectByUserId(
  user_id: string | number
): Promise<base<project>> {
  const request = await getBaseAxios.get(
    `${API_ENDPOINT_PREFIX}/project/${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${SecureStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data: base<project> = request.data;
  return data;
}

export async function download(
  file_path: string,
  setState: React.Dispatch<
    React.SetStateAction<{ uri: string; progress: number }>
  >
) {
  try {
    const downloader = createDownloadResumable(
      `${DOWNLOAD_PATH}/${file_path}`,
      cacheDirectory + file_path,
      {},

      (progress) => {
        const p =
          progress.totalBytesWritten / progress.totalBytesExpectedToWrite;
        setState((prev) => {
          return {
            ...prev,
            progress: p,
          };
        });
      }
    );

    const result = await downloader.downloadAsync();
    if (typeof result === "undefined") {
      throw new Error("Download failed!");
    }
    const newName = result.headers["X-NAME"];
    await moveAsync({
      from: cacheDirectory + file_path,
      to: cacheDirectory + newName,
    });
    // if ((await getInfoAsync(result.uri)).exists) {
    //   const res = await unzip(result.uri, cacheDirectory ?? ".");
    //   console.log(res);
    // }
    setState((prev) => {
      return { ...prev, uri: cacheDirectory + newName };
    });
  } catch (E) {
    return false;
  }
}
