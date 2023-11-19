import { TargetOptions } from '@angular-builders/custom-webpack';

export default (_targetOptions: TargetOptions, indexHtml: string) => {
    const start = indexHtml.indexOf('<script src="runtime');
    const end = indexHtml.indexOf('</body>');
    const injectionPositionHtml = '<!-- angular13 -->';

    const scripts = indexHtml.slice(start, end);

    return indexHtml.replace(scripts, '').replace(injectionPositionHtml, scripts);
};