"use client";

import { useState } from "react";

export default function CForm({
  onClick,
}: {
  onClick: (value: string) => void;
}) {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<any>("");

  async function handleOnClick() {
    const out = await onClick(input);
    setOutput(out);
  }

  return (
    <div className="h-52 bg-slate-700 flex flex-col p-6 text-white rounded-sm text-xl">
      <div className="grow text-2xl">{output}</div>
      <div className="flex gap-4">
        <input
          className="block grow w-2/3 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-900  sm:leading-6"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          onClick={handleOnClick}
          className="rounded-md w-32 text-white bg-red-800 px-3 py-2  font-semibold  shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Execute C
        </button>
      </div>
    </div>
  );
}
