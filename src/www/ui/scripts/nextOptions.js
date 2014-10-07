/***********************************************************
 * Copyright (C) 2014 Siemens AG
 * Author: J.Najjar
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 2 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 ***********************************************************/



function initializeOption(myvalue) {
    var radios  = $("input[name=FileSelection]:radio");
    radios.filter('[value='+myvalue+']').attr('checked',true);


    var uploadId = $('#upload').val();
    var uploadTreeId = $('#lastItem').val();

    setNextPrev(uploadId, uploadTreeId);
}

function setOptionOnChange( name ) {
    setOption(name, $('input[name=FileSelection]:radio:checked').val());

    var uploadId = $('#upload').val();
    var uploadTreeId = $('#lastItem').val();

    setNextPrev(uploadId, uploadTreeId);

}

function setNextPrev(uploadId, uploadTreeId) {
    $.getJSON("?mod=conclude-license&do=setNextPrev&upload=" + uploadId + "&item=" + uploadTreeId)
    .done(function (data) {
            var form =  $('#uiClearingForm');
            var next = $('#next');
            if(data.next !== null) {
                next.show();
                next.click(function () {
                    form.attr('action', data.uri + '&item=' + data.next);
                });
            }
            else  {
                next.hide();
            }
            var prev = $('#prev');
            if(data.prev !== null) {
                prev.show();
                prev.click(function () {
                    form.attr('action', data.uri + '&item=' + data.prev);
                });
            }
            else {
                prev.hide();
            }
        })
        .fail(failed);

}

$(document).ready(function(){
    var theOption = getOption("skipFile");
    if(theOption === "") theOption = "none";
  initializeOption ( theOption);
    $('input[name=FileSelection]:radio').bind('change', function () {
        setOptionOnChange("skipFile");
    });
});