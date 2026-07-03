const fs = require('fs');
const file = 'components/ribbon/tabs/FileTab/modals/OpenModal.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div>\s*<h3 className="font-bold text-slate-700 mb-3 text-xs uppercase tracking-wider">Recent Documents<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\);\s*};/g;

content = content.replace(regex, '</div>\n    </div>\n  );\n};');

fs.writeFileSync(file, content);
