"use server";

import { isAxiosError } from "axios";
import { headers } from "next/headers";
import api from "@/lib/api/axios/api";

type PumiItem = {
	id: number | string;
	name_en?: string;
	name_km?: string;
};

type PumiPayload = PumiItem[] | { data: PumiItem[] };

type PumiResource = "provinces" | "districts" | "communes" | "villages";

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

const resolvePumiBaseUrl = async () => {
	const configured = sanitizeEnvValue(process.env.PUMI_BASE_URL);

	if (!configured) {
		throw new Error("Missing PUMI_BASE_URL. Set it to an absolute URL or a relative path like /api/pumi.");
	}

	if (/^https?:\/\//.test(configured)) {
		return toBasePath(configured);
	}

	if (!configured.startsWith("/")) {
		throw new Error("Invalid PUMI_BASE_URL. Use an absolute URL or a relative path starting with '/'.");
	}

	const requestHeaders = await headers();
	const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
	if (!host) {
		throw new Error("Cannot resolve relative PUMI_BASE_URL because request host is unavailable.");
	}

	const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
	return toBasePath(new URL(configured, `${protocol}://${host}`).toString());
};

/**
 * Read Pumi items from payload
 * @param payload 
 * @returns
 */
const readPumiItems = (payload: PumiPayload): PumiItem[] => {
	if (Array.isArray(payload)) return payload;
	return Array.isArray(payload.data) ? payload.data : [];
};

/**
 * Fetch Pumi resource
 * @param resource 
 * @param params 
 * @returns 
 */
const fetchPumiResource = async (resource: PumiResource, params?: Record<string, string>): Promise<PumiItem[]> => {
	try {
		const baseUrl = await resolvePumiBaseUrl();
		const response = await api.get<PumiPayload>(`${baseUrl}/${resource}`, {
			params,
		});
		return readPumiItems(response.data);
	} catch (error) {
		if (isAxiosError(error)) {
			const status = error.response?.status ?? "network";
			throw new Error(`Pumi request failed (${resource}): ${status}`);
		}
		throw error;
	}
};

/**
 * Get all provinces
 * @returns 
 */
export const getProvincesAction = async () => fetchPumiResource("provinces");

/**
 * Get all districts by province
 * @param provinceId 
 * @returns 
 */
export const getDistrictsByProvinceAction = async (provinceId: string) => {
	if (!provinceId) return [];
	return fetchPumiResource("districts", { province_id: provinceId });
};

/**
 * Get all communes by district
 * @param districtId 
 * @returns 
 */
export const getCommunesByDistrictAction = async (districtId: string) => {
	if (!districtId) return [];
	return fetchPumiResource("communes", { district_id: districtId });
};

/**
 * Get all villages by commune
 * @param communeId 
 * @returns 
 */
export const getVillagesByCommuneAction = async (communeId: string) => {
	if (!communeId) return [];
	return fetchPumiResource("villages", { commune_id: communeId });
};
