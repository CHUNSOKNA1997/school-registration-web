"use server";

import { isAxiosError } from "axios";
import api from "@/lib/api/axios/api";

type PumiItem = {
	id: number | string;
	name_en?: string;
	name_km?: string;
};

type PumiPayload = PumiItem[] | { data: PumiItem[] };

type PumiResource = "provinces" | "districts" | "communes" | "villages";

const DEFAULT_PUMI_BASE_URL = "https://pumi.onrender.com/pumi";
const envBaseUrl = process.env.PUMI_BASE_URL?.trim().replace(/^["']|["']$/g, "");
const PUMI_BASE_URL =
	envBaseUrl && /^https?:\/\//.test(envBaseUrl) ? envBaseUrl : DEFAULT_PUMI_BASE_URL;

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
		const response = await api.get<PumiPayload>(`${PUMI_BASE_URL}/${resource}`, {
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
