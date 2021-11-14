const fs = require('fs-extra');
const path = require('path');
const klawSync = require('klaw-sync');

const typeContent = `export type SVGProps = {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
} & React.SVGAttributes<SVGSVGElement>
`;

function addNamespace(svgList) {
  const regId = /id=".+?"/g;

  return svgList.map((svg) => {
    const idList = (svg.content.match(regId) || []).map((id) =>
      id.substring(4, id.length - 1),
    );

    if (idList.length) {
      idList.forEach((id) => {
        svg.content = svg.content.replace(
          new RegExp(id, 'g'),
          `${svg.name}_${id}`,
        );
      });
    }

    return svg;
  });
}

function addParams(svgList) {
  const regFill = /fill=".+?"/;
  const regWidth = /width=".+?"/;
  const regHeight = /height=".+?"/;
  const regFillBlack = /fill="black"/g;
  const regSpcialColor = /fill="#161823"/g;
  const classReg = /class=".+?"/;

  return svgList.map((svg) => {
    const regColor = /Color$/;
    const regAnchor = /Anchor$/;

    svg.content = svg.content
      .replace(
        regWidth,
        '{...rest} className={className} style={style} width={width}',
      )
      .replace(classReg, ``)
      .replace(regHeight, 'height={height}')
      .replace(/xmlns:xlink/g, 'xmlnsXlink')
      .replace(/xlink:href/g, 'xlinkHref')
      .replace(/fill\-rule/g, 'fillRule')
      .replace(/clip\-rule/g, 'clipRule')
      .replace(/stroke\-width/g, 'strokeWidth')
      .replace(/stroke\-linejoin/g, 'strokeLinejoin')
      .replace(/stroke\-opacity/g, 'strokeOpacity')
      .replace(/stroke\-asharray/g, 'strokeDasharray')
      .replace(/stroke\-miterlimit/g, 'strokeMiterlimit')
      .replace(/stroke\-linecap/g, 'strokeLinecap')
      .replace(/stroke\-dasharray/g, 'strokeDasharray')
      .replace(/clip\-path/g, 'clipPath')
      .replace(/fill\-opacity/g, 'fillOpacity')
      .replace(/stop\-color/g, 'stopColor')
      .replace(/stop\-opacity/g, 'stopOpacity')
      .replace(/flood\-opacity/g, 'floodOpacity')
      .replace(/color\-interpolation\-filters/g, 'colorInterpolationFilters');

    // 彩色图标不需要替换颜色
    if (!regColor.test(svg.name) && !regAnchor.test(svg.name)) {
      svg.content = svg.content
        .replace(regFill, 'fill={fill}')
        .replace(regColor, '')
        .replace(regFillBlack, '')
        .replace(regSpcialColor, '');
    }

    return svg;
  });
}

function generateTypes() {
  const filePath = path.join(__dirname, '../src/types.ts');
  console.log(filePath);
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, typeContent, 'utf8');
}

function generateTS(svgList) {
  return svgList.map((svg) => {
    svg.content = `import React from 'react';
import { SVGProps } from './types';

export default function ${svg.name}(props: SVGProps) {
  const {
    width = '1em',
    height = '1em',
    fill = 'currentColor',
    style,
    className,
    ...rest
  } = props;

  return (
    ${svg.content}
  )
}`;

    return svg;
  });
}

function writeToFile(svgList) {
  const distPath = path.join(__dirname, '..', 'src');
  const indexPath = path.join(__dirname, '..', 'src', 'index.tsx');
  let indexContent = `export * from './types';\n`;

  svgList.forEach((svg) => {
    const { name, content } = svg;

    indexContent += `export { default as ${name} } from './${name}';\n`;

    fs.writeFileSync(path.join(distPath, `${name}.tsx`), content, {
      flag: 'w',
    });
  });

  fs.writeFileSync(indexPath, indexContent, { flag: 'w' });
}

function main() {
  const dirName = 'svgs';
  const svgPath = path.join(__dirname, '..', dirName);
  const files = klawSync(svgPath, { nodir: true });
  const svgList = files
    .filter((file) => !file.path.includes('.DS_Store'))
    .map((file) => {
      const name = file.path
        .match(/svgs\/(.+).svg/)[1]
        .replace(/(?:^|_|\-)(\w)/g, (match, p1, offset, input) => {
          return p1.toUpperCase();
        });
      const [suffix, iconName = ''] = name.split('/');
      const iconNameWithSuffix = `${iconName}${suffix.replace(/icon/i, '')}`;

      return {
        name: iconNameWithSuffix === 'React' ? 'Reaction' : iconNameWithSuffix,
        content: fs.readFileSync(file.path, { encoding: 'utf-8' }),
      };
    });

  generateTypes();
  addNamespace(svgList);
  addParams(svgList);
  generateTS(svgList);
  writeToFile(svgList);
}

main();
