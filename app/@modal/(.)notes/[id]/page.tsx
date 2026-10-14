import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "../../../../lib/api";
import NotePreview from "../../../../components/NotePreview/NotePreview";

export const dynamic = "force-dynamic";

interface NotePreviewModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewModalPage({
  params,
}: NotePreviewModalPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
}
