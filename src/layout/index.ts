export const containerLayout = {
	rows: "1",
	columns: "1 192dpx",
	areas: {
		image: { row: 0, column: 0 },
		pixel: { row: 0, column: 1 },
	},
};

export const pixelLayout = {
	// prettier-ignore
	rows: [
		"128dpx", /* mini view  */ "4dpx",
		"192dpx", /* zoom view  */ "4dpx",
		"32dpx",  /* color view */ "4dpx",
		"16dpx",  /* pixel pos  */ "4dpx",
		"16dpx",  /* pixel hex */ "4dpx",
		"16dpx",  /* pixel rgba */ "4dpx",
		"32dpx",  /* open file  */ "4dpx",
		"32dpx",  /* paste 		*/
		"1",
		"16dpx",  /* move: wasd */ "4dpx",
		"16dpx",  /* lock color */ "4dpx",
		"16dpx",  /* open file  */ "4dpx",
		"16dpx",  /* paste      */ "4dpx",
		"16dpx",  /* drop png   */
	].join(" "),
	columns: "1",
	areas: {
		//
		miniView: { column: 0, row: 0 },
		zoomView: { column: 0, row: 2 },
		colorView: { column: 0, row: 4 },
		pixelPos: { column: 0, row: 6 },
		pixelHex: { column: 0, row: 8 },
		pixelRgba: { column: 0, row: 10 },
		openFile: { column: 0, row: 12 },
		paste: { column: 0, row: 14 },

		//
		usageMove: { column: 0, row: 16 },
		usageLockColor: { column: 0, row: 18 },
		usageOpenFile: { column: 0, row: 20 },
		usagePaste: { column: 0, row: 22 },
		usageDrop: { column: 0, row: 24 },
	},
};
