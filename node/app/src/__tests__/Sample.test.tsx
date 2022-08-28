/// <reference types="jest" />

import Home from "pages/index";

import { cleanup, render, screen } from "@testing-library/react";

// 各テスト実行後にレンダーしたコンポーネントをアンマウントする
afterEach(cleanup);

it("Home ページコンポーネントが存在している", () => {
  expect(Home).toBeTruthy();
});

it("「KeitarooOO Tech Blog」のリンクが KeitarooOO Tech Blogのトップページである", () => {
  render(<Home allPostsData={[]} />);
  expect(screen.getByText("KeitarooOO Tech Blog").getAttribute("href")).toBe(
    "/"
  );
});
