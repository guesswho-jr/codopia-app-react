import axios, { isAxiosError } from "axios";
import { API_ENDPOINT_PREFIX, EDIT_PROJECT_PATH } from "./settings";
import { getItem } from "expo-secure-store";
import { getBaseAxios } from "./project";
import {
  cacheDirectory,
  deleteAsync,
  FileSystemUploadType,
  getInfoAsync,
  makeDirectoryAsync,
  uploadAsync,
  writeAsStringAsync,
} from "expo-file-system";
import { zip } from "react-native-zip-archive";
import React from "react";

const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${getItem("token")}`,
};
export const editProject = async (
  name: string,
  description: string,
  project_id: string
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("projId", project_id);
  formData.append("projDesc", description);
  const response = await axios.post(EDIT_PROJECT_PATH, formData, {
    headers: headers,
  });
  const data: { success?: boolean; error?: boolean } = response.data;

  if (data.success) return true;
  if (data.error) return false;
};
export const deleteProject = async (user_id: string, project_id: string) => {
  const response = await getBaseAxios(`delete/${user_id}/${project_id}`);
  const data: "deleted" | "error" = response.data;
  if (data == "deleted") return true;
  if (data == "error") return false;
};

export const sendFeedBack = async (feed: string, user_id: string) => {
  const formData = new FormData();
  formData.append("feed", feed);
  formData.append("userid", user_id);
  try {
    const response = await axios.post(
      `${API_ENDPOINT_PREFIX}/feedback`,
      formData,
      {
        headers: headers,
      }
    );
    const data: { success?: boolean; error?: boolean } = response.data;
    return data.success === true;
  } catch (E) {
    return false;
  }
};

export const save = async (
  name: string,
  fileContent: string,
  desc: string,
  user_id: string,
  fileName: string,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const file_dir = `${cacheDirectory}/${fileName.split(".")[0]}`;
  if ((await getInfoAsync(file_dir)).exists) {
    await deleteAsync(file_dir);
  }
  await makeDirectoryAsync(file_dir);

  await writeAsStringAsync(`${file_dir}/${fileName}`, fileContent);
  if ((await getInfoAsync(file_dir)).exists) {
    let zip_file_path;
    try {
      zip_file_path = await zip(file_dir, `${file_dir}/${fileName}.zip`);
    } catch (E) {
      setError(true);
    } finally {
      if (!zip_file_path) {
        setError(true);
        return;
      }
    }
  }
  try {
    await uploadAsync(
      `${API_ENDPOINT_PREFIX}/upload/${name}/${desc}/${user_id}`,
      `${file_dir}/${fileName}.zip`,
      {
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: "file",
        headers: headers,
        httpMethod: "POST",
      }
    );
  } catch (E) {
    setError(true);
  } finally {
    setProgress(1);
    setSuccess(true);
  }
};

type returnType = Promise<
  | {
      success?: boolean;
      error?: string;
      reason?: string;
    }
  | boolean
>;
export interface signUp {
  username: string;
  email: string;
  password: string;
  cpassword: string;
  full_name: string;
  bio: string;
}

export const signUpActions = async (
  data: signUp,
  action: "send_code" | "check_code",
  code?: number
): returnType => {
  try {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key as keyof typeof data]);
    }
    const response = await axios.post(
      `${API_ENDPOINT_PREFIX}/signup/${action}${
        action === "check_code" && code ? "/" + code : ""
      }`,
      formData,
      { headers: headers } // 162.210.102.233
    );
    const fetchedData: returnType = response.data;

    return fetchedData;
  } catch (E) {
    if (isAxiosError(E)) {
      console.log(E.response?.data);
      return false;
    }
    console.log(E);

    return false;
  }
};

// export const signUp = async () => {
//   // Mark: first up the code_sending_stage
// };
