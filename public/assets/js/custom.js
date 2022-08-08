/**
 *
 * You can write your JS code here, DO NOT touch the default style file
 * because it will make it harder for you to update.
 *
 */

"use strict";

const securityKey = '__gogetthat';

/*
|------------------------------------------------------------------------------------------------------------------------------------------
|   PreLoader
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/
var overlay = document.getElementById("overlay");

window.addEventListener('load', function () {
    overlay.style.display = 'none';
})

$(function () {


    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Jquery DataTables
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(".datatable").DataTable({
        "columnDefs": [
            {
                "sortable": false,
                "targets": [0]
            }
        ],
        "processing": true,
        "serverSide": false,
        "stateSave": true,
        "stateDuration": -1,
        "lengthMenu": [10, 25, 50, 100, 500],
        "fnStateSave": function (oSettings, oData) {
            localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
        },
        "fnStateLoad": function (oSettings) {
            var data = localStorage.getItem('DataTables_' + window.location.pathname);
            return JSON.parse(data);
        },
        // "drawCallback": function( settings ) {

        //      document.getElementById('select_all').checked = false;
        // }
    })



    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Jquery upload preview
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(".select2_tags").select2({
        tags: true
    });
    $(".select2_tag").select2({
        tags: true
    });
    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Jquery upload preview
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $.uploadPreview({
        input_field: "#image-upload",   // Default: .image-upload
        preview_box: "#image-preview",  // Default: .image-preview
        label_field: "#image-label",    // Default: .image-label
        label_default: "Choose File",   // Default: Choose File
        label_selected: "Change File",  // Default: Change File
        no_label: false,                // Default: false
        success_callback: null          // Default: null
    });
    $.uploadPreview({
        input_field: "#image-upload2",   // Default: .image-upload
        preview_box: "#image-preview2",  // Default: .image-preview
        label_field: "#image-label2",    // Default: .image-label
        label_default: "Choose File",   // Default: Choose File
        label_selected: "Change File",  // Default: Change File
        no_label: false,                // Default: false
        success_callback: null          // Default: null
    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Check Password Strength on password field
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(".pwstrength").pwstrength();

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   History Back
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('click', '.cancel_btn', function () {
        window.history.back();
    });


    // var descbtn = $('.btn-overflow-description');



    // descbtn.click(function(e) 
    // {
    var ddtext = $('.text-overflow')
    // ddh = ddtext[0].scrollHeight; 
    // console.log("ddh -----------",ddh)
    // if(ddh > 120) {
    //     $('.btn-overflow').addClass('less');
    //     $('.btn-overflow').css('display', 'block');
    // }
    // const checkbox = $(ddtext).find("input[type=checkbox]");
    $.each(ddtext, function (key, val) {
        var ddh = val.scrollHeight;
        if (ddh > 60) {

            console.log(val.id, "ddh -----------", ddh)
            $('.btn-overflow-description-' + val.id).addClass('less');
            $('.btn-overflow-description-' + val.id).css('display', 'block');
        }
    });
    $(document.body).on('click', '.btn-overflow', function (e) {
        console.log($(this).attr('id'))
        var descid = $(this).attr('id'),
            desctext = $('.text-overflow-description-' + descid),
            desch = desctext[0].scrollHeight;
        // alert(descid)
        // if(desch > 120) {
        //     $(this).addClass('less');
        //     $(this).css('display', 'block');
        // }

        e.stopPropagation();

        if ($(this).hasClass('less')) {
            $(this).removeClass('less');
            $(this).addClass('more');
            $(this).text('Show less');
            desctext.animate({ 'height': desch });
        } else {
            $(this).addClass('less');
            $(this).removeClass('more');
            $(this).text('Show more');
            desctext.animate({ 'height': '60px' });
        }
    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   DataTables
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */

    const modelDataTables = {
        'userDataTable': $("#userDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4, 5, 6]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/user/datatable",
                "data": {
                    role: [1, 2]
                }
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'vendorDataTable': $("#vendorDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4, 5, 6]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/user/datatable",
                "data": {
                    role: [3]
                }
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'customerOrderDataTable': $("#customerOrderDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4, 5]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/order/customerOrderDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'sellerOrderDataTable': $("#sellerOrderDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4, 5]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/order/sellerOrderDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'cancellationRequestsDataTable': $("#cancellationRequestsDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4, 5, 6]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/order/cancellationRequestsDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'refundRequestsDataTable': $("#refundRequestsDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4, 5, 6]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/order/refundRequestsDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'withdrawalRequestsDataTable': $("#withdrawalRequestsDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4, 5, 6]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/order/withdrawalRequestsDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'salesReportDataTable': $("#salesReportDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4, 5, 6]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/report/salesReportDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'userReportDataTable': $("#userReportDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/report/userReportDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'sellerReportDataTable': $("#sellerReportDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/report/sellerReportDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'taxReportDataTable': $("#taxReportDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/report/taxReportDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
        'commissionReportDataTable': $("#commissionReportDataTable").DataTable({
            "columnDefs": [
                {
                    "sortable": false,
                    "targets": [0, 1, 2, 3, 4]
                }
            ],
            "processing": true,
            "serverSide": true,
            "stateSave": true,
            "stateDuration": -1,
            "lengthMenu": [10, 25, 50, 100, 500],
            // "ajax": "/admin/userDatatable"
            "ajax": {
                "url": "/admin/report/commissionReportDataTable",
                // "data": function ( d ) {
                //   return $.extend( {}, d, {
                //     "extra_search": $('#extra').val()
                //   } );
                // }
            },
            "fnStateSave": function (oSettings, oData) {
                localStorage.setItem('DataTables_' + window.location.pathname, JSON.stringify(oData));
            },
            "fnStateLoad": function (oSettings) {
                var data = localStorage.getItem('DataTables_' + window.location.pathname);
                return JSON.parse(data);
            }
        }),
    }

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Summernote Editor
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    // if (jQuery().summernote) {
    //     $(".summernote-page").summernote({
    //         dialogsInBody: true,
    //         minHeight: 250,
    //         focus: true,
    //         toolbar: [
    //             ['style', ['bold', 'italic', 'underline', 'clear']],
    //             ['font', ['bold', 'underline', 'clear', 'strikethrough']],
    //             ['fontname', ['fontname']],
    //             ['fontsize', ['fontsize']],
    //             ['para', ['ul', 'ol', 'paragraph']],
    //             ['color', ['color']],
    //             ['table', ['table']],
    //             ['view', [
    //                 // 'fullscreen', 
    //                 'codeview', 'help']]
    //         ]
    //     });
    // }

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Update Page Content Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $("#updateContent").on('click', function () {
        const id = $('#id').val();
        const title = $('#title').val();
        const content = $('.summernote-page').val();

        $.ajax({
            type: 'PUT',
            url: '/admin/page/updatePage',
            headers: {
                'securitykey': securityKey,
            },
            data: {
                id,
                title,
                content
            },
            beforeSend: () => {
                $(this).attr('disabled', 'true');
                $(this).html('Updating');
                $(this).prepend('<i class="fa fa-spinner" style="margin-right: 7px;"></i>');
            },
            success: (response) => {
                setTimeout(() => {
                    $(this).removeAttr('disabled');
                    $(this).find('i').remove();
                    $(this).html('Update');
                    iziToast[response.success ? 'success' : 'error']({
                        title: response.message,
                        // message: '',
                        position: 'topRight'
                    });
                }, 1000);
            }
        });
    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Update Product isApproved Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('click', '.approved_btn', function () {
        let status = $(this).attr('status');
        const id = $(this).attr('model_id');
        const model = $(this).attr('model');

        status = status == 0 ? 1 : 0;
        //alert(securityKey,"securityKey")

        $.ajax({
            type: 'PUT',
            url: '/admin/changeField',
            headers: {
                'securitykey': securityKey,
            },
            data: {
                id,
                model,
                field: 'isApproved',
                fieldValue: status
            },
            beforeSend: () => {
                $(this).attr('disabled', 'true');
                $(this).prepend('<i class="fa fa-spinner" style="margin-right: 7px;"></i>');
            },
            success: (response) => {
                // console.log(response, '=============================>response');return
                setTimeout(() => {
                    $(this).find('i').remove();
                    $(this).removeAttr('disabled');
                    $(this).attr('status', status);

                    if (status == 0) {
                        $(this).html('Pending');
                        $(this).removeClass('btn-outline-success');
                        $(this).addClass('btn-outline-danger');
                    } else {
                        $(this).html('Approved');
                        $(this).removeClass('btn-outline-danger');
                        $(this).addClass('btn-outline-success');
                    }

                    iziToast[response.success ? 'success' : 'error']({
                        title: response.success ? 'Product Approved Successfully.' : response.message,
                        // message: '',
                        position: 'topRight'
                    });

                    window.location.reload();
                }, 500);
            }
        });
    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Update Status Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */



    $(document.body).on('click', '.featured_btn', function () {
        let is_featured = $(this).attr('is_featured');
        const id = $(this).attr('model_id');
        const model = $(this).attr('model');

        is_featured = is_featured == 0 ? 1 : 0;

        $.ajax({
            type: 'PUT',
            url: '/admin/updateFeature',
            headers: {
                'securitykey': securityKey,
            },
            data: {
                id,
                model,
                is_featured
            },
            beforeSend: () => {
                $(this).attr('disabled', 'true');
                $(this).prepend('<i class="fa fa-spinner" style="margin-right: 7px;"></i>');
            },
            success: (response) => {
                console.log(response, '=============================>response');
                setTimeout(() => {
                    $(this).find('i').remove();
                    $(this).removeAttr('disabled');
                    $(this).attr('is_featured', is_featured);

                    if (is_featured == 0) {
                        $(this).html('Non Featured');
                        $(this).removeClass('btn-outline-success');
                        $(this).addClass('btn-outline-danger');
                    } else {
                        $(this).html('Featured');
                        $(this).removeClass('btn-outline-danger');
                        $(this).addClass('btn-outline-success');
                    }

                    iziToast[response.success ? 'success' : 'error']({
                        title: response.message,
                        // message: '',
                        position: 'topRight'
                    });
                }, 500);
            }
        });
    });


    $(document.body).on('click', '.status_btn', function () {
        let status = $(this).attr('status');
        const id = $(this).attr('model_id');
        const model = $(this).attr('model');

        status = status == 0 ? 1 : 0;

        $.ajax({
            type: 'PUT',
            url: '/admin/updateStatus',
            headers: {
                'securitykey': securityKey,
            },
            data: {
                id,
                model,
                status
            },
            beforeSend: () => {
                $(this).attr('disabled', 'true');
                $(this).prepend('<i class="fa fa-spinner" style="margin-right: 7px;"></i>');
            },
            success: (response) => {
                console.log(response, '=============================>response');
                setTimeout(() => {
                    $(this).find('i').remove();
                    $(this).removeAttr('disabled');
                    $(this).attr('status', status);

                    if (status == 0) {
                        $(this).html('Inactive');
                        $(this).removeClass('btn-outline-success');
                        $(this).addClass('btn-outline-danger');
                    } else {
                        $(this).html('Active');
                        $(this).removeClass('btn-outline-danger');
                        $(this).addClass('btn-outline-success');
                    }

                    iziToast[response.success ? 'success' : 'error']({
                        title: response.message,
                        // message: '',
                        position: 'topRight'
                    });
                }, 500);
            }
        });
    });


    $(document.body).on('click', '.status_change', function () {
        let status = $(this).attr('status');
        const id = $(this).attr('model_id');
        const model = $(this).attr('model');

        status = status == 0 ? 1 : 0;

        $.ajax({
            type: 'PUT',
            url: '/admin/order/approvalStatus',
            headers: {
                'securitykey': securityKey,
            },
            data: {
                id,
                model,
                status
            },
            beforeSend: () => {
                $(this).attr('disabled', 'true');
                $(this).prepend('<i class="fa fa-spinner" style="margin-right: 7px;"></i>');
            },
            success: (response) => {
                console.log(response, '=============================>response');
                setTimeout(() => {
                    $(this).find('i').remove();
                    $(this).removeAttr('disabled');
                    $(this).attr('status', status);

                    if (status == 0) {
                        $(this).html('Pending');
                        $(this).removeClass('btn-outline-success');
                        $(this).addClass('btn-outline-danger');
                    } else {
                        $(this).html('Approved');
                        $(this).removeClass('btn-outline-danger');
                        $(this).addClass('btn-outline-success');
                    }

                    iziToast[response.success ? 'success' : 'error']({
                        title: response.message,
                        // message: '',
                        position: 'topRight'
                    });
                }, 500);
            }
        });
    });



    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Delete Module Entry Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('click', '.delete_btn', function () {
        //alert("hello")
        const id = $(this).attr('model_id');
        const model = $(this).attr('model');
        const modelTitle = $(this).attr('model_title');
        const modelDataTable = $(this).attr('datatable');

        // $(this).parents('tr').remove();
        // return;


        // console.log(modelDataTable, '===================>modelDataTable')
        // console.log(userDataTable, '======>userDataTable')
        // console.log(modelDataTable, '======>modelDataTable')
        // console.log(modelDataTables[String(modelDataTable)], '======>modelDataTables[modelDataTable]')
        // console.log(modelDataTables['userDataTable'])

        // console.log(modelDataTables[modelDataTable]
        //     .row( $(this).parents('tr') ), '===================>tr')

        // // table
        // //     .row( $(this).parents('tr') )
        // //     .remove()
        // //     .draw();
        // console.log($(this).parents('tr'), "$(this).parents('tr')");
        //     var row = table.row( $(this).parents('tr') );
        //     // var rowNode = row.node();
        //     row.remove().draw();

        // table2
        //     .row.add( rowNode )
        //     .draw();

        // return;

        if (id && model && modelTitle) {
            swal({
                title: 'Are you sure?',
                text: `You will not be able to recover this ${modelTitle}!`,
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((isConfirm) => {
                console.log(isConfirm, 'isConfirm');
                if (isConfirm) {
                    $.ajax({
                        type: 'DELETE',
                        url: '/admin/delete',
                        headers: {
                            'securitykey': securityKey,
                        },
                        data: {
                            id,
                            model,
                        },
                        beforeSend: () => {
                            $(this).attr('disabled', 'true');
                            $(this).prepend('<i class="fa fa-spinner" style="margin-right: 7px;"></i>');
                        },
                        success: (response) => {
                            console.log(response, '=============================>response');
                            setTimeout(() => {
                                swal({
                                    title: "Deleted!",
                                    text: `${modelTitle} has been deleted.`,
                                    icon: "success",
                                    timer: '1000',
                                    buttons: false,
                                });

                                $(this).find('i').remove();
                                $(this).removeAttr('disabled');

                                $(this).parents('tr').remove();
                                $(this).closest('div.show_image').remove();

                                setTimeout(() => window.location.reload(), 1000);

                                // modelDataTables[modelDataTable]
                                // .row( $(this).parents('tr') )
                                // .remove()
                                // .draw();

                                // iziToast[response.success ? 'success' : 'error']({
                                //     title: response.message,
                                //     // message: '',
                                //     position: 'topRight'
                                // }); 
                            }, 500);
                        }
                    });

                } else {
                    // swal("Cancelled", `${item} is safe !`, "error");
                    swal({
                        title: "Cancelled",
                        text: `${modelTitle} is safe !`,
                        icon: "error",
                        timer: '1000',
                        buttons: false,
                    });
                }
            });
        }


    });


    /*
|------------------------------------------------------------------------------------------------------------------------------------------
|   Disable Module Entry Ajax
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/
    $(document.body).on('click', '.disable_btn', function () {
        //alert("hello")
        const id = $(this).attr('model_id');
        const model = $(this).attr('model');
        const modelTitle = $(this).attr('model_title');
        const modelDataTable = $(this).attr('datatable');



        if (id && model && modelTitle) {
            swal({
                title: 'Are you sure?',
                text: `You will not be able to recover this ${modelTitle}!`,
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((isConfirm) => {
                console.log(isConfirm, 'isConfirm');
                if (isConfirm) {
                    $.ajax({
                        type: 'POST',
                        url: '/sellerAdmin/disable',
                        headers: {
                            'securitykey': securityKey,
                        },
                        data: {
                            id,
                            model,
                        },
                        beforeSend: () => {
                            $(this).attr('disabled', 'true');
                            $(this).prepend('<i class="fa fa-spinner" style="margin-right: 7px;"></i>');
                        },
                        success: (response) => {
                            console.log(response, '=============================>response');
                            setTimeout(() => {
                                swal({
                                    title: "Deleted!",
                                    text: `${modelTitle} has been deleted.`,
                                    icon: "success",
                                    timer: '1000',
                                    buttons: false,
                                });

                                $(this).find('i').remove();
                                $(this).removeAttr('disabled');

                                $(this).parents('tr').remove();
                                $(this).closest('div.show_image').remove();

                                setTimeout(() => window.location.reload(), 1000);


                            }, 500);
                        }
                    });

                } else {
                    // swal("Cancelled", `${item} is safe !`, "error");
                    swal({
                        title: "Cancelled",
                        text: `${modelTitle} is safe !`,
                        icon: "error",
                        timer: '1000',
                        buttons: false,
                    });
                }
            });
        }


    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Logout Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('click', '.logout_btn', function (e) {
        e.preventDefault();
        swal({
            title: 'Are you sure?',
            text: `Do you really want to logout!`,
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((isConfirm) => {
            console.log(isConfirm, 'isConfirm');
            if (isConfirm) {
                $('#hidden_logout')[0].click();
                console.log($('#hidden_logout'));
            } else {
                swal({
                    title: "Cancelled",
                    text: `You have prevented logout !`,
                    icon: "error",
                    timer: '1000',
                    buttons: false,
                });
            }
        });


    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Dashboard Counters
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    const dashbordCounter = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 400; // The higer the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.getAttribute('current-count');

                // Lower inc to slow and higher to slow
                const inc = target / speed;

                // console.log(inc);
                // console.log(count);

                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.setAttribute('current-count', count + inc);
                    // console.log(count + inc)
                    counter.innerText = Math.round(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    }
    dashbordCounter();

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Change Order Status
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('change', '.changeOrderRequestStatus', function () {
        const _this = $(this);

        const id = $(this).attr('model_id');
        const model = $(this).attr('model');
        const modelTitle = $(this).attr('model_title');
        const modelOrderId = $(this).attr('model_order_id');
        const field = $(this).attr('field');
        const fieldValue = $(this).val();
        const currentValue = $(this).attr('current_value');
        const modelDataTable = $(this).attr('datatable');
        const statusText = $("option:selected", this).text();
        if (id && model && modelTitle) {
            if (['orderRefundRequest', 'orderCancellationRequest', 'orderWithdrawalRequest'].includes(model) && [2].includes(parseInt(fieldValue))) {
                // if ([2].includes(parseInt(fieldValue))) {
                swal({
                    text: 'Enter Reason',
                    content: "input",
                    button: {
                        text: "Submit",
                        closeModal: false,
                    },
                })
                    .then(reason => {
                        if (!reason) {
                            var select = this;
                            select.addEventListener('change', function () {

                            });
                            select.value = currentValue;
                            select.dispatchEvent(new Event('change'));

                            const color = $('option:selected', this).css('background-color');
                            $(this).css('background-color', color);
                            throw null;
                        }

                        $.ajax({
                            type: 'PUT',
                            url: '/admin/changeField',
                            headers: {
                                'securitykey': securityKey,
                            },
                            data: {
                                id,
                                model,
                                field: 'comments',
                                fieldValue: reason,
                            },
                            beforeSend: () => {

                            },
                            success: (responseReason) => {
                                console.log(responseReason, '=============================>responseReason');

                                $.ajax({
                                    type: 'PUT',
                                    url: '/admin/changeField',
                                    headers: {
                                        'securitykey': securityKey,
                                    },
                                    data: {
                                        id,
                                        model,
                                        field,
                                        fieldValue,
                                    },
                                    beforeSend: () => {

                                    },
                                    success: (response) => {
                                        console.log(response, '=============================>response');
                                        swal("Success!", `${modelTitle} Approval status changed to ${statusText}`, "success");
                                        setTimeout(() => {
                                            const color = $('option:selected', this).css('background-color');
                                            $(this).css('background-color', color);

                                            $(this).attr('current_value', fieldValue);

                                            iziToast[response.success ? 'success' : 'error']({
                                                // title: response.message,
                                                title: `${modelTitle} status changed to ${statusText}`,
                                                // message: '',
                                                position: 'topRight'
                                            });
                                            // setTimeout(() => window.location.reload(), 2000);

                                        }, 500);
                                        setTimeout(function () {
                                            window.location.reload(1);
                                        }, 2000);
                                    }
                                });

                            }
                        });

                    })
                    .catch(err => {
                        if (err) {
                            swal("Oh noes!", "The AJAX request failed!", "error");
                        } else {
                            swal.stopLoading();
                            swal.close();
                        }
                    });
                // }
            } else {

                $.ajax({
                    type: 'PUT',
                    url: '/admin/changeField',
                    headers: {
                        'securitykey': securityKey,
                    },
                    data: {
                        id,
                        model,
                        field,
                        fieldValue,
                        modelTitle,
                        statusText,
                    },
                    beforeSend: () => {

                    },
                    success: (response) => {
                        console.log(response, '=============================>response');
                        setTimeout(() => {
                            const color = $('option:selected', this).css('background-color');
                            $(this).css('background-color', color);

                            $(this).attr('current_value', fieldValue);

                            iziToast[response.success ? 'success' : 'error']({
                                // title: response.message,
                                title: `${modelTitle} status changed to ${statusText}`,
                                // message: '',
                                position: 'topRight'
                            });
                        }, 500);
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 2000);
                    }
                });
            }
            var modelData = 'order'
            var fieldData = 'is_withdrawn_by_vendor';
            var fieldValueData = (fieldValue == "1") ? "2" : "3"
            $.ajax({
                type: 'PUT',
                url: '/admin/changeField',
                headers: {
                    'securitykey': securityKey,
                },
                data: {
                    id: modelOrderId,
                    model: modelData,
                    field: fieldData,
                    fieldValue: fieldValueData,
                },
                beforeSend: () => { },
                success: (responseData) => { }
            });
        }
    });
    /*
    |---------------------------------------------------------------------------------------------------------------------------------
    |   Change Vendor Approval Status
    |---------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('change', '.changeVendorApprovalStatus', function () {
        const modelId = $(this).attr('model_id');
        const id = $(this).attr('model_detail_id');
        const model = $(this).attr('model');
        const modelTitle = $(this).attr('model_title');
        const field = $(this).attr('field');
        const currentValue = $(this).attr('current_value');
        const fieldValue = $(this).val();
        const modelDataTable = $(this).attr('datatable');
        const statusText = $("option:selected", this).text();
        console.log(statusText, '============>statusText');

        if (id && model && modelTitle) {

            if (![0, 2].includes(parseInt(fieldValue))) {

                swal({
                    text: 'Enter Reason',
                    content: "input",
                    button: {
                        text: "Submit",
                        closeModal: false,
                    },
                })
                    .then(reason => {
                        if (!reason) {
                            var select = this;
                            select.addEventListener('change', function () {

                            });
                            select.value = currentValue;
                            select.dispatchEvent(new Event('change'));

                            const color = $('option:selected', this).css('background-color');
                            $(this).css('background-color', color);
                            throw null;
                        }

                        if ([0, 1].includes(parseInt(fieldValue))) {
                            $.ajax({
                                type: 'PUT',
                                url: '/admin/changeField',
                                headers: {
                                    'securitykey': securityKey,
                                },
                                data: {
                                    id: modelId,
                                    model: 'user',
                                    field: 'status',
                                    fieldValue: 0,
                                },
                                beforeSend: () => {

                                },
                            });
                        }

                        $.ajax({
                            type: 'PUT',
                            url: '/admin/changeField',
                            headers: {
                                'securitykey': securityKey,
                            },
                            data: {
                                id,
                                model,
                                field: 'approvalStatusReason',
                                fieldValue: reason,
                            },
                            beforeSend: () => {

                            },
                            success: (responseReason) => {
                                console.log(responseReason, '=============================>responseReason');

                                $.ajax({
                                    type: 'PUT',
                                    url: '/admin/changeField',
                                    headers: {
                                        'securitykey': securityKey,
                                    },
                                    data: {
                                        id,
                                        model,
                                        field,
                                        fieldValue,
                                    },
                                    beforeSend: () => {

                                    },
                                    success: (response) => {
                                        console.log(response, '=============================>response');
                                        swal("Success!", `${modelTitle} Approval status changed to ${statusText}`, "success");
                                        setTimeout(() => {
                                            const color = $('option:selected', this).css('background-color');
                                            $(this).css('background-color', color);

                                            iziToast[response.success ? 'success' : 'error']({
                                                // title: response.message,
                                                title: `${modelTitle} Approval status changed to ${statusText}`,
                                                // message: '',
                                                position: 'topRight'
                                            });

                                            // setTimeout(() => window.location.reload(), 2000);
                                        }, 500);
                                        setTimeout(function () {
                                            window.location.reload(1);
                                        }, 2000);
                                    }
                                });

                            }
                        });

                    })
                    .catch(err => {
                        if (err) {
                            swal("Oh noes!", "The AJAX request failed!", "error");
                        } else {
                            swal.stopLoading();
                            swal.close();
                        }
                    });
            } else {
                if ([0, 1].includes(parseInt(fieldValue))) {
                    $.ajax({
                        type: 'PUT',
                        url: '/admin/changeField',
                        headers: {
                            'securitykey': securityKey,
                        },
                        data: {
                            id: modelId,
                            model: 'user',
                            field: 'status',
                            fieldValue: 0,
                        },
                        beforeSend: () => {

                        },
                    });
                }

                $.ajax({
                    type: 'PUT',
                    url: '/admin/changeField',
                    headers: {
                        'securitykey': securityKey,
                    },
                    data: {
                        id,
                        model,
                        field,
                        fieldValue,
                    },
                    beforeSend: () => {

                    },
                    success: (response) => {
                        console.log(response, '=============================>response');
                        setTimeout(() => {
                            const color = $('option:selected', this).css('background-color');
                            $(this).css('background-color', color);

                            iziToast[response.success ? 'success' : 'error']({
                                // title: response.message,
                                title: `${modelTitle} Approval status changed to ${statusText}`,
                                // message: '',
                                position: 'topRight'
                            });

                            // setTimeout(() => window.location.reload(), 2000);
                        }, 500);
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 2000);
                    }
                });
            }
        }


    });
    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Profile Setting Form Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('submit', '#profile_setting_from', function (e) {

        e.preventDefault();
        let formData = new FormData($(this)[0]);

        $.ajax({
            url: '/admin/user/addUpdateUser',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (response) {
                window.location.reload();

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });

    $(document.body).on('submit', '.profile_setting_from', function (e) {
        e.preventDefault();
        let formData = new FormData($(this)[0]);

        $.ajax({
            url: '/sellerAdmin/user/updateUser',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (response) {
                window.location.reload();

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });

    $(document.body).on('submit', '#changePasswordSettingForm', function (e) {
        e.preventDefault();
        let formData = new FormData($(this)[0]);

        $.ajax({
            url: '/sellerAdmin/user/changePasswordSetting',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (response) {
                console.log(response, '========>response');
                if (response.success) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });

    $(document.body).on('submit', '#changeEmailSettingForm', function (e) {
        e.preventDefault();
        let formData = new FormData($(this)[0]);

        $.ajax({
            url: '/sellerAdmin/user/changeEmailSetting',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (response) {
                console.log(response, '========>response');
                if (response.success) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });

    $(document.body).on('submit', '.globalDeliveryChargeForSeller', function (e) {
        e.preventDefault();
        let formData = new FormData($(this)[0]);

        $.ajax({
            url: '/sellerAdmin/setting/updateSettings',
            data: formData,
            processData: false,
            contentType: false,
            type: 'PUT',
            success: function (response) {
                console.log(response, '========>response');
                if (response.success) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });
    $(document.body).on('submit', '.productTax', function (e) {
        e.preventDefault();
        let formData = new FormData($(this)[0]);

        $.ajax({
            url: '/sellerAdmin/setting/updateSettings',
            data: formData,
            processData: false,
            contentType: false,
            type: 'PUT',
            success: function (response) {
                console.log(response, '========>response');
                if (response.success) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });

    $(document.body).on('submit', '.globalDeliveryChargeForDeliveryStaff', function (e) {
        e.preventDefault();
        let formData = new FormData($(this)[0]);

        $.ajax({
            url: '/sellerAdmin/setting/updateSettings',
            data: formData,
            processData: false,
            contentType: false,
            type: 'PUT',
            success: function (response) {
                console.log(response, '========>response');
                if (response.success) {
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });
    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Universal Form for Settings Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('submit', '.updateSettings', function (e) {
        // alert('here')
        e.preventDefault();
        let formData = new FormData($(this)[0]);
        const checkbox = $($(this)[0]).find("input[type=checkbox]");
        $.each(checkbox, function (key, val) {
            formData.set($(val).attr('name'), formData.has($(val).attr('name')) ? '1' : '0');
        });
        // console.log(formData, '[==========================formada');return

        $.ajax({
            url: '/admin/setting/updateSettings',
            data: formData,
            processData: false,
            contentType: false,
            type: 'post',
            success: function (response) {

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });
    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Form for Site Comission Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('submit', '.updateSiteComission', function (e) {
        e.preventDefault();
        let formData = new FormData($(this)[0]);

        $.ajax({
            url: '/admin/setting/updateSiteComission',
            data: formData,
            processData: false,
            contentType: false,
            type: 'PUT',
            success: function (response) {

                iziToast[response.success ? 'success' : 'error']({
                    title: response.message,
                    position: 'topRight'
                });
            }
        });
    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Category Based SubCategory in Product module Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('change', '#productCategorySelect', function () {
        const categoryId = $(this).val();

        console.log(categoryId, '=====>categoryId');

        $.ajax({
            url: '/sellerAdmin/product/productCategorySelect',
            data: {
                categoryId: categoryId
            },
            type: 'POST',
            success: function (response) {
                $('.subCategoryContainer').html(response.body);
                $(".select2").select2();
            }
        });
    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |   Date Range Picker
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $('.daterange-picker').daterangepicker({
        autoUpdateInput: false,
        locale: {
            format: 'YYYY-MM-DD',
            cancelLabel: 'Clear',
        },
        maxDate: moment().format('YYYY-MM-DD'),
        drops: 'down',
        opens: 'right'
    });
    $('.daterange-picker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));

        /*
        |------------------------------------------------------------------------------------------------------
        |   For Report Filter
        |------------------------------------------------------------------------------------------------------
        |
        */
        if ($(this).hasClass('filter_report')) {

            const value = $(this).val();
            const reportsModule = $(this).attr('module_name');
            const prefix = $(this).attr('prefix');

            let [from, to] = value.split(' - ').map(date => date.trim());
            console.log(from, '============>from');
            console.log(to, '============>to');

            window.location.replace(`/${prefix ? prefix : 'admin'}/report/${reportsModule}?from=${from}&to=${to}`);
        }
        /*
        |------------------------------------------------------------------------------------------------------
        */

    });
    $('.daterange-picker').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    $('.daterange-btn').daterangepicker({
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate: moment()
    }, function (start, end) {
        $('.daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    });

    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    | Reports Filter Ajax
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    // $(document.body).on('change', '.filter_report', function () {
    //     console.log('here');
    //     const value = $(this).val();
    //     const reportsModule = $(this).attr('module_name');

    //     let [from, to] = value.split(' - ').map(date => date.trim());
    //     console.log(from, '============>from');
    //     console.log(to, '============>to');

    //     window.location.replace(`/admin/report/${reportsModule}?from=${from}&to=${to}`);
    // });


    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    | Admin Commission rows
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */




    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    | Add Product Specification
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('click', '.add_product_specification', function () {
        let html = ``;

        html += `<div class="row single_row_container">
                 <div class="col-5 col-md-5 col-lg-5">
                     <div class="form-group">
                     <label>&nbsp;</label>
 
                     <div class="input-group">
                     <!-- <div class="input-group-prepend">
                         <div class="input-group-text">
                             <i class="fas fa-signature"></i>
                         </div>
                         </div> -->
                         <input type="text" class="form-control" name="specificationName"
                         value=""
                         required>
                     </div>
                     </div>
                 </div>
                 <div class="col-5 col-md-5 col-lg-5">
                     <label>&nbsp;</label>
                     <div class="form-group">
                     <div class="input-group">
                     <!--
                         <div class="input-group-prepend">
                         <div class="input-group-text">
                             <i class="fas fa-signature"></i>
                         </div>
                         </div>
                         -->
                         <input type="text" class="form-control" name="speecificationValue"
                         value=""
                         required>
                     </div>
                     </div>
                 </div>
                 <div class="col-2 col-md-2 col-lg-2">
                     <label>&nbsp;</label>
                     <div class="form-group">
                         <a href="javascript:void(0)" class="btn btn-icon btn-danger delete_product_specification_row"><i class="fas fa-times"></i></a>
                     </div>
                 </div>
                 </div>
             `;

        $('.product_specification_container').append(html);
    });

    $(document.body).on('click', '.delete_product_specification_row', function (e) {
        e.preventDefault;
        $(this).closest('div.single_row_container').remove();
    });



    /*
    |------------------------------------------------------------------------------------------------------------------------------------------
    |  importProductExcel
    |------------------------------------------------------------------------------------------------------------------------------------------
    |
    */
    $(document.body).on('click', '.importProductExcel', function (e) {
        e.preventDefault();

        var fileupload = $("#FileUpload");
        fileupload.click();
        fileupload.change(function () {
            console.log($(this));
            // var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
            // filePath.html("<b>Selected File: </b>" + fileName);

            var formData = new FormData();
            formData.append('file', this.files[0]);

            $.ajax({
                url: '/admin/product/productListingImport',
                type: 'post',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function () {
                    // alert("Products imported successfully")

                    swal({
                        title: "Imported!",
                        text: `Products imported successfully.`,
                        icon: "success",
                        timer: '1000',
                        buttons: false,
                    });
                }
            });
        });
    });

    $(document.body).on('click', '.importProductImages', function (e) {
        e.preventDefault();

        var fileupload = $("#FileUploadMultiple");
        fileupload.click();
        fileupload.change(function () {
            console.log($(this));
            // var fileName = $(this).val().split('\\')[$(this).val().split('\\').length - 1];
            // filePath.html("<b>Selected File: </b>" + fileName);

            var formData = new FormData();
            // formData.append('files', this.files[0]);

            // for (var i = 0; i < this.files.length; i++) {
            // }

            var ins = document.getElementById('FileUploadMultiple').files.length;
            for (var x = 0; x < ins; x++) {
                formData.append("images", document.getElementById('FileUploadMultiple').files[x]);
            }
            // formData.append('images', this.files);

            $.ajax({
                url: '/admin/product/importProductImages',
                type: 'post',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function () {
                    // alert("Products imported successfully")

                    swal({
                        title: "Imported!",
                        text: `Product images imported successfully.`,
                        icon: "success",
                        timer: '1000',
                        buttons: false,
                    });
                }
            });
        });
    });

});


/*
|------------------------------------------------------------------------------------------------------------------------------------------
|   Import Export Products
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/

$(document.body).on('click', '.excel_export_product_admin', function () {
    $.ajax({
        type: 'POST',
        url: '/admin/product/productListingExport',
        headers: {
            'securitykey': '__ongo',
            // 'securitykey': securityKey,
        },
        data: {
            vendorId: 0
        },
        beforeSend: () => {
            $(this).attr('disabled', 'true');
            $(this).prepend('<i class="fa fa-spinner" style="margin-right: 7px;"></i>');
        },
        success: (response) => {
            console.log(response, '=============================>response');

            if (!(Array.isArray(response.body) && response.body.length > 0)) {
                return;
            }

            const data = response.body.map(product => {
                return {
                    _: '',
                    categoryId: product.categoryId,
                    name: product.name,
                    description: product.description,
                    image: product.image,
                    barcode: product.barcode,
                    brandName: product.brandName,
                    mrp: product.mrp,
                    percentageDiscount: product.percentageDiscount,
                    length: product.length,
                    width: product.width,
                    height: product.height,
                    dimensionsUnit: product.dimensionsUnit,
                    weight: product.weight,
                    weightUnit: product.weightUnit,
                };
            });

            const fileName = 'products_export';
            const exportType = 'csv';;

            window.exportFromJSON({ data, fileName, exportType })

            setTimeout(() => {
                swal({
                    title: "Exported!",
                    text: `File exported successfully.`,
                    icon: "success",
                    timer: '1000',
                    buttons: false,
                });

                $(this).find('i').remove();
                $(this).removeAttr('disabled');


            }, 500);
        }
    });
});



/*
|------------------------------------------------------------------------------------------------------------------------------------------
| Pop Image Modal
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/

$(function () {
    $('.pop_image_button').on('click', function () {
        // alert('here');
        var img = $(this).parent().find('img.image-preview').attr('src');
        // var img = $(this).closest('img.image-preview').attr('src');
        // console.log($(this), '================>img');
        // console.log(img, '================>img');
        $('.image_preview_modal').attr('src', img);
        $('#imagemodal').modal('show');
    });
});
/*
|------------------------------------------------------------------------------------------------------------------------------------------
| Multiple Image Preview
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/

var imagesPreview = function (input, placeToInsertImagePreview) {

    console.log(input.files, '============+>input.files');

    if (input.files) {
        var filesAmount = input.files.length;

        const row = $($.parseHTML('<div>')).addClass('row').appendTo(placeToInsertImagePreview);
        for (var i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = function (event) {
                const div = $($.parseHTML('<div>')).addClass('col-4').appendTo(row);
                $($.parseHTML('<img>')).attr('src', event.target.result).addClass('image-preview mb-4').appendTo(div);
            }

            reader.readAsDataURL(input.files[i]);
        }
    }

};

$('.multiple_image_upload').on('change', function () {
    const placeToInsert = "div.gallery";

    $(placeToInsert).html('');

    imagesPreview(this, placeToInsert);
});


/*
|------------------------------------------------------------------------------------------------------------------------------------------
| 
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/
$(document.body).on('change', '.categorySelectBox', function () {
    const id = $(this).val();

    $.ajax({
        type: 'POST',
        url: '/admin/category/categoryBasedChildCategories',
        headers: {
            'securitykey': securityKey,
        },
        data: {
            id
        },
        beforeSend: () => {
            $(this).attr('disabled', 'true');
        },
        success: (response) => {
            console.log(response, '==============>response');
            if (!response.success) return;

            const categories = response.body;
            $(this).closest('.form-group').nextAll().remove();

            let html = '';
            if (categories.length > 0) {

                html += '<img class="nextIcon" src="/uploads/default/next_icon.png" />';

                html += `<div class="form-group col-3" style="float: left;">
                         <label>&nbsp;</label>
                           <div class="input-group">
            
                             <select name="categoryId" class="form-control categorySelectBox" size="5" required>`;
                categories.forEach(category => {
                    html += `<option value="${category.id}">${category.name}</option>`;
                });
                html += `</select>
                   </div>
                 </div>
           `;

            } else {
                // html += `<button type="submit" class="btn btn-primary">Submit</button>`;
                html += `<div class="form-group col-3 centerProductCatItem">
                         <label>&nbsp;</label>
                           <div class="input-group">
                             <button type="submit" class="btn btn-primary">Submit</button>
                             
                   </div>
                 </div>
           `;
            }

            $('.categorySelectBoxContainer').append(html);

            setTimeout(() => {
                $(this).removeAttr('disabled');

            }, 100);
        }
    });
});

$(document.body).on('submit', '#selectProductCategory', function (e) {
    e.preventDefault();
    // let formData = new FormData($(this)[0]);
    // console.log(formData, '==============>formData');

    $(this).addClass('hidden');

    const categoryId = $('.categorySelectBox').last().val();

    // alert(categoryId);
    $('#categoryId').val(categoryId);
    // $(".select2").select2();
    $(".select2_tag").select2({
        tags: true
    });
    // $(".select2_tags").select2({
    //   tags: true
    // });

    $('#productAddEditForm').removeClass('hidden');

    // $.ajax({
    //     url: '/sellerAdmin/user/changeEmailSetting',
    //     data: formData,
    //     processData: false,
    //     contentType: false,
    //     type: 'POST',
    //     success: function (response) {
    //         console.log(response, '========>response');
    //         if (response.success) {
    //             setTimeout(function () {
    //                 window.location.reload();
    //             }, 1000);
    //         }

    //         iziToast[response.success ? 'success' : 'error']({
    //             title: response.message,
    //             position: 'topRight'
    //         });
    //     }
    // });



});






// $.validator.addMethod("pwcheck",
//     function (value, element) {
//         return /^$|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value);
//     }
// );

$.validator.addMethod("validEmail",
    function (value, element) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
    },
    "Please enter valid email."
);

$.validator.addMethod("validPhone",
    function (value, element) {
        return /^[0-9]{10,14}$/.test(value);
    },
    "Please enter valid phone number."
);

// $.validator.addMethod("validUsername",
//     function (value, element) {
//         return /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(value);
//     },
//     "Please enter valid username."
// );

$.validator.addMethod("alphaOnly", function (value, element) {
    return this.optional(element) || /^[a-zA-Z ]+$/.test(value);
}, 'Alphabets only.');

$.validator.addMethod("alphanumeric", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9 ]+$/.test(value);
}, 'Alphanumber characters only.');

$.validator.addMethod('strongLat', function (value, element) {
    return /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(value);
}, 'Latitude format has error\'.');

$.validator.addMethod('strongLng', function (value, element) {
    return /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(value);
}, 'Latitude format has error\'.');

/*
|------------------------------------------------------------------------------------------------------------------------------------------
|   User AddEdit Validation
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/

$('#userAddEditForm').validate({
    rules: {
        role: {
            required: true,
        },
        name: {
            required: true,
            alphaOnly: true,
        },
        email: {
            required: true,
            email: false,
            validEmail: true,
            remote: {
                url: "/admin/user/checkEmail",
                type: "POST",
                data: {
                    email: function () {
                        return $("#input_email").val();
                    },
                    id: function () {
                        return $("#input_id").val();
                    },
                    role: function () {
                        console.log($("#input_role").val());
                        return $("#input_role").val();
                    },
                },
                dataFilter: function (data) {
                    let json = JSON.parse(data);
                    const valid = json.valid;
                    const message = json.message;

                    if (valid) {
                        return valid;
                    } else {
                        return "\"" + message + "\"";
                    }
                }
            }
        },
        ...(
            $("#input_role").val() == 3
                ? {
                    username: {
                        required: true,
                        // validUsername: true,
                        alphanumeric: true,
                        minlength: 8,
                        remote: {
                            url: "/admin/user/checkUsername",
                            type: "POST",
                            data: {
                                email: function () {
                                    return $("#input_username").val();
                                },
                                id: function () {
                                    return $("#input_id").val();
                                },
                                role: function () {
                                    console.log($("#input_role").val());
                                    return $("#input_role").val();
                                },
                            },
                            dataFilter: function (data) {
                                let json = JSON.parse(data);
                                const valid = json.valid;
                                const message = json.message;

                                if (valid) {
                                    return valid;
                                } else {
                                    return "\"" + message + "\"";
                                }
                            }
                        }
                    },
                } : {}
        ),
        phone: {
            required: false,
            validPhone: true,
            minlength: 10,
            remote: {
                url: "/admin/user/checkPhone",
                type: "POST",
                data: {
                    phone: function () {
                        return $("#input_phone").val();
                    },
                    id: function () {
                        return $("#input_id").val();
                    },
                    role: function () {
                        console.log($("#input_role").val());
                        return $("#input_role").val();
                    },
                },
                dataFilter: function (data) {
                    let json = JSON.parse(data);
                    const valid = json.valid;
                    const message = json.message;

                    if (valid) {
                        return valid;
                    } else {
                        return "\"" + message + "\"";
                    }
                }
            }
        },
        password: {
            required: function () {
                return !$("#input_id").val();
            }//,
            //pwcheck: true
        },
        // confirm_password: {
        //     equalTo: "#input_password"
        // },
    },
    messages: {
        role: {
            required: 'Name is required.',
            // remote: 'An account with this username already exists, Kindly use another.'
        },
        name: {
            required: 'Name is required.',
            // remote: 'An account with this username already exists, Kindly use another.'
        },
        email: {
            required: 'Email is required.',
            // remote: 'An account with this email already exists, Kindly use another.'
        },
        ...(
            $("#input_role").val() == 3
                ? {
                    username: {
                        required: 'Username is required.',
                        // remote: 'An account with this username already exists, Kindly use another.'
                    }
                } : {}
        ),
        phone: {
            required: 'Phone is required.',
            minlength: 'Phone should be minimum 10 characters long.'
            // remote: 'An account with this phone already exists, Kindly use another.'
        },
        password: {
            required: 'Password is required.'//,
            //pwcheck: 'Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, at least one special character and must be eight characters or longer.'
        },
        //     confirm_password: {
        //         required: 'Confirm Password is required.'
        //     },
    },
    highlight: function (input) {
        $(input).parents('.form-line').addClass('error');
    },
    unhighlight: function (input) {
        $(input).parents('.form-line').removeClass('error');
    },
    errorPlacement: function (error, element) {
        $(element).parents('.form-group').append(error);
    },
});


$('#withdrawRequest').validate({
    rules: {
        BankId: {
            required: true,
            min: 1
        }
    },
    messages: {
        amount: {
            required: "Amount is required",
            min: "Amount must be greater than 0"
        },
        BankId: {
            required: "First Enter a Bank Detail"
        }

    },
    highlight: function (input) {
        $(input).parents('.form-line').addClass('error');
    },
    unhighlight: function (input) {
        $(input).parents('.form-line').removeClass('error');
    },
    errorPlacement: function (error, element) {
        $(element).parents('.form-group').append(error);
    },
});



// $('#productAddEditForm').validate({
//     rules: {
//         mrp: {
//             required: true,
//         }
//     },
//     messages: {
//         mrp: {
//             required: 'Role is required.',
//             // remote: 'An account with this username already exists, Kindly use another.'
//         }
//     },
//     highlight: function (input) {
//         $(input).parents('.form-line').addClass('error');
//     },
//     unhighlight: function (input) {
//         $(input).parents('.form-line').removeClass('error');
//     },
//     errorPlacement: function (error, element) {
//         $(element).parents('.form-group').append(error);
//     },
// });

/*
|------------------------------------------------------------------------------------------------------------------------------------------
|   Seller Withdrawal Request
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/
$(document.body).on('click', '.request_withdrawal_button', function (e) {
    e.preventDefault();

    swal({
        text: 'Enter amount to withdraw.',
        content: "input",
        button: {
            text: "Search!",
            closeModal: false,
        },
    })
        .then(name => {
            if (!name) throw null;

            return fetch(`https://itunes.apple.com/search?term=${name}&entity=movie`);
        })
        .then(results => {
            return results.json();
        })
        .then(json => {
            const movie = json.results[0];

            if (!movie) {
                return swal("No movie was found!");
            }

            const name = movie.trackName;
            const imageURL = movie.artworkUrl100;

            swal({
                title: "Top result:",
                text: name,
                icon: imageURL,
            });
        })
        .catch(err => {
            if (err) {
                swal("Oh noes!", "The AJAX request failed!", "error");
            } else {
                swal.stopLoading();
                swal.close();
            }
        });
});

jQuery.validator.addMethod("noSpace", function(value, element) { 
    return value == '' || value.trim().length != 0;  
  }, "No space please and don't leave it empty");

$('#signupForm').validate({
    rules: {
        name: {
            required: true,
            noSpace:true
        },
        email: {
            required: true,
        },
        password: {
            required: true,
            minlength: 5,

        },
        confirmPassword: {
            required: true,
            minlength: 5,
            equalTo: "#password"
        },
        company: {
            required: true,
        },
        businessNumber: {
            required: true,
        }, businessCNumber: {
            required: true,
        }, buisnessAddress: {
            required: true,
        }, verificationId: {
            required: true,
        }
    },
    messages: {
        name: {
            required: 'Name is required.',
            // remote: 'An account with this username already exists, Kindly use another.'
        },
        email: {
            required: 'Email is required.',
        },
        password: {
            required: 'Password is required.'//,
            //pwcheck: 'Password must contain at least 1 lowercase alphabetical character, 1 uppercase alphabetical character, 1 numeric character, at least one special character and must be eight characters or longer.'
        },
        confirmPassword: {
            required: 'Confirm Password is required.'
        }
    },
    highlight: function (input) {
        $(input).parents('.form-line').addClass('error');
    },
    unhighlight: function (input) {
        $(input).parents('.form-line').removeClass('error');
    },
    errorPlacement: function (error, element) {
        $(element).parents('.form-group').append(error);
    },
});

/*
|------------------------------------------------------------------------------------------------------------------------------------------
|
|------------------------------------------------------------------------------------------------------------------------------------------
|
*/

