"use client";

import { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useAddresses, type PumiItem } from "@/hooks/useAddresses";
import { useRegisterFormState } from "../context/register-form-context";
import FormField from "../form-field";
import StepButtons from "../step-buttons";

type Props = {
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

const Step2Address = ({ onNext, step, onBack }: Props) => {
	const { form, onChange, onSelect } = useRegisterFormState();
	const {
		communes,
		districts,
		loadingCommunes,
		loadingDistricts,
		loadingProvinces,
		loadingVillages,
		locationError,
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
	const currentAddress = useMemo(() => {
		if (!form.current_village_id) return "";
		return [villageLabel, communeLabel, districtLabel, provinceLabel].filter(Boolean).join(", ");
	}, [communeLabel, districtLabel, form.current_village_id, provinceLabel, villageLabel]);

	useEffect(() => {
		if (!form.current_province_id && provinces[0]) {
			onSelect("current_province_id", String(provinces[0].id));
		}
	}, [form.current_province_id, onSelect, provinces]);

	useEffect(() => {
		if (form.current_province_id && !form.current_district_id && districts[0]) {
			onSelect("current_district_id", String(districts[0].id));
		}
	}, [districts, form.current_district_id, form.current_province_id, onSelect]);

	useEffect(() => {
		if (form.current_district_id && !form.current_commune_id && communes[0]) {
			onSelect("current_commune_id", String(communes[0].id));
		}
	}, [communes, form.current_commune_id, form.current_district_id, onSelect]);

	useEffect(() => {
		if (form.current_commune_id && !form.current_village_id && villages[0]) {
			onSelect("current_village_id", String(villages[0].id));
		}
	}, [form.current_commune_id, form.current_village_id, onSelect, villages]);

	useEffect(() => {
		if (form.current_address !== currentAddress) {
			onSelect("current_address", currentAddress);
		}
	}, [currentAddress, form.current_address, onSelect]);

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
