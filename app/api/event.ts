import { getItem } from "expo-secure-store";
import { base } from "../utils/types";
import { API_ENDPOINT_PREFIX, baseOptions } from "./settings";
import { getBaseAxios } from "./project";

export type event = {
  event_id: string;
  event_name: string;
  event_desc: string;
  xp: string;
  deadline: string;
  accepts: string;
  accepted: boolean;
};
export const getAllEvents = async (user_id: string | number) => {
  let response = await getBaseAxios(`/events/${user_id}`);
  let data: base<event> = response.data;
  return data;
};

export const acceptEvent = async (user_id: number, event_id: number) => {
  const response = await getBaseAxios(`accept/${event_id}/${user_id}`);
  const data: { action: "inc" | "dec" } = response.data;

  return data;
};
// export const
