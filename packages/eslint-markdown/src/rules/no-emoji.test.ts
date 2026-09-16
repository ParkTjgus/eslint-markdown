/**
 * @fileoverview Test for `no-emoji.ts`.
 * @author lumir(lumirlumir)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import ruleTester from '../tests/rule-tester.js';
import rule from './no-emoji.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

ruleTester('no-emoji', rule, {
  valid: [
    {
      name: 'Empty',
      code: '',
    },
    {
      name: 'Empty string',
      code: '  ',
    },
    {
      name: 'Text without emojis',
      code: 'Hello, world!',
    },

    // Options
    {
      name: '`allow` option - 1',
      code: 'Hello, 😄!',
      options: [
        {
          allow: ['😄'],
        },
      ],
    },
    {
      name: '`allow` option - 2',
      code: 'Hello, 😄 and 🦄!',
      options: [
        {
          allow: ['😄', '🦄'],
        },
      ],
    },
    {
      name: 'Default `style`: Allow emoji shortcode',
      code: 'Hello, :smile:!',
    },
    {
      name: "`style: ['emoji']`: Allow emoji shortcode",
      code: 'Hello, :smile:!',
      options: [
        {
          style: ['emoji'],
        },
      ],
    },
    {
      name: "`style: ['emoji']`: Allow raw emoji listed in `allow`",
      code: 'Hello, 😄!',
      options: [
        {
          style: ['emoji'],
          allow: ['😄'],
        },
      ],
    },
    {
      name: "`style: ['gemoji']`: Allow raw emoji",
      code: 'Hello, 😄!',
      options: [
        {
          style: ['gemoji'],
        },
      ],
    },
    {
      name: "`style: ['gemoji']`: Allow emoji shortcode listed in `allow`",
      code: 'Hello, :smile:!',
      options: [
        {
          style: ['gemoji'],
          allow: [':smile:'],
        },
      ],
    },
    {
      name: "`style: ['emoji', 'gemoji']`: Allow raw emoji and emoji shortcode listed in `allow`",
      code: 'Hello, 😄 and :smile:!',
      options: [
        {
          style: ['emoji', 'gemoji'],
          allow: ['😄', ':smile:'],
        },
      ],
    },
  ],

  invalid: [
    {
      // 😊's length is 2.
      name: 'Single-line emoji - 1',
      code: 'Hello, 😊!',
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      // 🙇‍♂️'s length is 5.
      name: 'Single-line emoji - 2',
      code: 'Hello, 🙇‍♂️!',
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 13,
        },
      ],
    },
    {
      // 😊's length is 2, 🦄's length is 2.
      name: 'Multi-line emojis - 1',
      code: `Hi, 😊
🦄!`,
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
        },
        {
          messageId: 'noEmoji',
          line: 2,
          column: 1,
          endLine: 2,
          endColumn: 3,
        },
      ],
    },
    {
      name: 'Multi-line emojis - 2',
      code: `Hi, 😊
  🦄!`,
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 7,
        },
        {
          messageId: 'noEmoji',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 5,
        },
      ],
    },

    // Options
    {
      // 😄's length is 2, 🦄's length is 2.
      name: '`allow` option - 1',
      code: 'Hello, 😄 and 🦄!',
      options: [
        {
          allow: ['😄'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 17,
        },
      ],
    },
    {
      // 😃's length is 2.
      name: "`style: ['emoji']`: Disallow raw emoji",
      code: 'Hello, 😃!',
      options: [
        {
          style: ['emoji'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
    {
      // :smile:'s length is 7.
      name: "`style: ['gemoji']`: Disallow emoji shortcode",
      code: 'Hello, :smile:!',
      options: [
        {
          style: ['gemoji'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 15,
        },
      ],
    },
    {
      // :smile:'s length is 7, :+1:'s length is 4.
      name: "`style: ['gemoji']`: Disallow adjacent emoji shortcodes",
      code: ':smile::+1:',
      options: [
        {
          style: ['gemoji'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 1,
          endLine: 1,
          endColumn: 8,
        },
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 12,
        },
      ],
    },
    {
      name: "`style: ['gemoji']`: Disallow multi-line emoji shortcodes",
      code: `Hi, :smile:
  :+1:!`,
      options: [
        {
          style: ['gemoji'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 5,
          endLine: 1,
          endColumn: 12,
        },
        {
          messageId: 'noEmoji',
          line: 2,
          column: 3,
          endLine: 2,
          endColumn: 7,
        },
      ],
    },
    {
      name: "`style: ['gemoji']`: Disallow emoji shortcode not listed in `allow`",
      code: 'Hello, :smile: and :+1:!',
      options: [
        {
          style: ['gemoji'],
          allow: [':smile:'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 20,
          endLine: 1,
          endColumn: 24,
        },
      ],
    },
    {
      name: "`style: ['emoji', 'gemoji']`: Disallow raw emoji and emoji shortcode",
      code: 'Hello, 😄 and :+1:!',
      options: [
        {
          style: ['emoji', 'gemoji'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 10,
        },
        {
          messageId: 'noEmoji',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 19,
        },
      ],
    },
    {
      name: "`style: ['emoji', 'gemoji']`: Disallow emoji shortcode when only a raw emoji is listed in `allow`",
      code: 'Hello, 😄 and :smile:!',
      options: [
        {
          style: ['emoji', 'gemoji'],
          allow: ['😄'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 15,
          endLine: 1,
          endColumn: 22,
        },
      ],
    },
    {
      name: "`style: ['emoji', 'gemoji']`: Disallow raw emoji when only an emoji shortcode is listed in `allow`",
      code: 'Hello, 😄 and :smile:!',
      options: [
        {
          style: ['emoji', 'gemoji'],
          allow: [':smile:'],
        },
      ],
      errors: [
        {
          messageId: 'noEmoji',
          line: 1,
          column: 8,
          endLine: 1,
          endColumn: 10,
        },
      ],
    },
  ],
});
