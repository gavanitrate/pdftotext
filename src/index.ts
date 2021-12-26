import { execSync } from 'child_process';
import * as path from 'path';

type PdfToTextOptions = {
  out?: string;
  f?: number;
  l?: number;
  layout?: boolean;
  simple?: boolean;
  simple2?: boolean;
  table?: boolean;
  lineprinter?: boolean;
  raw?: boolean;
  fixed?: number;
  linespacing?: number;
  clip?: boolean;
  nodiag?: boolean;
  enc?: string;
  eol?: 'unix' | 'dos' | 'mac';
  nopgbrk?: boolean;
  bom?: boolean;
  marginl?: number;
  marginr?: number;
  margint?: number;
  marginb?: number;
  opw?: string;
  upw?: string;
  q?: boolean;

};

function buildArgument(
  option: keyof PdfToTextOptions,
  options?: PdfToTextOptions,
) {
  if (!options) return '';
  const val = options[option];
  return val === undefined ? '' : `-${option} ${val}`;
}

function buildFlag(option: keyof PdfToTextOptions, options?: PdfToTextOptions) {
  if (!options) return '';
  const val = options[option];
  return val !== true ? '' : `-${option}`;
}

function buildCommand(pdf: string, options?: PdfToTextOptions) {
  console.log(process.env.PATH);

  return [
    path.join(__dirname, '../bin/pdftotext.exe'),
    buildArgument('f', options),
    buildArgument('l', options),
    buildFlag('layout', options),
    buildFlag('simple', options),
    buildFlag('simple2', options),
    buildArgument('eol', options),
    buildFlag('nopgbrk', options),
    buildFlag('bom', options),
    buildArgument('marginl', options),
    buildArgument('marginr', options),
    buildArgument('margint', options),
    buildArgument('marginb', options),
    buildArgument('opw', options),
    buildArgument('upw', options),
    buildFlag('q', options),
    pdf,
    options?.out ?? '-',
  ].join(' ');
}

export default function pdfToText(pdf: string, options?: PdfToTextOptions) {
  const command = buildCommand(pdf, options);
  return execSync(command, { encoding: 'utf-8' });
}
