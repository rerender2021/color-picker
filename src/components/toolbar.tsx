import React, { useCallback, useRef } from "react";
import { getAppContext, Toolbar, IToolbarStyle, IToolbarComponentProps, IToolbarMenu } from "ave-react";
import { Vec4, CultureId, ToolBarItemType, ThemePredefined_Dark, ToolBarItem, IconSource, ToolBarItemFlag } from "ave-ui";

enum LanguageMenuItem {
	English = 1,
	Chinese,
}

enum ToolbarItemId {
	Language = 1,
	Theme,
}

const toolbarItems: IToolbarComponentProps["items"] = [
	{
		type: ToolBarItemType.ButtonDrop,
		icon: "language",
		items: [
			{
				id: LanguageMenuItem.English,
				name: "English (United States)",
			},
			{
				id: LanguageMenuItem.Chinese,
				name: "中文(中国)",
			},
		],
		defaultRadioId: LanguageMenuItem.English as const,
		onClick(this: IToolbarMenu, sender, id: LanguageMenuItem) {
			sender.SetRadioId(id);
			const itemInfo = this.items.find((each) => each.id === id);

			const context = getAppContext();
			const i18n = context.getI18n();
			if (itemInfo.id === LanguageMenuItem.Chinese) {
				i18n.switch(CultureId.zh_cn);
			} else if (itemInfo.id === LanguageMenuItem.English) {
				i18n.switch(CultureId.en_us);
			}
		},
	},
	{
		type: ToolBarItemType.Button,
		id: ToolbarItemId.Theme,
		icon: "theme-light",
	},
];

const toolbarStyle: IToolbarStyle = {
	textColor: new Vec4(255, 255, 255, 255 * 0.8),
};

export function AppToolbar() {
	const refIsDark = useRef(false);

	const onToolbarClick = useCallback<IToolbarComponentProps["onClick"]>((sender, id) => {
		if (id === ToolbarItemId.Theme) {
			refIsDark.current = !refIsDark.current;
			const context = getAppContext();
			const themeImage = context.getThemeImage();
			const window = context.getWindow();
			const resMap = context.getIconResourceMap();
			const theme = new ToolBarItem(ToolbarItemId.Theme, ToolBarItemType.Button);

			if (refIsDark.current) {
				const themeDark = new ThemePredefined_Dark();
				themeDark.SetStyle(themeImage, 0);

				theme.Flag = ToolBarItemFlag.Icon;
				theme.Icon = window.CacheIcon(new IconSource(resMap["theme-dark"], 16));
				sender.ToolSetById(ToolbarItemId.Theme, theme);
			} else {
				themeImage.ResetTheme();
				theme.Flag = ToolBarItemFlag.Icon;
				theme.Icon = window.CacheIcon(new IconSource(resMap["theme-light"], 16));
				sender.ToolSetById(ToolbarItemId.Theme, theme);
			}
		}
	}, []);

	return <Toolbar position="right" items={toolbarItems} style={toolbarStyle} onClick={onToolbarClick} />;
}
