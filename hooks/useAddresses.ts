"use client";

import { useMemo } from "react";
import { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import type { FormData } from "@/components/register/types";
import api from "@/lib/api/axios/api";

export type PumiItem = {
	id: number | string;
	name_en?: string;
	name_km?: string;
};

type PumiPayload = PumiItem[] | { data: PumiItem[] };
type PumiResource = "provinces" | "districts" | "communes" | "villages";

const EMPTY_ITEMS: PumiItem[] = [];
const PUMI_CACHE_TIME = 5 * 60 * 1000;

const readPumiItems = (payload: PumiPayload): PumiItem[] => {
	if (Array.isArray(payload)) return payload;
	return Array.isArray(payload.data) ? payload.data : [];
};

const fetchPumiResource = async (resource: PumiResource, params?: Record<string, string>) => {
	try {
		const response = await api.get<PumiPayload>(`/api/pumi/${resource}`, { params });
		return readPumiItems(response.data);
	} catch (error) {
		if (isAxiosError(error)) {
			const status = error.response?.status ?? "network";
			throw new Error(`Pumi request failed (${resource}): ${status}`);
		}
		throw error;
	}
};

export const useAddresses = (form: FormData) => {
	const provincesQuery = useQuery({
		queryKey: ["pumi", "provinces"],
		queryFn: () => fetchPumiResource("provinces"),
		staleTime: PUMI_CACHE_TIME,
	});

	const districtsQuery = useQuery({
		queryKey: ["pumi", "districts", form.current_province_id],
		queryFn: () => fetchPumiResource("districts", { province_id: form.current_province_id }),
		enabled: Boolean(form.current_province_id),
		staleTime: PUMI_CACHE_TIME,
	});

	const communesQuery = useQuery({
		queryKey: ["pumi", "communes", form.current_district_id],
		queryFn: () => fetchPumiResource("communes", { district_id: form.current_district_id }),
		enabled: Boolean(form.current_district_id),
		staleTime: PUMI_CACHE_TIME,
	});

	const villagesQuery = useQuery({
		queryKey: ["pumi", "villages", form.current_commune_id],
		queryFn: () => fetchPumiResource("villages", { commune_id: form.current_commune_id }),
		enabled: Boolean(form.current_commune_id),
		staleTime: PUMI_CACHE_TIME,
	});

	const provinces = provincesQuery.data ?? EMPTY_ITEMS;
	const districts = districtsQuery.data ?? EMPTY_ITEMS;
	const communes = communesQuery.data ?? EMPTY_ITEMS;
	const villages = villagesQuery.data ?? EMPTY_ITEMS;

	const loadingProvinces = provincesQuery.isPending;
	const loadingDistricts = Boolean(form.current_province_id) && districtsQuery.isPending;
	const loadingCommunes = Boolean(form.current_district_id) && communesQuery.isPending;
	const loadingVillages = Boolean(form.current_commune_id) && villagesQuery.isPending;

	const locationError = useMemo(() => {
		if (provincesQuery.error) return "Unable to load provinces from Pumi.";
		if (districtsQuery.error) return "Unable to load districts from Pumi.";
		if (communesQuery.error) return "Unable to load communes from Pumi.";
		if (villagesQuery.error) return "Unable to load villages from Pumi.";
		return null;
	}, [communesQuery.error, districtsQuery.error, provincesQuery.error, villagesQuery.error]);

	return {
		communes,
		districts,
		loadingCommunes,
		loadingDistricts,
		loadingProvinces,
		loadingVillages,
		locationError,
		provinces,
		villages,
	};
};

export const useBirthPlace = (form: FormData) => {
	const provincesQuery = useQuery({
		queryKey: ["pumi", "provinces"],
		queryFn: () => fetchPumiResource("provinces"),
		staleTime: PUMI_CACHE_TIME,
	});

	const districtsQuery = useQuery({
		queryKey: ["pumi", "birth-districts", form.birth_province_id],
		queryFn: () => fetchPumiResource("districts", { province_id: form.birth_province_id }),
		enabled: Boolean(form.birth_province_id),
		staleTime: PUMI_CACHE_TIME,
	});

	const communesQuery = useQuery({
		queryKey: ["pumi", "birth-communes", form.birth_district_id],
		queryFn: () => fetchPumiResource("communes", { district_id: form.birth_district_id }),
		enabled: Boolean(form.birth_district_id),
		staleTime: PUMI_CACHE_TIME,
	});

	const villagesQuery = useQuery({
		queryKey: ["pumi", "birth-villages", form.birth_commune_id],
		queryFn: () => fetchPumiResource("villages", { commune_id: form.birth_commune_id }),
		enabled: Boolean(form.birth_commune_id),
		staleTime: PUMI_CACHE_TIME,
	});

	const provinces = provincesQuery.data ?? EMPTY_ITEMS;
	const districts = districtsQuery.data ?? EMPTY_ITEMS;
	const communes = communesQuery.data ?? EMPTY_ITEMS;
	const villages = villagesQuery.data ?? EMPTY_ITEMS;

	const loadingProvinces = provincesQuery.isPending;
	const loadingDistricts = Boolean(form.birth_province_id) && districtsQuery.isPending;
	const loadingCommunes = Boolean(form.birth_district_id) && communesQuery.isPending;
	const loadingVillages = Boolean(form.birth_commune_id) && villagesQuery.isPending;

	const locationError = useMemo(() => {
		if (provincesQuery.error) return "Unable to load birth provinces from Pumi.";
		if (districtsQuery.error) return "Unable to load birth districts from Pumi.";
		if (communesQuery.error) return "Unable to load birth communes from Pumi.";
		if (villagesQuery.error) return "Unable to load birth villages from Pumi.";
		return null;
	}, [communesQuery.error, districtsQuery.error, provincesQuery.error, villagesQuery.error]);

	return {
		communes,
		districts,
		loadingCommunes,
		loadingDistricts,
		loadingProvinces,
		loadingVillages,
		locationError,
		provinces,
		villages,
	};
};
