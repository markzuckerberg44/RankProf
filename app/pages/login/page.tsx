"use client";
import { useSearchParams} from "next/navigation";

export default function Page() {
    const router = useSearchParams();
    const code = router.get("message");

    return (
        <main className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center w-full max-w-4xl flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold mb-4">⭐️ papafrita ⭐️</h1>
        {code && <p className="mt-4">{code}</p>}
      </div>
    </main>
    );
}