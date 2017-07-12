/*
 * @Author: Nokey 
 * @Date: 2017-06-06 13:03:22 
 * @Last Modified by: Nokey
 * @Last Modified time: 2017-07-12 18:10:34
 */
'use strict';

// Datatables
import 'datatables.net'
import 'datatables.net-bs'
import 'datatables.net-bs/css/dataTables.bootstrap.css'

class DataTable extends React.Component {
    constructor(props){
        super(props);

        this.tableDomID = '#liveList';
        this.table = null;
    }

    reload(resetPaging){
        resetPaging = resetPaging || false;
        this.table && this.table.ajax.reload(null, resetPaging);
    }

    reCreate(){
        this.destroy()
            .init();
    }

    rowOperateProxy(){
        var _me = this;

        $(this.tableDomID).on('click', 'button.row-operate', (e)=>{
            var btn = $(e.target),
                type = btn.data('type'),
                payload = btn.data('payload');

            _me.props.proxyClick({
                type: type,
                payload: payload
            });
        });
    }

    init(){
        // init datatables
        var _me = this;

        _me.table = $(_me.tableDomID).DataTable({
            info: false
            ,processing: true
            ,language: {
                processing: '<h4 style="color:#b22222; padding: 1em;">Processing... :)</h4>'
            }
            ,serverSide: true
            // ,stateSave: true
            ,autoWidth: false
            ,paging: true
            ,searching: false
            ,lengthChange: false
            ,fixedHeader: {
                header: true
                ,headerOffset: 75
            }
            ,ordering: false
            // ,order: [
            //     [2, 'desc']
            // ]
            ,columnDefs: [
                // {
                //     targets: [0]
                //     // ,render: (data, type, row, meta)=>{
                //     //     return table_tr_id++;
                //     // }
                //     ,className: 'text-center'
                //     ,width: '10%'
                //     ,orderable: false
                //     ,searchable: false
                // }
            ]
            ,columns: _me.props.tableOpt.columns
            ,ajax: function(d, callback, settings){
                var new_ajax_data = $.extend({}, d, {
                    pageSize: d.length
                }, _me.props.ajaxData);

                $.ajax({
                    type: "GET",
                    url: _me.props.dataUrl,
                    data: new_ajax_data,
                    dataType: "json"
                    ,beforeSend: function(){
                        // console.log('Begin Ajax...');
                    }
                    ,success: function (data, status) {
                        switch (data.status) {
                            case 200:
                                console.log('DataTable Ajax Success!');
                                callback(data);
                                break;

                            case 100002:
                                window.location.href = '/login?backurl=' + window.location.href;
                                break;
                        }
                    }
                    ,error: function(xhr, status, err){
                        console.error('Datatables Request Data Error:', err);
                        toastr.error('Request Data Error:'+err);
                    }
                });
            }
            ,initComplete: function(settings, json) {
                // $('input:checkbox').uniform();
                console.log( 'DataTables has finished its initialisation.' );
            }
            ,drawCallback: function( settings ) {
                // $('input:checkbox').uniform();
                console.log( 'DataTables reRender...' );
            }
        });

        return _me;
    }

    destroy(){
        var _me = this;

        if(_me.table && $.fn.DataTable.isDataTable(_me.tableDomID)){
            _me.table.clear()
                     .destroy();

            console.warn('destroy datatable...');
        }

        return _me;
    }

    componentDidMount() {
        console.log('DataTable mounted...');

        // init table
        this.init();

        // init select2
        // $('.dataTables_length select').select2();

        // init proxy click event
        this.rowOperateProxy();
    }
    
    render() {
        var table_head = [],
            index = 0;
        this.props.tableHead.forEach((e)=>{
            table_head.push(<th key={index++}>{e}</th>);
        });
        return (
            <div>
                <table id="liveList" className="display table table-striped table-bordered table-hover no-footer dataTable" cellSpacing="0" width="100%">
                    <thead>
                        <tr>
                            { table_head }
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }
}

export default DataTable;