## 使用 vue2 完成一個國家目錄

[技術題目連結](https://docs.google.com/forms/d/e/1FAIpQLSfs4Gb8fX7wmywKvwr_56YL3UgjAvqwfgMY3ZxbxGjC8p0sHg/viewform)

1. 資料源使用免費的 API - https://restcountries.com/
2. 需求
   - 目錄必須顯示欄位,()内為 Api 資料物件的屬性
     - 國旗(圖片資源請使用 flags 裡面的 PNG)
     - 國家名稱（name.official）
     - 2 位國家代碼(cca2)
     - 3 位國家代碼(cca3)
     - 母語名稱(name.nativeName.zho.official)
     - 替代國家名稱(altSpellings)
     - 國際電話區號(idd)
   - 以國名搜尋功能(模糊搜尋)
   - 以國名排序功能（正序、倒序）
   - 分頁(每頁 25 筆)
   - 點擊國家名稱后顯示一個 Modal，裏面顯示該國家的其他資訊。
3. 服務必須部署到 GitHub Pages，並保留完整的提交記錄。
4. 若能使用任一前端框架(Vue/React/Angular)更好！

### 第一階段: RichTable

所有功能做在一起

### 第二階段:

細分三個 component

- Filter
- Table
- Pagination
