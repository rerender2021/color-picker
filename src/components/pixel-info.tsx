import React from "react";
import { IGridArea, TextBox } from "ave-react";
import { getI18nText } from "../i18n";
import { getColorHex, getColorRgba } from "../common";
import { Vec4, Vec2 } from "ave-ui";

export interface IPixelInfo {
	areas: Record<"pixelPos" | "pixelHex" | "pixelRgba", IGridArea>;
	color: Vec4;
	pos: Vec2;
}

export function PixelInfo(props: IPixelInfo) {
	const { pixelPos, pixelHex, pixelRgba } = props.areas;
	const { color, pos } = props;

	const txtPos = getI18nText("Position", { x: pos.x, y: pos.y });
	const txtHex = getColorRgba(color);
	const txtRgba = `hex: ${getColorHex(color)}`;

	return (
		<>
			<TextBox text={txtPos} readonly border={false} style={{ area: pixelPos, margin: "4dpx 0 0 0" }}></TextBox>
			<TextBox text={txtHex} readonly border={false} style={{ area: pixelHex, margin: "4dpx 0 0 0" }}></TextBox>
			<TextBox text={txtRgba} readonly border={false} style={{ area: pixelRgba, margin: "4dpx 0 0 0" }}></TextBox>
		</>
	);
}
