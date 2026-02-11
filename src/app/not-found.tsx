import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-accent mb-4">404</div>
        <p className="text-text-muted text-lg mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
