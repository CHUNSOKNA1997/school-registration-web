"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	getCommunesByDistrictAction,
	getDistrictsByProvinceAction,
	getProvincesAction,
	getVillagesByCommuneAction,
} from "@/actions/addresses.action";
import type { FormData } from "@/components/register/types";

export type PumiItem = {
	id: number | string;
	name_en?: string;
	name_km?: string;
};

const EMPTY_ITEMS: PumiItem[] = [];

export const useAddresses = (form: FormData) => {
	const provincesQuery = useQuery({
		queryKey: ["pumi", "provinces"],
		queryFn: getProvincesAction,
	});

	const districtsQuery = useQuery({
		queryKey: ["pumi", "districts", form.current_province_id],
		queryFn: () => getDistrictsByProvinceAction(form.current_province_id),
		enabled: Boolean(form.current_province_id),
	});

	const communesQuery = useQuery({
		queryKey: ["pumi", "communes", form.current_district_id],
		queryFn: () => getCommunesByDistrictAction(form.current_district_id),
		enabled: Boolean(form.current_district_id),
	});

	const villagesQuery = useQuery({
		queryKey: ["pumi", "villages", form.current_commune_id],
		queryFn: () => getVillagesByCommuneAction(form.current_commune_id),
		enabled: Boolean(form.current_commune_id),
	});

	const permanentDistrictsQuery = useQuery({
		queryKey: ["pumi", "permanent-districts", form.permanent_province_id],
		queryFn: () => getDistrictsByProvinceAction(form.permanent_province_id),
		enabled: Boolean(form.permanent_province_id),
	});

	const permanentCommunesQuery = useQuery({
		queryKey: ["pumi", "permanent-communes", form.permanent_district_id],
		queryFn: () => getCommunesByDistrictAction(form.permanent_district_id),
		enabled: Boolean(form.permanent_district_id),
	});

	const permanentVillagesQuery = useQuery({
		queryKey: ["pumi", "permanent-villages", form.permanent_commune_id],
		queryFn: () => getVillagesByCommuneAction(form.permanent_commune_id),
		enabled: Boolean(form.permanent_commune_id),
	});

	const provinces = provincesQuery.data ?? EMPTY_ITEMS;
	const districts = districtsQuery.data ?? EMPTY_ITEMS;
	const communes = communesQuery.data ?? EMPTY_ITEMS;
	const villages = villagesQuery.data ?? EMPTY_ITEMS;
	const permanentDistricts = permanentDistrictsQuery.data ?? EMPTY_ITEMS;
	const permanentCommunes = permanentCommunesQuery.data ?? EMPTY_ITEMS;
	const permanentVillages = permanentVillagesQuery.data ?? EMPTY_ITEMS;

	const loadingProvinces = provincesQuery.isPending;
	const loadingDistricts = Boolean(form.current_province_id) && districtsQuery.isPending;
	const loadingCommunes = Boolean(form.current_district_id) && communesQuery.isPending;
	const loadingVillages = Boolean(form.current_commune_id) && villagesQuery.isPending;
	const loadingPermanentDistricts = Boolean(form.permanent_province_id) && permanentDistrictsQuery.isPending;
	const loadingPermanentCommunes = Boolean(form.permanent_district_id) && permanentCommunesQuery.isPending;
	const loadingPermanentVillages = Boolean(form.permanent_commune_id) && permanentVillagesQuery.isPending;

	const locationError = useMemo(() => {
		if (provincesQuery.error) return "Unable to load provinces from Pumi.";
		if (districtsQuery.error) return "Unable to load districts from Pumi.";
		if (communesQuery.error) return "Unable to load communes from Pumi.";
		if (villagesQuery.error) return "Unable to load villages from Pumi.";
		if (permanentDistrictsQuery.error) return "Unable to load permanent districts from Pumi.";
		if (permanentCommunesQuery.error) return "Unable to load permanent communes from Pumi.";
		if (permanentVillagesQuery.error) return "Unable to load permanent villages from Pumi.";
		return null;
	}, [
		communesQuery.error,
		districtsQuery.error,
		permanentCommunesQuery.error,
		permanentDistrictsQuery.error,
		permanentVillagesQuery.error,
		provincesQuery.error,
		villagesQuery.error,
	]);

	return {
		communes,
		districts,
		loadingCommunes,
		loadingDistricts,
		loadingPermanentCommunes,
		loadingPermanentDistricts,
		loadingPermanentVillages,
		loadingProvinces,
		loadingVillages,
		locationError,
		permanentCommunes,
		permanentDistricts,
		permanentVillages,
		provinces,
		villages,
	};
};
