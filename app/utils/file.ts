import { readAsStringAsync } from "expo-file-system";

export const fileType = ["js", "py", "php", "cpp", "html", "css"];

export const returnFileType = (file: string | null) => {
  if (!file) {
    return null;
  }
  switch (file.split(".")[1]) {
    case "js":
      return "javascript";
    case "py":
      return "python";
    default:
      return file.split(".")[1];
  }
};

export const readContents = async (fileUri: string) => {
  return await readAsStringAsync(fileUri);
};
