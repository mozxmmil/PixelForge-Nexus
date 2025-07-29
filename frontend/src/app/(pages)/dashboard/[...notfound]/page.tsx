// app/dashboard/[[...notfound]]/page.tsx
import { notFound } from "next/navigation";

export default function CatchAllDashboardRoute() {
	// Always show custom 404
	notFound();
}
