import { App, CultureId } from "ave-ui";
import { getAppContext, Ii18n, ILangBase } from "ave-react";

export interface ILang extends ILangBase {
	// ave built-in language key
	AppTitle: string;
	CoOk: string;
	__FontStd: string;

	// user defined key
	OpenFile: string;
	Paste: string;
	Position: string;
	UsageMoveByPixel: string;
	UsageLockColor: string;
	UsageOpenFile: string;
	UsagePaste: string;
	UsageDrop: string;
}

export function onInitI18n(app: App) {
	const i18n: Ii18n<ILang> = {
		t(key, toReplace: object = {}) {
			let result = app.LangGetString(key);
			Object.keys(toReplace).forEach((each) => {
				result = result.replace(`{{${each}}}`, toReplace[each]);
			});
			return result;
		},
		switch(this: Ii18n, id) {
			app.LangSetDefaultString(id, this.lang[id]);
			app.LangSetCurrent(id);
		},
		lang: {
			[CultureId.en_us]: {
				AppTitle: "Color Picker",
				CoOk: "OK",
				__FontStd: "Segoe UI",
				OpenFile: "Open File",
				Paste: "Paste",
				Position: "position: {{x}}, {{y}}",
				UsageMoveByPixel: "WSAD: Move by pixel",
				UsageLockColor: "Space/Click: Lock result",
				UsageOpenFile: "F: Open File",
				UsagePaste: "V: Paste",
				UsageDrop: "Drop an image to open",
			},
			[CultureId.zh_cn]: {
				AppTitle: "颜色选择器",
				CoOk: "好的",
				__FontStd: "Microsoft YaHei UI",
				OpenFile: "选择图片",
				Paste: "粘贴",
				Position: "位置: {{x}}, {{y}}",
				UsageMoveByPixel: "WSAD: 一次移动一像素",
				UsageLockColor: "Space/Click: 锁定取色结果",
				UsageOpenFile: "F: 选择图片",
				UsagePaste: "V: 粘贴",
				UsageDrop: "支持拖拽扔进来一张图片",
			},
		},
	};

	const context = getAppContext();
	context.setI18n(i18n);
	return i18n;
}

export function getI18nText(key: keyof ILang, toReplace: object = {}) {
	const context = getAppContext();
	const i18n = context.getI18n() as Ii18n<ILang>;
	if (i18n) {
		const txt = i18n.t(key, toReplace);
		return txt;
	} else {
		return "";
	}
}