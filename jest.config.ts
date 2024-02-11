import type { JestConfigWithTsJest } from 'ts-jest'
import { defaultsESM as tsjPreset } from 'ts-jest/presets'
const jestConfig: JestConfigWithTsJest = {
	// [...]
	// Replace `ts-jest` with the preset you want to use
	// from the above list
	preset: 'ts-jest',
	transform: {
		...tsjPreset.transform,
	},
}

export default jestConfig
