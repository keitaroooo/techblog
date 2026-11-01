/// <reference types="jest" />

import { updatedDay } from '../../lib/updatedDay';

it('公開日と違う日のコミットだけ更新日にする', () => {
  expect(updatedDay('2026-10-25', '2026-11-01T18:12:03+09:00')).toBe(
    '2026-11-01',
  );
  expect(updatedDay('2022-08-28', '2022-08-28T20:25:32+09:00')).toBeNull();
  expect(updatedDay('2026-10-25', null)).toBeNull();
});
