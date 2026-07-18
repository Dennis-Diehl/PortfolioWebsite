"use client";

import { useEffect, useRef, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import type { SearchDoc } from "@/content/searchDocs";
import { search, type SearchResult } from "@/lib/search";
import { useIde } from "../ide-context";
import { usePalette } from "../palette-context";
import { FileIcon } from "../file-icons";
import { ALL_FILES } from "@/content/registry";

export function SearchPalette() {
  const { open, setOpen } = usePalette();
  const { openFile } = useIde();
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazily load the index the first time the palette opens.
  useEffect(() => {
    if (!open || docs) return;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((data: SearchDoc[]) => setDocs(data))
      .catch(() => setDocs([]));
  }, [open, docs]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  if (!open) return null;

  const results: SearchResult[] = docs ? search(docs, query) : [];
  const clampedActive = Math.min(activeIndex, Math.max(0, results.length - 1));

  function choose(result: SearchResult) {
    openFile(result.doc.path);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[clampedActive];
      if (r) choose(r);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-lg border border-border bg-sidebar-bg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="combobox"
        aria-expanded="true"
        aria-haspopup="listbox"
        aria-controls="search-results"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <SearchIcon size={16} className="text-muted" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search files, keywords and content…"
            aria-label="Search"
            aria-autocomplete="list"
            aria-activedescendant={
              results[clampedActive] ? `result-${results[clampedActive].doc.path}` : undefined
            }
            className="w-full bg-transparent text-sm text-editor-fg outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
            Esc
          </kbd>
        </div>

        <ul id="search-results" role="listbox" aria-label="Search results" className="max-h-[50vh] overflow-y-auto">
          {docs === null && (
            <li className="px-4 py-6 text-center text-sm text-muted">Loading index…</li>
          )}
          {docs !== null && results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted">
              No files match “{query}”.
            </li>
          )}
          {results.map((result, i) => {
            const file = ALL_FILES.find((f) => f.path === result.doc.path);
            const active = i === clampedActive;
            return (
              <li key={result.doc.path} role="option" aria-selected={active} id={`result-${result.doc.path}`}>
                <button
                  type="button"
                  onClick={() => choose(result)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex w-full flex-col gap-0.5 border-l-2 px-4 py-2.5 text-left transition-colors ${
                    active ? "border-link bg-hover" : "border-transparent hover:bg-hover"
                  }`}
                >
                  <span className="flex items-center gap-2 text-sm text-editor-fg">
                    {file && <FileIcon file={file} size={14} />}
                    <span className="font-medium">{result.doc.fileName}</span>
                    <span className="truncate font-mono text-xs text-muted">
                      {result.doc.path || "/"}
                    </span>
                  </span>
                  {result.snippet.length > 0 && query && (
                    <span className="line-clamp-1 pl-6 text-xs text-muted">
                      {result.snippet.map((part, j) =>
                        part.highlight ? <mark key={j}>{part.text}</mark> : <span key={j}>{part.text}</span>,
                      )}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
