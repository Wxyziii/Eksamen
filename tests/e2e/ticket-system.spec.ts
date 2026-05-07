import { expect, test } from '@playwright/test';

test.describe('IT-støtteportal', () => {
  test('ansatt kan se skjema og validering', async ({ page }) => {
    await page.goto('/ansatt.html');

    await expect(page.getByRole('heading', { name: /it|ticket|problem|støtte/i })).toBeVisible();

    const submit = page.getByRole('button', { name: /send|opprett|meld/i });
    await expect(submit).toBeVisible();
    await submit.click();

    await expect(page.getByText(/må|feil|påkrevd|required|tittel|beskrivelse/i)).toBeVisible();
  });

  test('admin dashboard viser tickets eller empty state', async ({ page }) => {
    await page.goto('/admin.html');

    await expect(page.getByRole('heading', { name: /dashboard|admin|tickets|oversikt/i })).toBeVisible();

    const ticketContent = page.getByText(/åpen|under arbeid|løst|kritisk|ingen tickets|empty/i);
    await expect(ticketContent.first()).toBeVisible();
  });

  test('filtre er tilgjengelige i admin dashboard', async ({ page }) => {
    await page.goto('/admin.html');

    const filterLike = page.getByRole('combobox').or(page.getByPlaceholder(/søk|search/i));
    await expect(filterLike.first()).toBeVisible();
  });
});
