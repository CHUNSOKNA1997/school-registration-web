import { NextRequest, NextResponse } from "next/server";

const ALLOWED_RESOURCES = new Set(["provinces", "districts", "communes", "villages"]);
const PUMI_BASE_URL = "https://pumi.onrender.com/pumi";

type RouteContext = {
	params: Promise<{
		resource: string;
	}>;
};

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: RouteContext) {
	const { resource } = await context.params;

	if (!ALLOWED_RESOURCES.has(resource)) {
		return NextResponse.json({ error: "Unsupported Pumi resource" }, { status: 404 });
	}

	const targetUrl = new URL(`${PUMI_BASE_URL}/${resource}`);
	targetUrl.search = request.nextUrl.searchParams.toString();

	try {
		const upstream = await fetch(targetUrl, {
			method: "GET",
			headers: {
				Accept: "application/json",
			},
			cache: "no-store",
		});

		const body = await upstream.text();

		return new NextResponse(body, {
			status: upstream.status,
			headers: {
				"Content-Type": upstream.headers.get("content-type") ?? "application/json; charset=utf-8",
			},
		});
	} catch {
		return NextResponse.json({ error: "Failed to reach Pumi service" }, { status: 502 });
	}
}
