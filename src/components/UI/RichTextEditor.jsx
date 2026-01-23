import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Eye,
  Code,
} from "lucide-react";

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Enter description...",
  minHeight = "200px",
  disabled = false,
}) => {
  const [content, setContent] = useState(value);
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleContentChange = (e) => {
    const newContent = e.target.innerHTML;
    setContent(newContent);
    onChange(newContent);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const toolbarButtons = [
    {
      icon: Bold,
      command: "bold",
      title: "Bold",
    },
    {
      icon: Italic,
      command: "italic",
      title: "Italic",
    },
    {
      icon: Underline,
      command: "underline",
      title: "Underline",
    },
    {
      icon: List,
      command: "insertUnorderedList",
      title: "Bullet List",
    },
    {
      icon: ListOrdered,
      command: "insertOrderedList",
      title: "Numbered List",
    },
    {
      icon: Link,
      command: "createLink",
      title: "Insert Link",
      requiresValue: true,
    },
  ];

  const handleToolbarClick = (button) => {
    if (button.requiresValue) {
      const url = prompt("Enter URL:");
      if (url) execCommand(button.command, url);
    } else {
      execCommand(button.command);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        {toolbarButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleToolbarClick(button)}
              disabled={disabled || showPreview}
              title={button.title}
              className="p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Icon size={18} />
            </button>
          );
        })}

        <div className="ml-auto flex gap-1">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`
              p-2 rounded transition-colors
              ${
                showPreview
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-200"
              }
            `}
            title={showPreview ? "Edit" : "Preview"}>
            {showPreview ? <Code size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      {showPreview ? (
        <div
          className="p-4 prose max-w-none"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleContentChange}
          onPaste={handlePaste}
          className="p-4 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset prose max-w-none"
          style={{ minHeight }}
          dangerouslySetInnerHTML={{ __html: content }}
          data-placeholder={placeholder}
        />
      )}

      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          cursor: text;
        }
        [contenteditable]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
