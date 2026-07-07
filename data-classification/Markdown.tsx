import React from "react";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  if (!content) return null;

  // Split content by lines
  const lines = content.split("\n");
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];

  const renderedElements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        // End code block
        renderedElements.push(
          <pre
            key={`code-${i}`}
            className="my-3 p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-md overflow-x-auto border border-slate-800"
          >
            <code>{codeBlockContent.join("\n")}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Handle empty lines
    if (line.trim() === "") {
      renderedElements.push(<div key={`space-${i}`} className="h-2" />);
      continue;
    }

    // Process headers
    if (line.startsWith("# ")) {
      renderedElements.push(
        <h1 key={`h1-${i}`} className="text-xl font-bold text-slate-900 mt-4 mb-2 border-b pb-1">
          {parseInline(line.substring(2))}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="text-lg font-bold text-slate-800 mt-3 mb-2">
          {parseInline(line.substring(3))}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="text-md font-semibold text-slate-800 mt-2 mb-1">
          {parseInline(line.substring(4))}
        </h3>
      );
    } else if (line.startsWith("#### ")) {
      renderedElements.push(
        <h4 key={`h4-${i}`} className="text-sm font-semibold text-slate-700 mt-2 mb-1">
          {parseInline(line.substring(5))}
        </h4>
      );
    }
    // Process bullet lists
    else if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const bulletText = line.trim().substring(2);
      renderedElements.push(
        <li key={`li-${i}`} className="ml-5 list-disc text-slate-600 text-sm py-0.5">
          {parseInline(bulletText)}
        </li>
      );
    }
    // Process numbered lists
    else if (/^\d+\.\s/.test(line.trim())) {
      const match = line.trim().match(/^(\d+)\.\s(.*)/);
      if (match) {
        const num = match[1];
        const listText = match[2];
        renderedElements.push(
          <div key={`ol-${i}`} className="ml-5 flex items-start text-slate-600 text-sm py-0.5">
            <span className="font-semibold text-indigo-600 mr-2">{num}.</span>
            <span>{parseInline(listText)}</span>
          </div>
        );
      } else {
        renderedElements.push(
          <p key={`p-${i}`} className="text-slate-600 text-sm leading-relaxed">
            {parseInline(line)}
          </p>
        );
      }
    }
    // Default paragraph
    else {
      renderedElements.push(
        <p key={`p-${i}`} className="text-slate-600 text-sm leading-relaxed my-1">
          {parseInline(line)}
        </p>
      );
    }
  }

  return <div className="space-y-1">{renderedElements}</div>;
}

// Simple parser for bold (**text**), italics (*text*), and inline code (`code`)
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Pattern to find bold, italics, or inline code
  const regex = /(\*\*|`|\*)(.*?)\1/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    const delimiter = match[1];
    const matchContent = match[2];

    // Push preceding normal text
    if (matchIndex > currentIndex) {
      parts.push(text.substring(currentIndex, matchIndex));
    }

    // Render formatted text based on delimiter
    if (delimiter === "**") {
      parts.push(<strong key={`bold-${matchIndex}`} className="font-bold text-slate-800">{matchContent}</strong>);
    } else if (delimiter === "`") {
      parts.push(
        <code key={`code-${matchIndex}`} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-indigo-600 font-mono text-xs rounded">
          {matchContent}
        </code>
      );
    } else if (delimiter === "*") {
      parts.push(<em key={`em-${matchIndex}`} className="italic text-slate-700">{matchContent}</em>);
    }

    currentIndex = regex.lastIndex;
  }

  // Push remaining text
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : [text];
}
