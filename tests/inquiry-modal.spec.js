import { test, expect } from '@playwright/test';

// Test configuration for all 12 CTAs across 5 pages
const CTA_TESTS = [
  // SparkPage CTAs (4)
  {
    name: 'SparkPage - Hero CTA',
    page: '/the-spark',
    ctaSelector: 'section:first-of-type button:has-text("Book a workshop")',
    expectedProduct: 'spark',
    expectedProductLabel: 'The Spark — 2-Day Workshop',
  },
  {
    name: 'SparkPage - TargetAudience CTA',
    page: '/the-spark',
    ctaSelector: 'button:has-text("Let\'s talk")',
    expectedProduct: 'spark',
    expectedProductLabel: 'The Spark — 2-Day Workshop',
  },
  {
    name: 'SparkPage - Open Workshop CTA',
    page: '/the-spark',
    ctaSelector: 'button:has-text("Reserve seats")',
    expectedProduct: 'spark',
    expectedProductLabel: 'The Spark — 2-Day Workshop',
  },
  {
    name: 'SparkPage - Closed Workshop CTA',
    page: '/the-spark',
    ctaSelector: 'button:has-text("Book closed session")',
    expectedProduct: 'spark',
    expectedProductLabel: 'The Spark — 2-Day Workshop',
  },

  // CatalystPage CTAs (2)
  {
    name: 'CatalystPage - Hero CTA',
    page: '/the-catalyst',
    ctaSelector: 'button:has-text("Book a discovery call")',
    ctaIndex: 0,
    expectedProduct: 'catalyst',
    expectedProductLabel: 'The Catalyst — 12-Week Program',
  },
  {
    name: 'CatalystPage - Bottom CTA',
    page: '/the-catalyst',
    ctaSelector: 'button:has-text("Book a discovery call")',
    ctaIndex: 1,
    expectedProduct: 'catalyst',
    expectedProductLabel: 'The Catalyst — 12-Week Program',
  },

  // ScaleEnginePage CTAs (3)
  {
    name: 'ScaleEnginePage - Hero CTA',
    page: '/the-scale-engine',
    ctaSelector: 'button:has-text("Schedule a discovery conversation")',
    ctaIndex: 0,
    expectedProduct: 'scale-engine',
    expectedProductLabel: 'The Scale Engine — Advisory',
  },
  {
    name: 'ScaleEnginePage - Assessment CTA',
    page: '/the-scale-engine',
    ctaSelector: 'button:has-text("Get assessed")',
    expectedProduct: 'scale-engine',
    expectedProductLabel: 'The Scale Engine — Advisory',
  },
  {
    name: 'ScaleEnginePage - Bottom CTA',
    page: '/the-scale-engine',
    ctaSelector: 'button:has-text("Schedule a discovery conversation")',
    ctaIndex: 1,
    expectedProduct: 'scale-engine',
    expectedProductLabel: 'The Scale Engine — Advisory',
    scrollToBottom: true,
  },

  // AboutPage CTAs (2)
  {
    name: 'AboutPage - Hero CTA',
    page: '/about',
    ctaSelector: 'button:has-text("Book a conversation")',
    expectedProduct: 'general',
    expectedProductLabel: 'General Inquiry',
  },
  {
    name: 'AboutPage - Connect CTA',
    page: '/about',
    ctaSelector: 'button:has-text("Get in touch")',
    expectedProduct: 'general',
    expectedProductLabel: 'General Inquiry',
  },

  // FloatingNav CTA (1 - tested on homepage)
  {
    name: 'FloatingNav - Default CTA (Homepage)',
    page: '/',
    ctaSelector: 'nav button:has-text("Book a workshop")',
    expectedProduct: 'spark',
    expectedProductLabel: 'The Spark — 2-Day Workshop',
    scrollFirst: true,
  },
];

test.describe('Inquiry Modal - All 12 CTAs', () => {
  for (const ctaTest of CTA_TESTS) {
    test(ctaTest.name, async ({ page }) => {
      // Navigate to the page
      await page.goto(ctaTest.page);
      await page.waitForLoadState('networkidle');

      // Scroll if needed (for nav to appear or to reach bottom CTA)
      if (ctaTest.scrollFirst) {
        await page.evaluate(() => window.scrollBy(0, 200));
        await page.waitForTimeout(500);
      }
      if (ctaTest.scrollToBottom) {
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);
      }

      // Find and click the CTA button
      const ctaIndex = ctaTest.ctaIndex ?? 0;
      const ctaButton = page.locator(ctaTest.ctaSelector).nth(ctaIndex);
      await expect(ctaButton).toBeVisible({ timeout: 10000 });
      await ctaButton.click();

      // Verify modal opens
      const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
      await expect(modal).toBeVisible({ timeout: 5000 });

      // Check if it's the form modal or fallback email modal
      const productSelect = modal.locator('select[name="product"]');
      const emailLink = modal.locator('a[href^="mailto:"]');

      if (await productSelect.isVisible({ timeout: 2000 }).catch(() => false)) {
        // Form modal - verify product selection
        await expect(productSelect).toHaveValue(ctaTest.expectedProduct);

        // Verify all form fields are present
        await expect(modal.locator('input[name="name"]')).toBeVisible();
        await expect(modal.locator('input[name="email"]')).toBeVisible();
        await expect(modal.locator('input[name="phone"]')).toBeVisible();
        await expect(modal.locator('input[name="company"]')).toBeVisible();
        await expect(modal.locator('textarea[name="message"]')).toBeVisible();
      } else {
        // Fallback email modal - verify email link is present
        await expect(emailLink).toBeVisible();
        const href = await emailLink.getAttribute('href');
        expect(href).toContain('mailto:');
        // Check decoded URL contains the product label
        const decodedHref = decodeURIComponent(href);
        expect(decodedHref).toContain(ctaTest.expectedProductLabel);
      }

      // Close modal
      const closeButton = modal.locator('button:has(svg)').first();
      await closeButton.click();

      // Verify modal is closed
      await expect(modal).not.toBeVisible({ timeout: 3000 });
    });
  }
});

test.describe('Inquiry Modal - Form Functionality (requires HubSpot config)', () => {
  test('Form fields are interactive when HubSpot is configured', async ({ page }) => {
    await page.goto('/the-spark');
    await page.waitForLoadState('networkidle');

    // Open modal
    const ctaButton = page.locator('section:first-of-type button:has-text("Book a workshop")').first();
    await ctaButton.click();

    const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
    await expect(modal).toBeVisible();

    // Check if form is available (HubSpot configured)
    const nameInput = modal.locator('input[name="name"]');
    const isFormMode = await nameInput.isVisible({ timeout: 2000 }).catch(() => false);

    if (!isFormMode) {
      test.skip(true, 'HubSpot not configured - fallback mode');
      return;
    }

    // Fill out form
    await nameInput.fill('Test User');
    await modal.locator('input[name="email"]').fill('test@example.com');
    await modal.locator('input[name="phone"]').fill('+45 12 34 56 78');
    await modal.locator('input[name="company"]').fill('Test Company');
    await modal.locator('select[name="product"]').selectOption('catalyst');
    await modal.locator('textarea[name="message"]').fill('This is a test message');

    // Verify values are set
    await expect(nameInput).toHaveValue('Test User');
    await expect(modal.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(modal.locator('input[name="phone"]')).toHaveValue('+45 12 34 56 78');
    await expect(modal.locator('input[name="company"]')).toHaveValue('Test Company');
    await expect(modal.locator('select[name="product"]')).toHaveValue('catalyst');
    await expect(modal.locator('textarea[name="message"]')).toHaveValue('This is a test message');

    // Submit button should be enabled
    const submitButton = modal.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
  });

  test('Submit button disabled without required fields', async ({ page }) => {
    await page.goto('/the-spark');
    await page.waitForLoadState('networkidle');

    // Open modal
    const ctaButton = page.locator('section:first-of-type button:has-text("Book a workshop")').first();
    await ctaButton.click();

    const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
    await expect(modal).toBeVisible();

    // Check if form is available (HubSpot configured)
    const submitButton = modal.locator('button[type="submit"]');
    const isFormMode = await submitButton.isVisible({ timeout: 2000 }).catch(() => false);

    if (!isFormMode) {
      test.skip(true, 'HubSpot not configured - fallback mode');
      return;
    }

    // Submit button should be disabled initially
    await expect(submitButton).toBeDisabled();

    // Fill only email (name still empty)
    await modal.locator('input[name="email"]').fill('test@example.com');
    await expect(submitButton).toBeDisabled();

    // Fill name too - now should be enabled
    await modal.locator('input[name="name"]').fill('Test User');
    await expect(submitButton).toBeEnabled();
  });
});

test.describe('Inquiry Modal - UI Behavior', () => {
  test('Modal closes on backdrop click', async ({ page }) => {
    await page.goto('/the-spark');
    await page.waitForLoadState('networkidle');

    // Open modal
    const ctaButton = page.locator('section:first-of-type button:has-text("Book a workshop")').first();
    await ctaButton.click();

    const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
    await expect(modal).toBeVisible();

    // Click backdrop (the semi-transparent overlay)
    const backdrop = modal.locator('.absolute.inset-0.bg-black\\/80');
    await backdrop.click({ position: { x: 10, y: 10 } });

    // Modal should close
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });

  test('Modal closes on X button click', async ({ page }) => {
    await page.goto('/the-spark');
    await page.waitForLoadState('networkidle');

    // Open modal
    const ctaButton = page.locator('section:first-of-type button:has-text("Book a workshop")').first();
    await ctaButton.click();

    const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
    await expect(modal).toBeVisible();

    // Click X button
    const closeButton = modal.locator('button:has(svg)').first();
    await closeButton.click();

    // Modal should close
    await expect(modal).not.toBeVisible({ timeout: 3000 });
  });
});

test.describe('FloatingNav - Contextual CTAs', () => {
  const navTests = [
    { page: '/', expectedLabel: 'Book a workshop', expectedProduct: 'spark' },
    { page: '/the-spark', expectedLabel: 'Book a workshop', expectedProduct: 'spark' },
    { page: '/the-catalyst', expectedLabel: 'Book a discovery call', expectedProduct: 'catalyst' },
    { page: '/the-scale-engine', expectedLabel: 'Schedule a conversation', expectedProduct: 'scale-engine' },
    { page: '/about', expectedLabel: 'Get in touch', expectedProduct: 'general' },
  ];

  for (const navTest of navTests) {
    test(`FloatingNav CTA on ${navTest.page}`, async ({ page }) => {
      await page.goto(navTest.page);
      await page.waitForLoadState('networkidle');

      // Scroll to make nav visible
      await page.evaluate(() => window.scrollBy(0, 200));
      await page.waitForTimeout(500);

      // Find nav button with expected label
      const navButton = page.locator(`nav button:has-text("${navTest.expectedLabel}")`);
      await expect(navButton).toBeVisible({ timeout: 5000 });

      // Click and verify modal opens with correct product
      await navButton.click();

      const modal = page.locator('.fixed.inset-0.z-\\[100\\]');
      await expect(modal).toBeVisible();

      // Verify product selection if form mode
      const productSelect = modal.locator('select[name="product"]');
      if (await productSelect.isVisible({ timeout: 1000 }).catch(() => false)) {
        await expect(productSelect).toHaveValue(navTest.expectedProduct);
      }

      // Close modal
      await modal.locator('button:has(svg)').first().click();
    });
  }
});
