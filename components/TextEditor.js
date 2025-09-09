"use client";

import { useState, useRef, useEffect } from "react";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Escribe tu contenido...",
}) {
  const editorRef = useRef(null);
  const [content, setContent] = useState(value || "");

  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const formatHeading = (tag) => {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      // Si hay texto seleccionado
      if (!range.collapsed) {
        const selectedText = range.toString();
        const element = document.createElement(tag);
        element.textContent = selectedText;

        // Aplicar clases de Tailwind según el tipo de encabezado
        if (tag === "h1") {
          element.className = "text-2xl font-bold text-amber-600 my-4";
        } else if (tag === "h2") {
          element.className = "text-xl font-bold text-amber-600 my-3";
        } else if (tag === "h3") {
          element.className = "text-lg font-bold text-amber-600 my-2";
        } else if (tag === "p") {
          element.className = "text-base my-2";
        }

        range.deleteContents();
        range.insertNode(element);

        // Mover el cursor después del elemento insertado
        range.setStartAfter(element);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // Si no hay selección, crear un nuevo elemento en la posición del cursor
        const element = document.createElement(tag);
        element.innerHTML =
          tag === "p" ? "Párrafo" : `Título ${tag.toUpperCase()}`;

        // Aplicar clases de Tailwind
        if (tag === "h1") {
          element.className = "text-2xl font-bold text-amber-600 my-4";
        } else if (tag === "h2") {
          element.className = "text-xl font-bold text-amber-600 my-3";
        } else if (tag === "h3") {
          element.className = "text-lg font-bold text-amber-600 my-2";
        } else if (tag === "p") {
          element.className = "text-base my-2";
        }

        range.insertNode(element);

        // Seleccionar el texto del nuevo elemento para que el usuario pueda editarlo
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      editorRef.current?.focus();
      handleInput();
    }
  };

  const toggleList = (listType) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      // Verificar si ya estamos en una lista
      let currentElement = selection.anchorNode;
      if (currentElement.nodeType === Node.TEXT_NODE) {
        currentElement = currentElement.parentElement;
      }

      // Buscar si estamos dentro de una lista
      let listElement = currentElement;
      while (listElement && listElement !== editorRef.current) {
        if (listElement.tagName === "UL" || listElement.tagName === "OL") {
          break;
        }
        listElement = listElement.parentElement;
      }

      if (
        listElement &&
        (listElement.tagName === "UL" || listElement.tagName === "OL")
      ) {
        // Ya estamos en una lista, remover formato
        document.execCommand("outdent", false, null);
      } else {
        // No estamos en una lista, crear una
        if (listType === "ul") {
          document.execCommand("insertUnorderedList", false, null);
        } else {
          document.execCommand("insertOrderedList", false, null);
        }
      }

      editorRef.current?.focus();
      handleInput();
    }
  };

  const insertImage = () => {
    const url = window.prompt("URL de la imagen:");
    if (url) {
      execCommand("insertImage", url);
    }
  };

  const createLink = () => {
    const url = window.prompt("URL del enlace:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const insertHTML = (html) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const div = document.createElement("div");
        div.innerHTML = html;
        const frag = document.createDocumentFragment();
        let node;
        while ((node = div.firstChild)) {
          frag.appendChild(node);
        }
        range.insertNode(frag);
        handleInput();
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
          {/* Formato de texto */}
          <button
            type="button"
            onClick={() => execCommand("bold")}
            className="px-3 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300 font-bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => execCommand("italic")}
            className="px-3 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300 italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => execCommand("underline")}
            className="px-3 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300 underline"
          >
            U
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Encabezados */}
          <button
            type="button"
            onClick={() => formatHeading("h1")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => formatHeading("h2")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => formatHeading("h3")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => formatHeading("p")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            P
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Listas */}
          <button
            type="button"
            onClick={() => toggleList("ul")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            • Lista
          </button>
          <button
            type="button"
            onClick={() => toggleList("ol")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            1. Lista
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Alineación */}
          <button
            type="button"
            onClick={() => execCommand("justifyLeft")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyCenter")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyRight")}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            →
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Colores */}
          <input
            type="color"
            onChange={(e) => execCommand("foreColor", e.target.value)}
            className="w-8 h-6 rounded border border-gray-300 cursor-pointer"
            title="Color de texto"
          />
          <input
            type="color"
            onChange={(e) => execCommand("hiliteColor", e.target.value)}
            className="w-8 h-6 rounded border border-gray-300 cursor-pointer"
            title="Color de fondo"
          />

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Enlaces e imágenes */}
          <button
            type="button"
            onClick={createLink}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            🔗 Link
          </button>
          <button
            type="button"
            onClick={insertImage}
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            🖼️ Imagen
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Elementos especiales */}
          <button
            type="button"
            onClick={() =>
              insertHTML(
                "<blockquote style='border-left: 4px solid #f59e0b; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6b7280;'>Cita inspiradora</blockquote>"
              )
            }
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            " Cita
          </button>
          <button
            type="button"
            onClick={() =>
              insertHTML(
                "<hr style='border: none; border-top: 2px solid #f59e0b; margin: 1rem 0;'>"
              )
            }
            className="px-2 py-1 text-sm rounded hover:bg-amber-100 border border-gray-300"
          >
            ─ Línea
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1"></div>

          {/* Limpiar formato */}
          <button
            type="button"
            onClick={() => execCommand("removeFormat")}
            className="px-2 py-1 text-sm rounded hover:bg-red-100 border border-gray-300 text-red-600"
          >
            🧹 Limpiar
          </button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-4 min-h-[200px] focus:outline-none prose prose-sm max-w-none"
          style={{
            lineHeight: "1.6",
            fontSize: "14px",
          }}
          suppressContentEditableWarning={true}
          data-placeholder={placeholder}
        />
      </div>

      <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
        <p>
          💡 Selecciona texto y usa los botones para darle formato. ¡Deja volar
          tu creatividad!
        </p>
      </div>

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          font-style: italic;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 0.5rem 0;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #f59e0b;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        [contenteditable] ul,
        [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        [contenteditable] a {
          color: #f59e0b;
          text-decoration: underline;
        }
        [contenteditable] h1 {
          font-size: 1.5rem;
          color: #f59e0b;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        [contenteditable] h2 {
          font-size: 1.25rem;
          color: #f59e0b;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        [contenteditable] h3 {
          font-size: 1.1rem;
          color: #f59e0b;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        [contenteditable] p {
          font-size: 1rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
