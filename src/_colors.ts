export class Hsluv {
	private static hexChars = "0123456789abcdef"
	private static refY = 1.0
	private static refU = 0.19783000664283
	private static refV = 0.46831999493879
	private static kappa = 903.2962962
	private static epsilon = 0.0088564516
	private static m_r0 = 3.240969941904521
	private static m_r1 = -1.537383177570093
	private static m_r2 = -0.498610760293
	private static m_g0 = -0.96924363628087
	private static m_g1 = 1.87596750150772
	private static m_g2 = 0.041555057407175
	private static m_b0 = 0.055630079696993
	private static m_b1 = -0.20397695888897
	private static m_b2 = 1.056971514242878

	// RGB
	rgb_r = 0
	rgb_g = 0
	rgb_b = 0

	// CIE XYZ
	xyz_x = 0
	xyz_y = 0
	xyz_z = 0

	// CIE LUV
	luv_l = 0
	luv_u = 0
	luv_v = 0

	// CIE LUV LCh
	lch_l = 0
	lch_c = 0
	lch_h = 0

	// HSLuv
	hsluv_h = 0
	hsluv_s = 0
	hsluv_l = 0

	// 6 lines in slope-intercept format: R < 0, R > 1, G < 0, G > 1, B < 0, B > 1
	r0s = 0
	r0i = 0
	r1s = 0
	r1i = 0

	g0s = 0
	g0i = 0
	g1s = 0
	g1i = 0

	b0s = 0
	b0i = 0
	b1s = 0
	b1i = 0

	constructor(h: number, s: number, l: number) {
		this.hsluv_h = h
		this.hsluv_s = s
		this.hsluv_l = l
	}

	private static fromLinear(c: number): number {
		if (c <= 0.0031308) {
			return 12.92 * c
		} else {
			return 1.055 * Math.pow(c, 1 / 2.4) - 0.055
		}
	}

	private static lToY(L: number): number {
		if (L <= 8) {
			return (Hsluv.refY * L) / Hsluv.kappa
		} else {
			return Hsluv.refY * Math.pow((L + 16) / 116, 3)
		}
	}

	private static rgbChannelToHex(chan: number): string {
		const c = Math.round(chan * 255)
		const digit2 = c % 16
		const digit1 = ((c - digit2) / 16) | 0
		return Hsluv.hexChars.charAt(digit1) + Hsluv.hexChars.charAt(digit2)
	}

	private static distanceFromOriginAngle(
		slope: number,
		intercept: number,
		angle: number,
	): number {
		const d = intercept / (Math.sin(angle) - slope * Math.cos(angle))
		if (d < 0) {
			return Infinity
		} else {
			return d
		}
	}

	private static distanceFromOrigin(slope: number, intercept: number): number {
		return Math.abs(intercept) / Math.sqrt(Math.pow(slope, 2) + 1)
	}

	private static min6(
		f1: number,
		f2: number,
		f3: number,
		f4: number,
		f5: number,
		f6: number,
	): number {
		return Math.min(
			f1,
			Math.min(f2, Math.min(f3, Math.min(f4, Math.min(f5, f6)))),
		)
	}

	private xyzToRgb(): void {
		this.rgb_r = Hsluv.fromLinear(
			Hsluv.m_r0 * this.xyz_x +
				Hsluv.m_r1 * this.xyz_y +
				Hsluv.m_r2 * this.xyz_z,
		)
		this.rgb_g = Hsluv.fromLinear(
			Hsluv.m_g0 * this.xyz_x +
				Hsluv.m_g1 * this.xyz_y +
				Hsluv.m_g2 * this.xyz_z,
		)
		this.rgb_b = Hsluv.fromLinear(
			Hsluv.m_b0 * this.xyz_x +
				Hsluv.m_b1 * this.xyz_y +
				Hsluv.m_b2 * this.xyz_z,
		)
	}

	private luvToXyz(): void {
		if (this.luv_l === 0) {
			this.xyz_x = 0
			this.xyz_y = 0
			this.xyz_z = 0
			return
		}
		const varU = this.luv_u / (13 * this.luv_l) + Hsluv.refU
		const varV = this.luv_v / (13 * this.luv_l) + Hsluv.refV
		this.xyz_y = Hsluv.lToY(this.luv_l)
		this.xyz_x = 0 - (9 * this.xyz_y * varU) / ((varU - 4) * varV - varU * varV)
		this.xyz_z =
			(9 * this.xyz_y - 15 * varV * this.xyz_y - varV * this.xyz_x) / (3 * varV)
	}

	private lchToLuv(): void {
		const hrad = (this.lch_h / 180.0) * Math.PI
		this.luv_l = this.lch_l
		this.luv_u = Math.cos(hrad) * this.lch_c
		this.luv_v = Math.sin(hrad) * this.lch_c
	}

	private calculateBoundingLines(l: number): void {
		const sub1 = Math.pow(l + 16, 3) / 1560896
		const sub2 = sub1 > Hsluv.epsilon ? sub1 : l / Hsluv.kappa
		const s1r = sub2 * (284517 * Hsluv.m_r0 - 94839 * Hsluv.m_r2)
		const s2r =
			sub2 * (838422 * Hsluv.m_r2 + 769860 * Hsluv.m_r1 + 731718 * Hsluv.m_r0)
		const s3r = sub2 * (632260 * Hsluv.m_r2 - 126452 * Hsluv.m_r1)
		const s1g = sub2 * (284517 * Hsluv.m_g0 - 94839 * Hsluv.m_g2)
		const s2g =
			sub2 * (838422 * Hsluv.m_g2 + 769860 * Hsluv.m_g1 + 731718 * Hsluv.m_g0)
		const s3g = sub2 * (632260 * Hsluv.m_g2 - 126452 * Hsluv.m_g1)
		const s1b = sub2 * (284517 * Hsluv.m_b0 - 94839 * Hsluv.m_b2)
		const s2b =
			sub2 * (838422 * Hsluv.m_b2 + 769860 * Hsluv.m_b1 + 731718 * Hsluv.m_b0)
		const s3b = sub2 * (632260 * Hsluv.m_b2 - 126452 * Hsluv.m_b1)
		this.r0s = s1r / s3r
		this.r0i = (s2r * l) / s3r
		this.r1s = s1r / (s3r + 126452)
		this.r1i = ((s2r - 769860) * l) / (s3r + 126452)
		this.g0s = s1g / s3g
		this.g0i = (s2g * l) / s3g
		this.g1s = s1g / (s3g + 126452)
		this.g1i = ((s2g - 769860) * l) / (s3g + 126452)
		this.b0s = s1b / s3b
		this.b0i = (s2b * l) / s3b
		this.b1s = s1b / (s3b + 126452)
		this.b1i = ((s2b - 769860) * l) / (s3b + 126452)
	}

	private calcMaxChromaHsluv(h: number): number {
		const hueRad = (h / 360) * Math.PI * 2
		const r0 = Hsluv.distanceFromOriginAngle(this.r0s, this.r0i, hueRad)
		const r1 = Hsluv.distanceFromOriginAngle(this.r1s, this.r1i, hueRad)
		const g0 = Hsluv.distanceFromOriginAngle(this.g0s, this.g0i, hueRad)
		const g1 = Hsluv.distanceFromOriginAngle(this.g1s, this.g1i, hueRad)
		const b0 = Hsluv.distanceFromOriginAngle(this.b0s, this.b0i, hueRad)
		const b1 = Hsluv.distanceFromOriginAngle(this.b1s, this.b1i, hueRad)
		return Hsluv.min6(r0, r1, g0, g1, b0, b1)
	}

	private hsluvToLch(): void {
		if (this.hsluv_l > 99.9999999) {
			this.lch_l = 100
			this.lch_c = 0
		} else if (this.hsluv_l < 0.00000001) {
			this.lch_l = 0
			this.lch_c = 0
		} else {
			this.lch_l = this.hsluv_l
			this.calculateBoundingLines(this.hsluv_l)
			const max = this.calcMaxChromaHsluv(this.hsluv_h)
			this.lch_c = (max / 100) * this.hsluv_s
		}
		this.lch_h = this.hsluv_h
	}

	private hsluvToRgb(): void {
		this.hsluvToLch()
		this.lchToLuv()
		this.luvToXyz()
		this.xyzToRgb()
	}

	public hex(): string {
		this.hsluvToRgb()

		let hex = "#"
		hex += Hsluv.rgbChannelToHex(this.rgb_r)
		hex += Hsluv.rgbChannelToHex(this.rgb_g)
		hex += Hsluv.rgbChannelToHex(this.rgb_b)
		return hex
	}
}

export const colors = {
	dark: {
		fg: new Hsluv(0, 0, 87).hex(),
		sub: new Hsluv(0, 0, 50).hex(),
		subsub: new Hsluv(0, 0, 10).hex(),
		bg: new Hsluv(0, 0, 5).hex(),
		accent: new Hsluv(255, 100, 57).hex(),
	},
	light: {
		fg: new Hsluv(0, 0, 8).hex(),
		sub: new Hsluv(0, 0, 55).hex(),
		subsub: new Hsluv(0, 0, 95).hex(),
		bg: new Hsluv(0, 0, 100).hex(),
		accent: new Hsluv(255, 100, 50).hex(),
	},
}
