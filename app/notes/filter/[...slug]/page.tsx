import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import type { NoteTag } from "../../../../types/note";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

interface FilteredNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const rawTag = slug?.[0] ?? "all";
  const filterName = rawTag === "all" ? "All notes" : rawTag;

  const title = `Notes: ${filterName} | NoteHub`;
  const description = `Browse notes filtered by "${filterName}" in NoteHub.`;
  const url = `https://08-zustand.vercel.app/notes/filter/${rawTag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub — notes",
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  // slug[0] is "all" (no filter) or a concrete tag.
  const rawTag = slug?.[0];
  const tag: NoteTag | undefined =
    rawTag && rawTag !== "all" ? (rawTag as NoteTag) : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag ?? ""],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
