"use client";

import { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useAddresses, type PumiItem } from "@/hooks/useAddresses";
import FormField from "../form-field";
import StepButtons from "../step-buttons";
import type { FormData } from "../types";

type Props = {
	form: FormData;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onSelect: (field: keyof FormData, value: string) => void;
	onNext: (e: React.FormEvent) => void;
	step: number;
	onBack: () => void;
};

const toLabel = (item: PumiItem) => item.name_en ?? item.name_km ?? String(item.id);
const SELECT_CONTENT_STYLE = { maxHeight: "18rem" } as const;
const ADDRESS_SELECT_CONTENT_PROPS = {
	position: "popper" as const,
	side: "bottom" as const,
	align: "start" as const,
	sideOffset: 4,
};

const Step2Address = ({ form, onChange, onSelect, onNext, step, onBack }: Props) => {
	const {
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
	} = useAddresses(form);

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
						<SelectContent
							{...ADDRESS_SELECT_CONTENT_PROPS}
							className="overflow-y-auto overflow-x-hidden"
							style={SELECT_CONTENT_STYLE}
						>
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
						<SelectContent
							{...ADDRESS_SELECT_CONTENT_PROPS}
							className="overflow-y-auto overflow-x-hidden"
							style={SELECT_CONTENT_STYLE}
						>
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
						<SelectContent
							{...ADDRESS_SELECT_CONTENT_PROPS}
							className="overflow-y-auto overflow-x-hidden"
							style={SELECT_CONTENT_STYLE}
						>
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
						<SelectContent
							{...ADDRESS_SELECT_CONTENT_PROPS}
							className="overflow-y-auto overflow-x-hidden"
							style={SELECT_CONTENT_STYLE}
						>
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
						<SelectContent
							{...ADDRESS_SELECT_CONTENT_PROPS}
							className="overflow-y-auto overflow-x-hidden"
							style={SELECT_CONTENT_STYLE}
						>
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
						<SelectContent
							{...ADDRESS_SELECT_CONTENT_PROPS}
							className="overflow-y-auto overflow-x-hidden"
							style={SELECT_CONTENT_STYLE}
						>
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
						<SelectContent
							{...ADDRESS_SELECT_CONTENT_PROPS}
							className="overflow-y-auto overflow-x-hidden"
							style={SELECT_CONTENT_STYLE}
						>
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
						<SelectContent
							{...ADDRESS_SELECT_CONTENT_PROPS}
							className="overflow-y-auto overflow-x-hidden"
							style={SELECT_CONTENT_STYLE}
						>
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
						<SelectContent className="overflow-y-auto overflow-x-hidden" style={SELECT_CONTENT_STYLE}>
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
