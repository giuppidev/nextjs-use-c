"use client";

import { useState } from "react";

export default function CClient({ onClick }: { onClick: () => void }) {
  const [output, setOutput] = useState<any>("");

  async function handleOnClick() {
    const out = await onClick();
    setOutput(out);
  }

  return (
    <div className="h-52 bg-slate-700 flex flex-col p-6 text-white rounded-sm text-xl">
      <div className="grow text-2xl">{output}</div>
      <div className="flex justify-end">
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
