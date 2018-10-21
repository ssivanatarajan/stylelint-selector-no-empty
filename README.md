# stylelint-selector-no-empty
Disallow empty selector in a css rule

```css
                    a, ,.b { display: inline; width: 100px; }
/**                   ↑
 *       This empty selector */
```

## Installation

```
npm install stylelint-selector-no-empty --save-dev
```

## Usage

```js
// .stylelintrc
{
  "plugins": [
    "stylelint-selector-no-empty"
  ],
  "rules": {
    "plugin/stylelint-selector-no-empty": true,
  }
}
```
## Options

### `true`

The following patterns are considered violations:
```css
a,,span { display: inline; width: 100px; }
```
```css
a,span, { display: inline; width: 100px; }
```
