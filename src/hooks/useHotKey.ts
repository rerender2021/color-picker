import { getAppContext } from "ave-react";
import { KbKey, Vec2 } from "ave-ui";
import { useEffect } from "react";

export interface IHotKeyMap {
	w?: (v: Vec2) => void;
	a?: (v: Vec2) => void;
	s?: (v: Vec2) => void;
	d?: (v: Vec2) => void;
	space?: Function;
	open?: Function;
	paste?: Function;
}

export function useHotKey(map: IHotKeyMap) {
	useEffect(() => {
		const context = getAppContext();
		const window = context.getWindow();
		const hkW = window.HotkeyRegister(KbKey.W, 0);
		const hkS = window.HotkeyRegister(KbKey.S, 0);
		const hkA = window.HotkeyRegister(KbKey.A, 0);
		const hkD = window.HotkeyRegister(KbKey.D, 0);
		const hkSpace = window.HotkeyRegister(KbKey.Space, 0);
		const hkOpen = window.HotkeyRegister(KbKey.F, 0);
		const hkPaste = window.HotkeyRegister(KbKey.V, 0);

		window.OnWindowHotkey((sender, nId, key, n) => {
			const v = window.GetPlatform().PointerGetPosition();
			switch (nId) {
				case hkW:
					--v.y;
					map?.w(v);
					break;
				case hkS:
					++v.y;
					map?.s(v);
					break;
				case hkA:
					--v.x;
					map?.a(v);
					break;
				case hkD:
					++v.x;
					map?.d(v);
					break;
				case hkSpace:
					map?.space();
					break;
				case hkOpen:
					map?.open();
					break;
				case hkPaste:
					map?.paste();
					break;
			}
		});
	}, []);

	return;
}
