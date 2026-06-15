# 開発メモ

## Onboarding JavaScript API

### showIntro() — イントロを表示する

Onboardingのイントロをプログラムから起動する際は、以下のメソッドを使用する。

```html
<button onclick="STANDSMotion.showIntro()">AIアシスタント</button>
```

**注意点**
- `ONB.showIntro()` ではなく **`STANDSMotion.showIntro()`** が正しい書き方
- Onboarding JSタグ（`components.js` 内に埋め込み済み）が読み込まれた後に実行される必要がある
- 現在はヘッダーの「AIアシスタント」ボタンに設定済み（`components.js` の `buildHeader()` 内）

### 参考：公式ドキュメント記載の例

```html
<div class="onb-button-container">
  <button class="onb-intro-button" onclick="STANDSMotion.showIntro()">イントロへ戻る</button>
</div>
```
