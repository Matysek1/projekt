"use client";

import { useState } from "react";

export function EditableText({
  initialKey,
  initialValue,
}: {
  initialKey: string;
  initialValue: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/text-update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: initialKey, value }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <label className="block text-sm font-semibold mb-2">{initialKey}</label>
      <textarea
        className="w-full border rounded-md p-2 mb-2"
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
      >
        {saving ? "Ukládání..." : saved ? "Uloženo ✓" : "Uložit"}
      </button>
    </div>
  );
}