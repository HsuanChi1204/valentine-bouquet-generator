# Valentine's Day Flower Bouquet Generator

一個特別的情人節禮物生成器，可以製作專屬的動漫風格花束圖片。

## 功能特點

- 可以選擇多種不同的花朵（最多5種）
- 生成精美的動漫風格圖片
- 優雅的界面設計
- 即時花束生成

## 使用方法

1. 克隆此倉庫：
```bash
git clone [你的GitHub倉庫URL]
```

2. 配置 OpenAI API：
   - 在 `config.js` 中替換 `OPENAI_API_KEY` 為你的 OpenAI API 密鑰
   - 如果沒有 API 密鑰，請在 [OpenAI](https://platform.openai.com/) 註冊並創建

3. 運行項目：
   - 使用任何 HTTP 服務器運行項目，例如 Visual Studio Code 的 Live Server 插件
   - 或使用 Python 的簡單 HTTP 服務器：
```bash
python -m http.server 8000
```

4. 訪問網站：
   - 打開瀏覽器訪問 `http://localhost:8000`

## 技術要求

- 現代網絡瀏覽器（Chrome, Firefox, Safari 等）
- OpenAI API 密鑰
- 基本的 HTTP 服務器

## 注意事項

- 請確保妥善保管你的 API 密鑰
- API 調用會產生費用，請參考 OpenAI 的定價方案
- 生成的圖片僅供個人使用

## 授權

MIT License 