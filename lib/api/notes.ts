import axios, { type AxiosResponse } from "axios";
import type { NewNote, Note, NoteTag } from "../../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const noteHubClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const { page, perPage, search, tag } = params;

  const requestParams: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search && search.trim() !== "") {
    requestParams.search = search.trim();
  }

  // For the "all" route no tag is sent at all; only a concrete tag filters.
  if (tag) {
    requestParams.tag = tag;
  }

  const response: AxiosResponse<FetchNotesResponse> = await noteHubClient.get(
    "/notes",
    { params: requestParams },
  );

  return response.data;
};

export const createNote = async (note: NewNote): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubClient.post(
    "/notes",
    note,
  );

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubClient.delete(
    `/notes/${id}`,
  );

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubClient.get(`/notes/${id}`);

  return response.data;
};
