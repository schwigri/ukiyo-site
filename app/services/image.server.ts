export function createImageBuffer(
	str: Parameters<typeof Buffer.from>[0],
	encoding?: Parameters<typeof Buffer.from>[1]
) {
	return Buffer.from(str, encoding);
}
