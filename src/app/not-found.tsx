import type { Metadata } from "next";
import { PlayfulNotFound } from "@/components/shared/PlayfulNotFound";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The requested Digital Expert page could not be found.",
};

export default function NotFoundPage() {
  return <PlayfulNotFound />;
}
