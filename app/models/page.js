
function page(rows) {
    this.PageId = rows.PageId;
    this.Title = rows.Title;
    this.Content = rows.Content;
    this.Published_date = rows.Published_date;
    this.Updated_date = rows.Updated_date;
    this.IsNews = rows.IsNews;
    this.AdminId = rows.AdminId;
    this.FormularForms = rows.FormularForms;
    this.FormularResult = rows.FormularResult;
}

module.exports = page;