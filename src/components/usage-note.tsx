import { IGridArea, Label } from "ave-react";
import React from "react";

export interface IUsageNote {
	areas: Record<"usageMove" | "usageLockColor" | "usageOpenFile" | "usagePaste" | "usageDrop", IGridArea>;
}

export function UsageNote(props: IUsageNote) {
	const { usageMove, usageLockColor, usageOpenFile, usagePaste, usageDrop } = props.areas;
	return (
		<>
			<Label langKey="UsageMoveByPixel" style={{ area: usageMove, margin: "4dpx 0 0 0" }}></Label>
			<Label langKey="UsageLockColor" style={{ area: usageLockColor, margin: "4dpx 0 0 0" }}></Label>
			<Label langKey="UsageOpenFile" style={{ area: usageOpenFile, margin: "4dpx 0 0 0" }}></Label>
			<Label langKey="UsagePaste" style={{ area: usagePaste, margin: "4dpx 0 0 0" }}></Label>
			<Label langKey="UsageDrop" style={{ area: usageDrop, margin: "4dpx 0 0 0" }}></Label>
		</>
	);
}
