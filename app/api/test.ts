import { base } from "../utils/types";
import { API_ENDPOINT_PREFIX } from "./settings";
import * as SecureStorage from "expo-secure-store";
import { getBaseAxios } from "./project";

interface test {
  id: number;
  name: "JavaScript" | "HTML";
  prepared_by: string;
  difficulity: string;
}
//take_test/user_id/subject_id

export default async function fetchTestList() {
  const tests: base<test> = await fetch(`${API_ENDPOINT_PREFIX}/test_list`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SecureStorage.getItem("token")}`,
    },
  }).then((tests) => tests.json());
  if (tests.success) return tests.data;
  else return null;
}

type firstTestResponse = {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  error?: string;
};

export interface nextQuestionResponse {
  correct: boolean | 0 | 1;
  ans: {
    answer: "a" | "b" | "c" | "d";
  };
  nextQuestion: {
    question: string;
    a: string;
    b: string;
    c: string;
    d: string;
    topic: string;
  };
  code?: number;
}

export interface temporaryQuestion {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  topic: string;
}

export async function getTheFirstQuestion(
  user_id: number,
  subject_name: string
): Promise<base<firstTestResponse>> {
  const res = await getBaseAxios(
    `${API_ENDPOINT_PREFIX}/begin_test/${user_id}/${subject_name}`
  );

  const data: base<firstTestResponse> & { code?: string; message?: string } =
    res.data;
  if (data.message || res.status === 403) {
    if (data.message) throw new Error(res.data);
  }
  return data;
}
export async function getTheNextQuestion(
  user_id: number,
  subject_name: string,
  user_answer: string
): Promise<nextQuestionResponse> {
  const res = await getBaseAxios(
    `${API_ENDPOINT_PREFIX}/next_question/${user_id}/${subject_name}/${user_answer}`
  );
  const data: nextQuestionResponse = res.data;

  return data;
}
