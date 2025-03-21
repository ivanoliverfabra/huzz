"use client";

import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const valorantRanks = [
	"Iron",
	"Bronze",
	"Silver",
	"Gold",
	"Platinum",
	"Diamond",
	"Ascendant",
	"Immortal",
	"Radiant",
];
const valorantRankTiers = [3, 3, 3, 3, 3, 3, 3, 3, 1];

export function ValorantRankSelect({
	value,
	onChange,
}: { value: string; onChange: (value: string) => void }) {
	return (
		<div className="space-y-1">
			<Label htmlFor="rank">Rank</Label>
			<Select name="rank" onValueChange={onChange} value={value}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="..." />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Unranked">Unranked</SelectItem>
					<SelectSeparator />
					{valorantRanks.map((rank, idx) => (
						<SelectGroup key={`group.${rank}`}>
							{valorantRankTiers[valorantRanks.indexOf(rank)] > 1 ? (
								Array(valorantRankTiers[valorantRanks.indexOf(rank)])
									.fill(0)
									.map((_, i) => (
										<SelectItem
											key={`item.${rank}.${i}`}
											value={`${rank} ${i + 1}`}
										>
											{rank} {i + 1}
										</SelectItem>
									))
							) : (
								<SelectItem key={`item.${rank}.${0}`} value={rank}>
									{rank}
								</SelectItem>
							)}
							{idx !== valorantRanks.length - 1 && <SelectSeparator />}
						</SelectGroup>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
