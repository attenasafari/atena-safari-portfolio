import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/club/categories";
import type { CategoryId } from "@/club/types";
import { CategoryView } from "@/components/club/CategoryView";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ id: category.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = getCategory(id as CategoryId);
  return { title: category?.name ?? "Category" };
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  if (!getCategory(id as CategoryId)) notFound();
  return <CategoryView id={id as CategoryId} />;
}
