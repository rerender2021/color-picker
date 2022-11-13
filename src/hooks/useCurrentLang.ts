import { useEffect, useState } from "react";
import { getAppContext } from "ave-react";
import { CultureId, Window as NativeWindow } from "ave-ui";

export function useCurrentLang() {
	const [lang, setLang] = useState<CultureId>(CultureId.en_us);

	useEffect(() => {
		const context = getAppContext();
		const app = context.getAveApp();
		const window = context.getWindow();
		window.OnLanguageChange((sender: NativeWindow) => {
			setLang(app.LangGetCurrent());
		});
	}, []);

	return lang;
}
