import CForm from "./CForm";

export default function FormPage() {
  async function onClick(jsValue: string) {
    "use c";
    
    #include <stdio.h>
    #include <string.h>
    main (int argc, char **argv)
    {
        char *cValue;
        cValue = strdup(jsValue);
        printf("Hello %s!",cValue);
    }
  }

  return (
    <main className="min-h-screen p-4 flex flex-col gap-6 bg-white">
      <CForm onClick={onClick} />
    </main>
  );
}
