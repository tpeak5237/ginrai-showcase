import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("filter, browse, choose and save a synthetic meal", async ({
  page,
}, info) => {
  const external: string[] = [];
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:4314/")) external.push(r.url());
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "ข้าวไก่ย่างซอสขิง", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  const a11y = await new AxeBuilder({ page }).analyze();
  expect(
    a11y.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page.screenshot({
    path: `docs/screenshots/${info.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "ขอดูจานอื่น" }).click();
  await expect(
    page.getByRole("heading", { name: "บะหมี่แห้งงาคั่ว", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "มื้อนี้จานนี้" }).click();
  await expect(page.getByRole("dialog")).toContainText("นี่ไม่ใช่การสั่งอาหาร");
  await expect(page.getByRole("button", { name: "ปิดเมนู" })).toBeFocused();
  await page.getByRole("button", { name: "เก็บไว้เผื่อมื้อหน้า" }).click();
  await page.keyboard.press("Escape");
  await page.reload();
  await page.getByRole("button", { name: /^ที่บันทึกไว้/ }).click();
  await expect(
    page.getByRole("heading", { name: "บะหมี่แห้งงาคั่ว", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "นำ บะหมี่แห้งงาคั่ว ออก" }).click();
  await expect(
    page.getByRole("heading", { name: "เก็บจานที่ถูกใจไว้ตรงนี้" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "กลับไปเลือกเมนู" }).click();
  await page.getByRole("button", { name: "เมนูพืช", exact: true }).click();
  await page.getByRole("checkbox", { name: "ไม่เอาเผ็ดวันนี้" }).check();
  await expect(
    page.getByRole("heading", { name: "ข้าวเต้าหู้ผักย่าง", exact: true }),
  ).toBeVisible();
  await page
    .getByLabel("ศูนย์อาหารตัวอย่าง", { exact: true })
    .selectOption("river");
  await expect(
    page.getByRole("heading", { name: "ยังไม่มีจานที่ตรงเงื่อนไข" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "ดูเมนูตัวอย่างทั้งหมด" }).click();
  await expect(
    page.getByRole("heading", { name: "ข้าวไก่ย่างซอสขิง", exact: true }),
  ).toBeVisible();
  await page.getByRole("slider", { name: "งบต่อจาน" }).fill("60");
  await expect(
    page.getByRole("heading", { name: "ยังไม่มีจานที่ตรงเงื่อนไข" }),
  ).toBeVisible();
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});
test("keyboard and blocked browser storage remain usable", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Storage denied", "SecurityError");
      },
    }),
  );
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "ข้ามไปเลือกเมนู" }),
  ).toBeFocused();
  const card = page.getByRole("article", { name: /เมนูปัจจุบัน/ });
  await card.focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("heading", { name: "บะหมี่แห้งงาคั่ว", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await page.getByRole("button", { name: /^ที่บันทึกไว้/ }).click();
  await expect(
    page.getByRole("heading", { name: "บะหมี่แห้งงาคั่ว", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("horizontal card gesture browses without changing filters", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.getByRole("article", { name: /เมนูปัจจุบัน/ });
  await card.scrollIntoViewIfNeeded();
  const box = await card.boundingBox();
  if (!box) throw new Error("Missing dish card");
  await page.mouse.move(box.x + box.width * 0.8, box.y + 100);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + 100, { steps: 8 });
  await page.mouse.up();
  await expect(
    page.getByRole("heading", { name: "บะหมี่แห้งงาคั่ว", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("slider", { name: "งบต่อจาน" })).toHaveValue(
    "150",
  );
});
