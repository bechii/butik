import typescript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';

export default {
	input: 'src/main.ts',
	output: [
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].js'
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].cjs'
    }
  ],
	plugins: [
		typescript({
			tsconfig: './tsconfig.json'
		}),
    del({ targets: 'dist/*' })
	]
};
