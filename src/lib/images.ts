/** Фото товаров из папки материалов (scripts/import-*.mjs) уже подготовлены нужного размера с точным цветом
 *  фона surface. Next.js отдаёт их как есть (unoptimized), иначе его сжатие сдвигает оттенок фона */
export const isPrepared = (src: string) => /^\/img\/(face|catalog)\//.test(src);
