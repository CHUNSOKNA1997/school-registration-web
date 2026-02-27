import { NextRequest, NextResponse } from "next/server";

const ALLOWED_RESOURCES = new Set(["provinces", "districts", "communes", "villages"]);

const sanitizeEnvValue = (value?: string) => {
	if (!value) return undefined;
	return value
		.trim()
		.replace(/;$/, "")
		.trim()
		.replace(/^['"]|['"]$/g, "")
		.trim();
};

const toBasePath = (value: string) => value.replace(/\/+$/, "");

const resolvePumiUpstreamBaseUrl = () => {
	const upstream = sanitizeEnvValue(process.env.PUMI_UPSTREAM_BASE_URL);
	if (!upstream) {
		throw new Error("Missing PUMI_UPSTREAM_BASE_URL. Set it to the upstream Pumi URL.");
	}

	if (!/^https?:\/\//.test(upstream)) {
		throw new Error("Invalid PUMI_UPSTREAM_BASE_URL. Use an absolute URL.");
	}

	return toBasePath(upstream);
};

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

	let targetUrl: URL;
	try {
		const upstreamBaseUrl = resolvePumiUpstreamBaseUrl();
		targetUrl = new URL(`${upstreamBaseUrl}/${resource}`);
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Invalid Pumi upstream configuration." },
			{ status: 500 },
		);
	}

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
