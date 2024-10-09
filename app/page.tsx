import MarkdownConverter from '@/components/MarkdownConverter';
import { FileText } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
        <FileText className="mr-2" />
        Markdown to HTML Converter
      </h1>
      <MarkdownConverter />
    </main>
  );
}