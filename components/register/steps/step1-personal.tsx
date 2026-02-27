import { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
	Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import { useBirthPlace, type PumiItem } from "@/hooks/useAddresses";
import FormField from "../form-field";
import StepButtons from "../step-buttons";
import type { FormData } from "../types";

type Props = {
	form: FormData;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSelect: (field: keyof FormData, value: string) => void;
	onDateChange: (field: keyof FormData, date: Date | undefined) => void;
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

const Step1Personal = ({ form, onChange, onSelect, onDateChange, onNext, step, onBack }: Props) => {
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
	} = useBirthPlace(form);

	const provinceLabel = useMemo(
		() => toLabel(provinces.find((item) => String(item.id) === form.birth_province_id) ?? { id: "" }),
		[form.birth_province_id, provinces],
	);
	const districtLabel = useMemo(
		() => toLabel(districts.find((item) => String(item.id) === form.birth_district_id) ?? { id: "" }),
		[districts, form.birth_district_id],
	);
	const communeLabel = useMemo(
		() => toLabel(communes.find((item) => String(item.id) === form.birth_commune_id) ?? { id: "" }),
		[communes, form.birth_commune_id],
	);
	const villageLabel = useMemo(
		() => toLabel(villages.find((item) => String(item.id) === form.birth_village_id) ?? { id: "" }),
		[form.birth_village_id, villages],
	);

	const placeOfBirth = useMemo(() => {
		if (!form.birth_village_id) return "";
		return [villageLabel, communeLabel, districtLabel, provinceLabel].filter(Boolean).join(", ");
	}, [communeLabel, districtLabel, form.birth_village_id, provinceLabel, villageLabel]);

	useEffect(() => {
		if (form.place_of_birth !== placeOfBirth) {
			onSelect("place_of_birth", placeOfBirth);
		}
	}, [form.place_of_birth, onSelect, placeOfBirth]);

	return (
		<form onSubmit={onNext} className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-3">
				<FormField label="First Name" required>
					<Input name="first_name" value={form.first_name} onChange={onChange} placeholder="e.g. Sokna" className="bg-white" required />
				</FormField>
				<FormField label="Last Name" required>
					<Input name="last_name" value={form.last_name} onChange={onChange} placeholder="e.g. Chun" className="bg-white" required />
				</FormField>
			</div>
			<FormField label="Khmer Name" required>
				<Input name="khmer_name" value={form.khmer_name} onChange={onChange} placeholder="ចុន សោក័នា" className="bg-white" required />
			</FormField>
			<FormField label="Date of Birth" required>
				<DatePicker
					value={form.date_of_birth ?? undefined}
					onChange={(date) => onDateChange("date_of_birth", date)}
					placeholder="Select date"
					captionLayout="dropdown"
					fromYear={1950}
					toYear={new Date().getFullYear()}
				/>
			</FormField>
			<FormField label="Place of Birth" required>
				<div className="flex flex-col gap-3">
					<div className="grid grid-cols-2 gap-3">
						<Select
							required
							value={form.birth_province_id}
							disabled={loadingProvinces}
							onValueChange={(value) => onSelect("birth_province_id", value)}
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
									<SelectItem key={`birth-province-${item.id}`} value={String(item.id)}>
										{toLabel(item)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select
							required
							value={form.birth_district_id}
							disabled={!form.birth_province_id || loadingDistricts}
							onValueChange={(value) => onSelect("birth_district_id", value)}
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
									<SelectItem key={`birth-district-${item.id}`} value={String(item.id)}>
										{toLabel(item)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<Select
							required
							value={form.birth_commune_id}
							disabled={!form.birth_district_id || loadingCommunes}
							onValueChange={(value) => onSelect("birth_commune_id", value)}
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
									<SelectItem key={`birth-commune-${item.id}`} value={String(item.id)}>
										{toLabel(item)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select
							required
							value={form.birth_village_id}
							disabled={!form.birth_commune_id || loadingVillages}
							onValueChange={(value) => onSelect("birth_village_id", value)}
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
									<SelectItem key={`birth-village-${item.id}`} value={String(item.id)}>
										{toLabel(item)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<Input
						name="place_of_birth"
						value={form.place_of_birth}
						placeholder="Auto-filled from selected birthplace"
						className="bg-gray-100"
						readOnly
						required
					/>
				</div>
			</FormField>
			<div className="grid grid-cols-2 gap-3">
				<FormField label="Gender" required>
					<Select required value={form.gender} onValueChange={(v) => onSelect("gender", v)}>
						<SelectTrigger className="bg-white h-9 w-full"><SelectValue placeholder="Select..." /></SelectTrigger>
						<SelectContent>
							<SelectItem value="male">Male</SelectItem>
							<SelectItem value="female">Female</SelectItem>
							<SelectItem value="other">Other</SelectItem>
						</SelectContent>
					</Select>
				</FormField>
				<FormField label="Student Type" required>
					<Select required value={form.student_type} onValueChange={(v) => onSelect("student_type", v)}>
						<SelectTrigger className="bg-white h-9 w-full"><SelectValue placeholder="Select..." /></SelectTrigger>
						<SelectContent>
							<SelectItem value="new">New Student</SelectItem>
							<SelectItem value="transfer">Transfer</SelectItem>
						</SelectContent>
					</Select>
				</FormField>
			</div>
			<FormField label="Nationality" required>
				<Input name="nationality" value={form.nationality} onChange={onChange} placeholder="e.g. Cambodian" className="bg-white" required />
			</FormField>
			<div className="grid grid-cols-2 gap-3">
				<FormField label="Phone" required>
					<Input type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+855 12 345 678" className="bg-white" required />
				</FormField>
				<FormField label="Email">
					<Input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" className="bg-white" />
				</FormField>
			</div>

			{locationError && <p className="text-xs text-red-500">{locationError}</p>}

			<StepButtons step={step} onBack={onBack} />
		</form>
	);
};

export default Step1Personal;
