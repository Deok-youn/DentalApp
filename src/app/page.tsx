import { getSections } from '@/lib/catalog';
import { TocClient } from './TocClient';

export default function TableOfContentsPage() {
  const sections = getSections();
  return <TocClient sections={sections} />;
}
