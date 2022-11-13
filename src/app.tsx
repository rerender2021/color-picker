import React, { useCallback, useRef, useState } from "react";
import { AveRenderer, Window, Grid, Button, ColorView, getAppContext, IIconResource, IButtonComponentProps } from "ave-react";
import { Pager as NativePager, Byo2Image, Vec2, ImageData, App, CultureId, SysDialogFilter, AveImage, Rect, Picture as NativePicture, PointerButton } from "ave-ui";
import { MiniView, ZoomView, AppToolbar, ImageView, IImageView, UsageNote, PixelInfo } from "./components";
import { onInitI18n } from "./i18n";
import { iconResource } from "./resource";
import { containerLayout, pixelLayout } from "./layout";
import { assetsPath, getClipboardContent, readPixel } from "./common";
import { useCurrentLang, useDragDrop, useHotKey } from "./hooks";

function onInit(app: App) {
	const i18n = onInitI18n(app);
	i18n.switch(CultureId.en_us);

	const context = getAppContext();
	context.setIconResource(iconResource as unknown as IIconResource);
}

export function ColorPicker() {
	//
	const [src, setSrc] = useState<string | AveImage>(assetsPath("wallpaper.png"));
	useDragDrop((path) => setSrc(path));

	//
	const [imageInfo, setImageInfo] = useState<{ byo2: Byo2Image; data: ImageData }>();
	const refPicture = useRef<NativePicture>();
	const onLoadImage = useCallback<IImageView["onLoadImage"]>((byo2, data, picture) => {
		setImageInfo({ byo2, data });
		refPicture.current = picture;
	}, []);

	//
	const [pager, setPager] = useState<NativePager>();
	const onPageInit = useCallback<IImageView["onPageInit"]>((pager) => setPager(pager), []);

	//
	const refLockColor = useRef(false);
	const refIsMoving = useRef(false);
	const refIsMoved = useRef(false);
	const refPressPointerPos = useRef(Vec2.Zero);
	const refPressScrollPos = useRef(Vec2.Zero);

	const onPointerEnter = useCallback<IImageView["onPointerEnter"]>((sender, mp) => (refLockColor.current = false), []);
	const onPointerPress = useCallback<IImageView["onPointerPress"]>(
		(sender, mp) => {
			if (mp.Button == PointerButton.First) {
				refIsMoving.current = true;
				refIsMoved.current = false;

				const context = getAppContext();
				const window = context.getWindow();
				refPressPointerPos.current = window.GetPlatform().PointerGetPosition();
				refPressScrollPos.current = pager.GetScrollPosition();
			}
		},
		[pager]
	);
	const onPointerRelease = useCallback<IImageView["onPointerRelease"]>((sender, mp) => {
		if (mp.Button == PointerButton.First) {
			refIsMoving.current = false;
			if (!refIsMoved.current) {
				refLockColor.current = !refLockColor.current;
			}
		}
	}, []);

	const [pixelPos, setPixelPos] = useState<Vec2>(new Vec2(-1, -1));
	const movePointer = useCallback((v: Vec2) => setPixelPos(v), []);
	const onPointerMove = useCallback<IImageView["onPointerMove"]>(
		(sender, mp) => {
			if (refIsMoving.current) {
				refIsMoved.current = true;
				const context = getAppContext();
				const window = context.getWindow();
				const vPos = window.GetPlatform().PointerGetPosition();
				pager.SetScrollPosition(refPressScrollPos.current.Add(vPos.Sub(refPressPointerPos.current)), false);
				window.Update();
			} else if (!refLockColor.current) {
				movePointer(mp.Position);
			}
		},
		[pager]
	);

	// trigger: when current lang changes, rerender to update i18n text
	useCurrentLang();

	//
	const pixelColor = readPixel(imageInfo?.data, pixelPos);

	//
	const onOpenFile = useCallback<IButtonComponentProps["onClick"]>(async () => {
		const context = getAppContext();
		const window = context.getWindow();

		const filePath = await window.GetCommonUi().OpenFile([new SysDialogFilter("Image Files", "*.png;*.jpg;*.jpeg")], "png", "", "");
		if (filePath) {
			setSrc(filePath);
		}
	}, []);

	const onPaste = useCallback<IButtonComponentProps["onClick"]>(() => {
		const content = getClipboardContent();
		if (content) {
			setSrc(content);
		}
	}, []);

	const moveCursor = useCallback((v: Vec2) => {
		const context = getAppContext();
		const window = context.getWindow();
		window.GetPlatform().PointerSetPosition(v);

		const rc = refPicture?.current.MapRect(Rect.Empty, false);
		if (rc) {
			movePointer(new Vec2(v.x, v.y).Sub(rc.Position));
		}
	}, []);

	useHotKey({
		w: moveCursor,
		a: moveCursor,
		s: moveCursor,
		d: moveCursor,
		space: () => (refLockColor.current = !refLockColor.current),
		open: onOpenFile,
		paste: onPaste,
	});

	return (
		<Window title="Color Picker" onInit={onInit}>
			<AppToolbar />
			<Grid style={{ layout: containerLayout }}>
				<ImageView src={src} onPageInit={onPageInit} onLoadImage={onLoadImage} onPointerMove={onPointerMove} onPointerEnter={onPointerEnter} onPointerPress={onPointerPress} onPointerRelease={onPointerRelease} />
				<Grid style={{ area: containerLayout.areas.pixel, layout: pixelLayout }}>
					<Grid style={{ area: pixelLayout.areas.miniView }}>
						<MiniView image={imageInfo?.byo2} pager={pager} />
					</Grid>
					<Grid style={{ area: pixelLayout.areas.zoomView }}>
						<ZoomView image={imageInfo?.byo2} pixelPos={pixelPos} />
					</Grid>
					<ColorView solidColor={pixelColor} style={{ area: pixelLayout.areas.colorView }}></ColorView>
					<PixelInfo areas={{ ...pixelLayout.areas }} pos={pixelPos} color={pixelColor}></PixelInfo>
					<Button text="Open File" langKey="OpenFile" style={{ area: pixelLayout.areas.openFile }} iconInfo={{ name: "open-file" }} onClick={onOpenFile}></Button>
					<Button text="Paste" langKey="Paste" style={{ area: pixelLayout.areas.paste }} onClick={onPaste}></Button>
					<UsageNote areas={{ ...pixelLayout.areas }}></UsageNote>
				</Grid>
			</Grid>
		</Window>
	);
}

AveRenderer.render(<ColorPicker />);
