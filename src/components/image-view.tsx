import React, { useCallback, useState } from "react";
import { Pager, Image } from "ave-react";
import { Pager as NativePager, Byo2Image, MessagePointer, ImageData, Placeholder, Vec2, AveImage, Picture as NativePicture } from "ave-ui";
import { containerLayout } from "../layout";

export interface IImageView {
	src: string | AveImage;
	onPageInit(pager: NativePager): void;
	onLoadImage(byo2: Byo2Image, data: ImageData, picture: NativePicture): void;
	onPointerMove?(sender: Placeholder, mp: MessagePointer): void;
	onPointerEnter?(sender: Placeholder, mp: MessagePointer): void;
	onPointerLeave?(sender: Placeholder, mp: MessagePointer): void;
	onPointerPress?(sender: Placeholder, mp: MessagePointer): void;
	onPointerRelease?(sender: Placeholder, mp: MessagePointer): void;
}

export function ImageView(props: IImageView) {
	//
	const [pager, setPager] = useState<NativePager>();
	const onPageInit = useCallback<IImageView["onPageInit"]>((pager) => {
		setPager(pager);
		props.onPageInit(pager);
	}, []);

	//
	const onLoadImage = useCallback<IImageView["onLoadImage"]>(
		(byo2, data, picture) => {
			pager.SetContentSize(new Vec2(data.Width, data.Height));
			props.onLoadImage(byo2, data, picture);
		},
		[props.onLoadImage, pager]
	);

	return (
		<Pager onSetContent={onPageInit} style={{ area: containerLayout.areas.image }}>
			<Image src={props.src} onLoad={onLoadImage} onPointerMove={props.onPointerMove} onPointerEnter={props.onPointerEnter} onPointerLeave={props.onPointerLeave} onPointerPress={props.onPointerPress} onPointerRelease={props.onPointerRelease} />
		</Pager>
	);
}
