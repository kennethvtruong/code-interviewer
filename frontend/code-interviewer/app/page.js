"use client";

import VideoChat from "./VideoChat";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between dark: bg-slate-800 h-screen">
      <VideoChat />
    </main>
  );
}
