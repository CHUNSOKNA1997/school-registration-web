"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import FormField from "../form-field";
import StepButtons from "../step-buttons";
import type { FormData } from "../types";

type PumiItem = {
	id: number | string;
	name_en?: string;
	name_km?: string;
};

const PUMI_BASE_URL = "/api/pumi";

const toLabel = (item: PumiItem) => item.name_en ?? item.name_km ?? String(item.id);

const readPumiItems = (payload: unknown): PumiItem[] => {
	if (Array.isArray(payload)) return payload as PumiItem[];
	if (
		payload &&
		typeof payload === "object" &&
		"data" in payload &&
		Array.isArray((payload as { data: unknown }).data)
	) {
		return (payload as { data: PumiItem[] }).data;
	}
	return [];
};

const fetchPumi = async (path: string): Promise<PumiItem[]> => {
	const response = await fetch(`${PUMI_BASE_URL}${path}`);
	if (!response.ok) throw new Error(`Pumi request failed: ${response.status}`);
	return readPumiItems(await response.json());
};

type Props = {
	form: FormData;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onSelect: (field: keyof FormData, value: string) => void;
	onNext: (e: React.FormEvent) => void;
	step: number;
	onBack: () => void;
};

const Step2Address = ({ form, onChange, onSelect, onNext, step, onBack }: Props) => {
	const [provinces, setProvinces] = useState<PumiItem[]>([]);
	const [districts, setDistricts] = useState<PumiItem[]>([]);
	const [communes, setCommunes] = useState<PumiItem[]>([]);
	const [villages, setVillages] = useState<PumiItem[]>([]);
	const [permanentDistricts, setPermanentDistricts] = useState<PumiItem[]>([]);
	const [permanentCommunes, setPermanentCommunes] = useState<PumiItem[]>([]);
	const [permanentVillages, setPermanentVillages] = useState<PumiItem[]>([]);

	const [loadingProvinces, setLoadingProvinces] = useState(false);
	const [loadingDistricts, setLoadingDistricts] = useState(false);
	const [loadingCommunes, setLoadingCommunes] = useState(false);
	const [loadingVillages, setLoadingVillages] = useState(false);
	const [loadingPermanentDistricts, setLoadingPermanentDistricts] = useState(false);
	const [loadingPermanentCommunes, setLoadingPermanentCommunes] = useState(false);
	const [loadingPermanentVillages, setLoadingPermanentVillages] = useState(false);
	const [locationError, setLocationError] = useState<string | null>(null);

	useEffect(() => {
		let active = true;
		queueMicrotask(() => {
			setLoadingProvinces(true);
			setLocationError(null);
		});

		fetchPumi("/provinces")
			.then((data) => {
				if (!active) return;
				setProvinces(data);
			})
			.catch(() => {
				if (!active) return;
				setLocationError("Unable to load provinces from Pumi.");
				setProvinces([]);
			})
			.finally(() => {
				if (active) setLoadingProvinces(false);
			});

		return () => {
			active = false;
		};
	}, []);

	useEffect(() => {
		if (!form.current_province_id) {
			queueMicrotask(() => {
				setDistricts([]);
				setLoadingDistricts(false);
			});
			return;
		}

		let active = true;
		queueMicrotask(() => {
			setLoadingDistricts(true);
			setLocationError(null);
		});

		fetchPumi(`/districts?province_id=${encodeURIComponent(form.current_province_id)}`)
			.then((data) => {
				if (!active) return;
				setDistricts(data);
			})
			.catch(() => {
				if (!active) return;
				setLocationError("Unable to load districts from Pumi.");
				setDistricts([]);
			})
			.finally(() => {
				if (active) setLoadingDistricts(false);
			});

		return () => {
			active = false;
		};
	}, [form.current_province_id]);

	useEffect(() => {
		if (!form.current_district_id) {
			queueMicrotask(() => {
				setCommunes([]);
				setLoadingCommunes(false);
			});
			return;
		}

		let active = true;
		queueMicrotask(() => {
			setLoadingCommunes(true);
			setLocationError(null);
		});

		fetchPumi(`/communes?district_id=${encodeURIComponent(form.current_district_id)}`)
			.then((data) => {
				if (!active) return;
				setCommunes(data);
			})
			.catch(() => {
				if (!active) return;
				setLocationError("Unable to load communes from Pumi.");
				setCommunes([]);
			})
			.finally(() => {
				if (active) setLoadingCommunes(false);
			});

		return () => {
			active = false;
		};
	}, [form.current_district_id]);

	useEffect(() => {
		if (!form.current_commune_id) {
			queueMicrotask(() => {
				setVillages([]);
				setLoadingVillages(false);
			});
			return;
		}

		let active = true;
		queueMicrotask(() => {
			setLoadingVillages(true);
			setLocationError(null);
		});

		fetchPumi(`/villages?commune_id=${encodeURIComponent(form.current_commune_id)}`)
			.then((data) => {
				if (!active) return;
				setVillages(data);
			})
			.catch(() => {
				if (!active) return;
				setLocationError("Unable to load villages from Pumi.");
				setVillages([]);
			})
			.finally(() => {
				if (active) setLoadingVillages(false);
			});

		return () => {
			active = false;
		};
	}, [form.current_commune_id]);

	useEffect(() => {
		if (!form.permanent_province_id) {
			queueMicrotask(() => {
				setPermanentDistricts([]);
				setLoadingPermanentDistricts(false);
			});
			return;
		}

		let active = true;
		queueMicrotask(() => {
			setLoadingPermanentDistricts(true);
			setLocationError(null);
		});

		fetchPumi(`/districts?province_id=${encodeURIComponent(form.permanent_province_id)}`)
			.then((data) => {
				if (!active) return;
				setPermanentDistricts(data);
			})
			.catch(() => {
				if (!active) return;
				setLocationError("Unable to load permanent districts from Pumi.");
				setPermanentDistricts([]);
			})
			.finally(() => {
				if (active) setLoadingPermanentDistricts(false);
			});

		return () => {
			active = false;
		};
	}, [form.permanent_province_id]);

	useEffect(() => {
		if (!form.permanent_district_id) {
			queueMicrotask(() => {
				setPermanentCommunes([]);
				setLoadingPermanentCommunes(false);
			});
			return;
		}

		let active = true;
		queueMicrotask(() => {
			setLoadingPermanentCommunes(true);
			setLocationError(null);
		});

		fetchPumi(`/communes?district_id=${encodeURIComponent(form.permanent_district_id)}`)
			.then((data) => {
				if (!active) return;
				setPermanentCommunes(data);
			})
			.catch(() => {
				if (!active) return;
				setLocationError("Unable to load permanent communes from Pumi.");
				setPermanentCommunes([]);
			})
			.finally(() => {
				if (active) setLoadingPermanentCommunes(false);
			});

		return () => {
			active = false;
		};
	}, [form.permanent_district_id]);

	useEffect(() => {
		if (!form.permanent_commune_id) {
			queueMicrotask(() => {
				setPermanentVillages([]);
				setLoadingPermanentVillages(false);
			});
			return;
		}

		let active = true;
		queueMicrotask(() => {
			setLoadingPermanentVillages(true);
			setLocationError(null);
		});

		fetchPumi(`/villages?commune_id=${encodeURIComponent(form.permanent_commune_id)}`)
			.then((data) => {
				if (!active) return;
				setPermanentVillages(data);
			})
			.catch(() => {
				if (!active) return;
				setLocationError("Unable to load permanent villages from Pumi.");
				setPermanentVillages([]);
			})
			.finally(() => {
				if (active) setLoadingPermanentVillages(false);
			});

		return () => {
			active = false;
		};
	}, [form.permanent_commune_id]);

	const provinceLabel = useMemo(
		() => toLabel(provinces.find((item) => String(item.id) === form.current_province_id) ?? { id: "" }),
		[form.current_province_id, provinces],
	);
	const districtLabel = useMemo(
		() => toLabel(districts.find((item) => String(item.id) === form.current_district_id) ?? { id: "" }),
		[districts, form.current_district_id],
	);
	const communeLabel = useMemo(
		() => toLabel(communes.find((item) => String(item.id) === form.current_commune_id) ?? { id: "" }),
		[communes, form.current_commune_id],
	);
	const villageLabel = useMemo(
		() => toLabel(villages.find((item) => String(item.id) === form.current_village_id) ?? { id: "" }),
		[form.current_village_id, villages],
	);
	const permanentProvinceLabel = useMemo(
		() => toLabel(provinces.find((item) => String(item.id) === form.permanent_province_id) ?? { id: "" }),
		[form.permanent_province_id, provinces],
	);
	const permanentDistrictLabel = useMemo(
		() => toLabel(permanentDistricts.find((item) => String(item.id) === form.permanent_district_id) ?? { id: "" }),
		[form.permanent_district_id, permanentDistricts],
	);
	const permanentCommuneLabel = useMemo(
		() => toLabel(permanentCommunes.find((item) => String(item.id) === form.permanent_commune_id) ?? { id: "" }),
		[form.permanent_commune_id, permanentCommunes],
	);
	const permanentVillageLabel = useMemo(
		() => toLabel(permanentVillages.find((item) => String(item.id) === form.permanent_village_id) ?? { id: "" }),
		[form.permanent_village_id, permanentVillages],
	);

	const currentAddress = useMemo(() => {
		if (!form.current_village_id) return "";
		return [villageLabel, communeLabel, districtLabel, provinceLabel].filter(Boolean).join(", ");
	}, [communeLabel, districtLabel, form.current_village_id, provinceLabel, villageLabel]);
	const permanentAddress = useMemo(() => {
		if (!form.permanent_village_id) return "";
		return [permanentVillageLabel, permanentCommuneLabel, permanentDistrictLabel, permanentProvinceLabel].filter(Boolean).join(", ");
	}, [
		form.permanent_village_id,
		permanentCommuneLabel,
		permanentDistrictLabel,
		permanentProvinceLabel,
		permanentVillageLabel,
	]);

	useEffect(() => {
		if (form.current_address !== currentAddress) {
			onSelect("current_address", currentAddress);
		}
	}, [currentAddress, form.current_address, onSelect]);
	useEffect(() => {
		if (form.permanent_address !== permanentAddress) {
			onSelect("permanent_address", permanentAddress);
		}
	}, [form.permanent_address, onSelect, permanentAddress]);

	return (
		<form onSubmit={onNext} className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-3">
				<FormField label="Province" required>
					<Select
						required
						value={form.current_province_id}
						disabled={loadingProvinces}
						onValueChange={(value) => onSelect("current_province_id", value)}
					>
						<SelectTrigger className="bg-white h-9 w-full">
							<SelectValue placeholder={loadingProvinces ? "Loading..." : "Select province..."} />
						</SelectTrigger>
						<SelectContent>
							{provinces.map((item) => (
								<SelectItem key={item.id} value={String(item.id)}>
									{toLabel(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormField>

				<FormField label="District" required>
					<Select
						required
						value={form.current_district_id}
						disabled={!form.current_province_id || loadingDistricts}
						onValueChange={(value) => onSelect("current_district_id", value)}
					>
						<SelectTrigger className="bg-white h-9 w-full">
							<SelectValue placeholder={loadingDistricts ? "Loading..." : "Select district..."} />
						</SelectTrigger>
						<SelectContent>
							{districts.map((item) => (
								<SelectItem key={item.id} value={String(item.id)}>
									{toLabel(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormField>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<FormField label="Commune" required>
					<Select
						required
						value={form.current_commune_id}
						disabled={!form.current_district_id || loadingCommunes}
						onValueChange={(value) => onSelect("current_commune_id", value)}
					>
						<SelectTrigger className="bg-white h-9 w-full">
							<SelectValue placeholder={loadingCommunes ? "Loading..." : "Select commune..."} />
						</SelectTrigger>
						<SelectContent>
							{communes.map((item) => (
								<SelectItem key={item.id} value={String(item.id)}>
									{toLabel(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormField>

				<FormField label="Village" required>
					<Select
						required
						value={form.current_village_id}
						disabled={!form.current_commune_id || loadingVillages}
						onValueChange={(value) => onSelect("current_village_id", value)}
					>
						<SelectTrigger className="bg-white h-9 w-full">
							<SelectValue placeholder={loadingVillages ? "Loading..." : "Select village..."} />
						</SelectTrigger>
						<SelectContent>
							{villages.map((item) => (
								<SelectItem key={item.id} value={String(item.id)}>
									{toLabel(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormField>
			</div>

			<FormField label="Current Address" required>
				<Input
					name="current_address"
					value={form.current_address}
					placeholder="Auto-filled from selected location"
					className="bg-gray-100"
					readOnly
					required
				/>
			</FormField>

			<div className="grid grid-cols-2 gap-3">
				<FormField label="Permanent Province">
					<Select
						value={form.permanent_province_id}
						disabled={loadingProvinces}
						onValueChange={(value) => onSelect("permanent_province_id", value)}
					>
						<SelectTrigger className="bg-white h-9 w-full">
							<SelectValue placeholder={loadingProvinces ? "Loading..." : "Select province..."} />
						</SelectTrigger>
						<SelectContent>
							{provinces.map((item) => (
								<SelectItem key={`permanent-province-${item.id}`} value={String(item.id)}>
									{toLabel(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormField>

				<FormField label="Permanent District">
					<Select
						value={form.permanent_district_id}
						disabled={!form.permanent_province_id || loadingPermanentDistricts}
						onValueChange={(value) => onSelect("permanent_district_id", value)}
					>
						<SelectTrigger className="bg-white h-9 w-full">
							<SelectValue placeholder={loadingPermanentDistricts ? "Loading..." : "Select district..."} />
						</SelectTrigger>
						<SelectContent>
							{permanentDistricts.map((item) => (
								<SelectItem key={`permanent-district-${item.id}`} value={String(item.id)}>
									{toLabel(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormField>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<FormField label="Permanent Commune">
					<Select
						value={form.permanent_commune_id}
						disabled={!form.permanent_district_id || loadingPermanentCommunes}
						onValueChange={(value) => onSelect("permanent_commune_id", value)}
					>
						<SelectTrigger className="bg-white h-9 w-full">
							<SelectValue placeholder={loadingPermanentCommunes ? "Loading..." : "Select commune..."} />
						</SelectTrigger>
						<SelectContent>
							{permanentCommunes.map((item) => (
								<SelectItem key={`permanent-commune-${item.id}`} value={String(item.id)}>
									{toLabel(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormField>

				<FormField label="Permanent Village">
					<Select
						value={form.permanent_village_id}
						disabled={!form.permanent_commune_id || loadingPermanentVillages}
						onValueChange={(value) => onSelect("permanent_village_id", value)}
					>
						<SelectTrigger className="bg-white h-9 w-full">
							<SelectValue placeholder={loadingPermanentVillages ? "Loading..." : "Select village..."} />
						</SelectTrigger>
						<SelectContent>
							{permanentVillages.map((item) => (
								<SelectItem key={`permanent-village-${item.id}`} value={String(item.id)}>
									{toLabel(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</FormField>
			</div>

			<FormField label="Permanent Address">
				<Input
					name="permanent_address"
					value={form.permanent_address}
					placeholder="Auto-filled from selected permanent location"
					className="bg-gray-100"
					readOnly
				/>
			</FormField>

			<div className="grid grid-cols-2 gap-3">
				<FormField label="Emergency Contact" required>
					<Input
						name="emergency_contact"
						value={form.emergency_contact}
						onChange={onChange}
						placeholder="+855 12 000 000"
						className="bg-white"
						required
					/>
				</FormField>
				<FormField label="Relationship" required>
					<Select required value={form.emergency_contact_relationship} onValueChange={(value) => onSelect("emergency_contact_relationship", value)}>
						<SelectTrigger className="bg-white h-9 w-full"><SelectValue placeholder="Select..." /></SelectTrigger>
						<SelectContent>
							<SelectItem value="parent">Parent</SelectItem>
							<SelectItem value="sibling">Sibling</SelectItem>
							<SelectItem value="guardian">Guardian</SelectItem>
							<SelectItem value="relative">Relative</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>
				</FormField>
			</div>

			{locationError && <p className="text-xs text-red-500">{locationError}</p>}

			<StepButtons step={step} onBack={onBack} />
		</form>
	);
};

export default Step2Address;
