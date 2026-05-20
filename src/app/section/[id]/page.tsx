import { notFound } from 'next/navigation';
import { getSections, getSectionById } from '@/lib/catalog';
import { SectionClient } from './SectionClient';

export async function generateStaticParams() {
  return getSections().map((s) => ({ id: s.id }));
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const section = getSectionById(id);
  if (!section) notFound();

  const sections = getSections();
  const idx = sections.findIndex((s) => s.id === id);
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx < sections.length - 1 ? sections[idx + 1] : null;

  return <SectionClient section={section} prev={prev} next={next} />;
}
