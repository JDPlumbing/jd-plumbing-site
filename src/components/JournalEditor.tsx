'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect } from 'react'
import { Editor } from '@tiptap/react'

export default function JournalEditor({
  content,
  onChange,
}: {
  content: string
  onChange: (v: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content])

  if (!editor) return null

  return (
    <div className="border rounded p-2 space-y-2">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  )
}

function EditorToolbar({ editor }: { editor: Editor }) {
  const buttonBase = 'px-2 py-1 rounded text-sm'
  const active = 'bg-blue-600 text-white'
  const inactive = 'bg-neutral-700 text-gray-200 hover:bg-neutral-600'

  return (
    <div className="flex flex-wrap gap-2 border-b border-neutral-700 pb-2 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${buttonBase} ${
          editor.isActive('bold') ? active : inactive
        }`}
      >
        Bold
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${buttonBase} ${
          editor.isActive('italic') ? active : inactive
        }`}
      >
        Italic
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline?.().run()}
        className={`${buttonBase} ${
          editor.isActive('underline') ? active : inactive
        }`}
      >
        Underline
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${buttonBase} ${
          editor.isActive('heading', { level: 2 }) ? active : inactive
        }`}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${buttonBase} ${
          editor.isActive('bulletList') ? active : inactive
        }`}
      >
        • List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${buttonBase} ${
          editor.isActive('codeBlock') ? active : inactive
        }`}
      >
        Code
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${buttonBase} ${
          editor.isActive('blockquote') ? active : inactive
        }`}
      >
        “ Quote
      </button>

      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`${buttonBase} ${inactive}`}
      >
        ───
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={`${buttonBase} ${inactive}`}
      >
        ↶ Undo
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={`${buttonBase} ${inactive}`}
      >
        ↷ Redo
      </button>
    </div>
  )
}

