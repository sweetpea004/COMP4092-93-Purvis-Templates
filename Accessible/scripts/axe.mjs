import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const wcag21aa = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const scenarios = [
  {
    name: 'http://localhost:5173/',
    tags: wcag21aa,
    async prepare(page) {
      await openMenu(page);
    },
  },
  {
    name: 'http://localhost:5173/?cart-open',
    tags: wcag21aa,
    async prepare(page) {
      await openMenu(page);
      await page.click('#main-header nav button');
      await page.waitForSelector('dialog.modal[open]', { visible: true });
    },
  },
  {
    name: 'http://localhost:5173/?wcag22',
    rules: ['target-size'],
    async prepare(page) {
      await openMenu(page);
    },
  },
];

async function openMenu(page) {
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('#meals', { visible: true });
}

function check(builder, scenario) {
  if (scenario.rules) {
    return builder.withRules(scenario.rules);
  }
  return builder.withTags(scenario.tags);
}

function issues(results, type) {
  const groups = type === 'error' ? results.violations : results.incomplete;

  return groups.flatMap((result) =>
    result.nodes.map((node) => ({
      code: result.id,
      type,
      impact: result.impact,
      message: result.help,
      context: node.html,
      selector: node.target.join(' '),
      helpUrl: result.helpUrl,
    })),
  );
}

const json = process.argv.includes('--json');
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

const report = {};
let failed = 0;
let errors = 0;

try {
  if (!json) {
    console.log(`Running axe-core on ${scenarios.length} URLs:`);
  }

  for (const scenario of scenarios) {
    await scenario.prepare(page);
    const results = await check(new AxePuppeteer(page), scenario).analyze();
    const found = [...issues(results, 'error'), ...issues(results, 'incomplete')];
    const errorCount = found.filter((issue) => issue.type === 'error').length;
    report[scenario.name] = found;
    errors += errorCount;

    if (errorCount > 0) {
      failed += 1;
    }

    if (!json) {
      console.log(` > ${scenario.name} - ${errorCount} errors`);
      for (const issue of found.filter((item) => item.type === 'error')) {
        console.log(`   • ${issue.code}: ${issue.message} (${issue.selector})`);
      }
    }
  }
} finally {
  await browser.close();
}

const passed = scenarios.length - failed;

if (json) {
  console.log(JSON.stringify({
    total: scenarios.length,
    passes: passed,
    errors,
    results: report,
  }));
} else {
  console.log(`${failed ? '✘' : '✔'} ${passed}/${scenarios.length} URLs passed`);
}

if (failed > 0) {
  process.exit(1);
}
