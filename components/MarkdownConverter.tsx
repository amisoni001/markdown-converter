"use client"

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Eye, Code, Copy, Download } from 'lucide-react';

const MarkdownConverter: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# Hello, Markdown!\n\n## This is a subheading\n\nHere is some **bold** and *italic* text.\n\n- List item 1\n- List item 2\n\n1. Numbered item 1\n2. Numbered item 2\n\n[Link to Google](https://www.google.com)');
  const [html, setHtml] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(true);

  useEffect(() => {
    const convertedHtml = marked(markdown);
    setHtml(convertedHtml);
  }, [markdown]);

  const handleDownload = () => {
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Converted Markdown</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #ffffff; }
          h1 { font-size: 2.5em; color: #2c3e50; } h2 { font-size: 2em; color: #34495e; } h3 { font-size: 1.75em; color: #2c3e50; }
          h4 { font-size: 1.5em; color: #34495e; } h5 { font-size: 1.25em; color: #2c3e50; } h6 { font-size: 1em; color: #34495e; }
          p { color: #444; }
          pre { background-color: #f8f8f8; padding: 10px; border-radius: 5px; }
          code { font-family: 'Courier New', Courier, monospace; color: #e74c3c; }
          blockquote { border-left: 3px solid #ecf0f1; margin: 1em 0; padding-left: 20px; color: #7f8c8d; }
          a { color: #3498db; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(showPreview ? html : marked(markdown));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:flex-row bg-white text-gray-800">
      <div className="flex-1 border border-gray-200 rounded overflow-hidden">
        <textarea
          className="w-full h-full p-4 resize-none border-none outline-none font-mono text-sm leading-normal"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Enter your Markdown here..."
        />
      </div>
      <div className="flex-1 border border-gray-200 rounded ml-4 relative">
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            className="p-2 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => setShowPreview(!showPreview)}
            title={showPreview ? "Show HTML" : "Show Preview"}
          >
            {showPreview ? <Code size={20} /> : <Eye size={20} />}
          </button>
          <button
            className="p-2 bg-gray-100 rounded hover:bg-gray-200"
            onClick={copyToClipboard}
            title="Copy to clipboard"
          >
            <Copy size={20} />
          </button>
        </div>
        <div className="p-4 h-full overflow-auto">
          {showPreview ? (
            <div 
              dangerouslySetInnerHTML={{ __html: html }}
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none prose-headings:text-gray-700 prose-p:text-gray-600 prose-a:text-blue-600"
            />
          ) : (
            <SyntaxHighlighter
              language="html"
              style={tomorrow}
              customStyle={{
                margin: 0,
                padding: '1rem',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {html}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white border-none rounded cursor-pointer text-base hover:bg-blue-600 md:absolute md:bottom-4 md:right-4 flex items-center"
        onClick={handleDownload}
      >
        <Download size={20} className="mr-2" />
        Download HTML
      </button>
    </div>
  );
};

export default MarkdownConverter;