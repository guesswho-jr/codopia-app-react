// export const API_ENDPOINT_PREFIX = process.env.API_ENDPOINT_PREFIX
// export const API_ENDPOINT_PREFIX = process.env.EXPO_PUBLIC_API_ENDPOINT_PREFIX
export const MAIN_PREFIX = "http://codopia.atwebpages.com";
export const API_ENDPOINT_PREFIX = `${MAIN_PREFIX}/index.php`;
export const baseOptions = {
  "Content-Type": "application/json",
};

export const DOWNLOAD_PATH = `${MAIN_PREFIX}/download.php?file=`;

export const EDIT_PROJECT_PATH = `${MAIN_PREFIX}/edit.php`;
export const DELETE_PROJECT_PATH = `${MAIN_PREFIX}/delete.php`;
