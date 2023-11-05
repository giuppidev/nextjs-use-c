import CClient from "./components/CClient";

export default function Home() {
  async function onClick() {
    "use c";

    #include<stdio.h>
    main()
    {
      printf("Hello Next!");
    }
  }

  return (
    <main className="min-h-screen p-4 flex flex-col gap-6 bg-white">
      <CClient onClick={onClick} />
    </main>
  );
}
