/** Resolve um arquivo de /public respeitando o base path do build. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
