# DataTable React Wrapper

[![chat][chat]][chat-url]

### Configuration

```javascript
this.tableHead = ['ReportID', 'Headline', 'Cover', 'Description', 'Publish Time', 'Operation'];
this.tableOpt = {
    columns: [
        {
            data: "id"
            ,className: 'td-vertical-middle'
            ,orderable: false
        }
        ,{ 
            data: 'headline'
            ,className: 'td-vertical-middle break-word td-vertical-middle'
            ,orderable: false
        }
        ,{ 
            data: null
            ,className: 'td-vertical-middle'
            ,orderable: false
            ,render: (data, type, row, meta)=>{
                return '<img src="'+ row.newsPreview +'" alt="Cover" style="max-width: 100%;">';
            }
            ,width: '20%'
        }
        ,{ 
            data: 'description'
            ,className: 'td-vertical-middle break-word'
            ,orderable: false
            ,width: '30%'
        }
        ,{ 
            data: null
            ,className: 'td-vertical-middle'
            ,orderable: false
            ,render: (data, type, row, meta)=>{
                var date = new Date(row.createDate);
                return dateformat(date, 'yyyy-mm-dd HH:MM:ss');
            }
        }
        ,{ 
            data: null
            ,className: 'td-vertical-middle'
            ,width: '10%'
            ,render: (data, type, row, meta)=>{
                var html = '';
                var payload = JSON.stringify({
                    id: row.id,
                    headline: row.headline,
                    createDate: row.createDate
                });
                payload = payload.replace(/"/g, '&quot;');

                html += '<button class="btn btn-sm btn-primary row-operate" title="Edit!" data-payload="'+ payload +'" data-type="EDIT_SOURCE">Edit</button>';
                
                return html;
            }
            ,orderable: false
        }
    ]
};

this.state = {
    table_data_url: Config.interface.report.getList,
    table_ajax_data: {}
}
```

### Usage

```javascript
<DataTable 
    ref={instance => (this.table = instance)} 
    proxyClick={this.tableProxyClick.bind(this)} 
    tableHead={this.tableHead} 
    tableOpt={this.tableOpt} 
    dataUrl={this.state.table_data_url} 
    ajaxData={this.state.table_ajax_data} />
```

[chat]: https://badges.gitter.im/gitterHQ/gitter.png
[chat-url]: https://gitter.im/nk-datatables/Lobby