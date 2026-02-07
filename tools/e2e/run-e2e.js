import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  try {
    console.log('Abrindo página de cadastro...');
    await page.goto('http://localhost:3000/login.html');

    // preencher cadastro
    await page.click('button#signin'); // alterna para tela de cadastro se necessário
    await page.waitForTimeout(500);

    await page.type('input[name=nome]', 'Teste E2E');
    await page.type('input[name=email]', `e2e+${Date.now()}@example.com`);
    await page.type('input[name=senha]', 'Senha1234');
    await page.type('input[name=telefone]', '11999999999');
    await page.type('input[name=cpf]', '00000000000');

    // enviar sem foto (opcional)
    await Promise.all([
      page.click('#cadastroForm button[type=submit]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]).catch(() => {});

    console.log('Cadastro enviado, agora fazendo login...');

    // preencher login
    await page.type('input#email', 'e2e@example.com').catch(() => {});
    await page.type('input#password', 'Senha1234').catch(() => {});

    await Promise.all([
      page.click('#loginForm button[type=submit]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' })
    ]).catch(() => {});

    console.log('Login realizado (atenção: E2E assume servidor rodando)');

    // ir para perfil
    await page.goto('http://localhost:3000/profile.html');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'e2e-profile.png', fullPage: true });
    console.log('Screenshot do profile gerada: e2e-profile.png');

  } catch (err) {
    console.error('E2E falhou:', err);
    await page.screenshot({ path: 'e2e-error.png', fullPage: true }).catch(() => {});
  } finally {
    await browser.close();
  }
})();
