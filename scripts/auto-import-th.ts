import fs from 'fs';
import chokidar from 'chokidar';

const fromTypedHtml = "from 'typed-html';\n";

const addImportIfNotIncluded = (path: string) => {
  try {
    const content = fs.readFileSync(path, 'utf-8');
    if (!content.includes(fromTypedHtml)) {
      console.log('missing import statement, add in', path);
      fs.writeFileSync(path, `import * as th ${fromTypedHtml}` + content);
    }
  } catch (error) {
    console.error(error);
  }
};

export const watchImport = () => {
  const watcher = chokidar.watch(['app/**/*.tsx'], {
    ignored: /node_modules/,
    persistent: true,
  });

  console.log('watching import');
  watcher.on('add', (path, stats) => {
    console.log('add', path);
    addImportIfNotIncluded(path);
  });

  watcher.on('change', (path) => {
    console.log('change', path);
    addImportIfNotIncluded(path);
  });
};

watchImport();
