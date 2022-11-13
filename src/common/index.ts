import path from "path";
import { Vec4, Vec2, ImageData, AveGetClipboard } from "ave-ui";
import Color from "color";

export function assetsPath(name: string) {
	const root = path.resolve(__dirname, "../../assets");
	return path.resolve(root, `./${name}`);
}

export function getColorRgba(color: Vec4) {
	return `rgba(${color.r},${color.g},${color.b},${color.a})`;
}

export function getColorHex(color: Vec4) {
	return Color(getColorRgba(color)).hex();
}

export function readPixel(data: ImageData, pos: Vec2) {
	if (data) {
		const color = data.GetPixel(pos.x, pos.y, 0);
		return new Vec4(color.x * 255, color.y * 255, color.z * 255, color.w * 255);
	} else {
		return new Vec4(255, 255, 255, 255);
	}
}

export function getClipboardContent() {
	const clipboard = AveGetClipboard();
	if (clipboard.HasImage()) {
		const aveImage = clipboard.GetImage();
		return aveImage;
	} else if (clipboard.HasFile()) {
		const [filePath] = clipboard.GetFile();
		if (filePath && ["png", "jpg", "jpeg"].some((extension) => filePath.endsWith(extension))) {
			return filePath;
		}
	}

	return "";
}
