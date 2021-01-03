const fs = require('fs');

const contextLoaderFilepath = 'context_loader.html';
const indexFilepath = 'build/index.html';

const contextLoader = fs.readFileSync(contextLoaderFilepath).toString();
let index = fs.readFileSync(indexFilepath).toString();

index = index.replace(/<script [^>]+initContextScript[^>]+><\/script>/, contextLoader.trim());

fs.writeFileSync(indexFilepath, index);
