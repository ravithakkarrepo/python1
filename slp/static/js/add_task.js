
// // attachment remove function
// function attachment_customRemoveElement(elem, fieldName, fieldId) {
//     console.log('elem-->',elem)
//     console.log('fieldName--->',fieldName,typeof(fieldName))
//     console.log('fieldId--->',fieldId)
//     var elem_siblings = elem.siblings()
//     console.log('ele siblings-->',elem_siblings.eq("1").html())
//     if(fieldName == 'attachment_file'){
//         console.log('inside if custom remove')
//         attachment_exists_file_name = $('#attachment-selected-files').val()
//         console.log('attachment_exists_file_name11',attachment_exists_file_name)
//         tmpExistingFiles = attachment_exists_file_name.split(', ')
//         console.log('tmpExistingFiles11',tmpExistingFiles)

//         var removeItem = elem_siblings.eq("1").html();
//         console.log('removeItem',removeItem)

//         tmpExistingFiles = jQuery.grep(tmpExistingFiles, function(value) {
//           return value != removeItem;
//         });
//         attachment_exists_file_name = tmpExistingFiles.join(', ');
//         $('#attachment-selected-files').val(attachment_exists_file_name);
//         console.log('attachment_exists_file_name-->',attachment_exists_file_name)

//         console.log('attachment length--------', $('.attachment_file').length)
//         for(var i = 0; i < $('.attachment_file').length-1;i++){
//             console.log('in for loop remove-----',i)
//             var attachment_id = $('#'+fieldId)
//             console.log('attachment_id----',attachment_id)
//             var attachment_val = attachment_id.val()
//             console.log('attachment_val----',attachment_val)
//             var splitattachmentVal = attachment_val.split('\\')
//             console.log('splitattachmentVal[i]---',splitattachmentVal)
//             console.log('splitattachmentVal---last---',splitattachmentVal.reverse()[0], typeof(splitattachmentVal.reverse()[0]))
//             console.log('ele siblings-->',elem_siblings.eq("1").html())
//             if(splitattachmentVal.reverse()[0] == elem_siblings.eq("1").html()){
//                 console.log('attachment_id----if',attachment_id)
//                 attachment_id.remove()
//                 elem.parent().parent().remove();
//                 break
//             }
//         }
//     }
// }





// var attachment_exists_file_name = ' '
// var splitExists_file_name;
// var res = false

// function checkFile(id){

//     var selectedFiles = $('#'+id)[0].files;
//     console.log('selectedFiles-->',selectedFiles)
//     selectedFiles_name = selectedFiles[0].name;
//     console.log('selectedFiles_name-->',selectedFiles_name)
//     var splitId = id.split('_')
//     console.log('splitId-----',splitId,splitId[2])
//     // if(splitId[2] >= '3'){
//     //     $('#'+id).val('')
//     //     swal("error","You cannot add more than 3 files","error");
//     //     res = false
//     // }
//     if(splitId[0] == "attachment"){
//         console.log('attachment_exists_file_name-->',attachment_exists_file_name)
//         splitExists_file_name = attachment_exists_file_name.split(', ');
//     }

//     console.log('splitExists_file_name.length--->',splitExists_file_name.length);
//     console.log('splitExists_file_name___________',splitExists_file_name)
//     console.log('selectedFiles_name------------',selectedFiles_name)

//     if(splitExists_file_name.includes(selectedFiles_name)){
//         console.log("if-----")
//         $('#'+id).val('')
//         swal("error","File already exists","error");
//         res = false
//     }else{
//         res = true
//     }
// }

// // attachment  add file

// var c = 0
// var c_inc = 0
// var c_change_n = 0

// function attachmentFile(id) {
//     checkFile(id);
//     if(res)
//     {
//         tmpId = id.split('_');
//         newTmpId = tmpId[tmpId.length - 1];
//         c_inc = newTmpId;
//         c_change_n++
//         // $('#change_n_attachment').val(c_change_n);
//         var attachmentSelectedFiles = $('#'+id)[0].files;
//         var extension = $('#'+id).val().substring($('#'+id).val().lastIndexOf('.') + 1)
//         var allExtension = ['pdf','jpg','png','jpeg']
//         if(attachmentSelectedFiles.length != 0 && !allExtension.includes(extension)){
//             console.log('extension-----',extension)
//             swal("error","Please Choose PDF or JPG or JPEG or PNG File","error")
//         }else{
//             for(i = 0; i < attachmentSelectedFiles.length; i++) {
//                 c++
//                 var attachment_file_ul = $('#attachment_file_ul')
//                 var extensionIcon = '';
//                 if(extension == 'pdf'){
//                     extensionIcon = `<i class="icofont icofont-file-pdf"></i>`
//                 } else {
//                     extensionIcon = `<i class="icofont icofont-ui-image"></i>`
//                 }
//                 var attachment_li_html = `<li><div class="box"><a onclick="attachment_customRemoveElement($(this),'attachment_file','attachment_file_`+(c-1)+`')" class="remove1"><i class="icofont icofont-close"></i></a><div class="icon">`+extensionIcon+`</div><div id="attachment_file_name_` + c + `" class="file_name"></div></div></li>`
//                 attachment_file_ul.append(attachment_li_html)
//                 $('#attachment_file_name_'+c).text(attachmentSelectedFiles[i].name)
//                 var attachmentTmpSelectedFiles = $('#attachment-selected-files').val();
//                 if(attachmentTmpSelectedFiles == '') {
//                     attachmentTmpSelectedFiles = attachmentSelectedFiles[i].name;
//                 } else {
//                     attachmentTmpSelectedFiles += ', '+ attachmentSelectedFiles[i].name;
//                 }
//                 $('#attachment-selected-files').val(attachmentTmpSelectedFiles);
//             }
//             $('#'+id).css('display','none')
//             c_inc++
//             var btn = `<input id="attachment_file_`+c_inc+`" name="attachment_file_`+c_inc+`" type="file" class="custom-file-input attachment_file" onchange="attachmentFile('attachment_file_`+c_inc+`');" accept=".pdf,image/*"><label>Upload</label>`
//             $('#'+id).parent().append(btn)
//         }
//         console.log('ookokok in change',$('#attachment_file_'+$('#change_n').val()));
//         attachment_exists_file_name = $('#attachment-selected-files').val()
//         console.log('attachment_exists_file_name-->',attachment_exists_file_name)
//     }
// }


// // attachment edit file

// var edit_attachment = 0
// var edit_inc_attachment = 0
// var edit_change_n_attachment = 0
// function editattachmentFile(id) {
//     checkFile(id);
//     if(res)
//     {
//         tmpId = id.split('_');
//         newTmpId = tmpId[tmpId.length - 1];
//         edit_inc_attachment = newTmpId;
//         edit_change_n_attachment++
//         $('#change_n_attachment').val(edit_change_n_attachment);
//         var attachmentSelectedFiles = $('#'+id)[0].files;
//         var extension = $('#'+id).val().substring($('#'+id).val().lastIndexOf('.') + 1)
//         var allExtension = ['pdf','jpg','png','jpeg']
//         if(attachmentSelectedFiles.length != 0 && !allExtension.includes(extension)){
//             swal("error","Please Choose PDF or PNG or JPEG or JPG File","error")
//         }
//         else{
//             for(i = 0; i < attachmentSelectedFiles.length; i++) {
//                 edit_attachment++
//                 var extensionIcon = '';
//                 if(extension == 'pdf'){
//                     extensionIcon = `<i class="icofont icofont-file-pdf"></i>`
//                 } else {
//                     extensionIcon = `<i class="icofont icofont-ui-image"></i>`
//                 }
//                 var attachment_file_ul = $('#attachment_file_ul')
//                 var attachment_li_html = `<li><div class="box"><a onclick="attachment_customRemoveElement($(this),'attachment_file','attachment_file_`+edit_inc_attachment+`')" class="remove1"><i class="icofont icofont-close"></i></a><div class="icon">`+extensionIcon+`</div><div id="attachment_file_name_` + edit_attachment + `" class="file_name"></div></div></li>`
                
//                 attachment_file_ul.append(attachment_li_html)
//                 $('#attachment_file_name_'+edit_attachment).text(attachmentSelectedFiles[i].name)
//                 var attachmentTmpSelectedFiles = $('#attachment-selected-files').val();
//                 if(attachmentTmpSelectedFiles == '') {
//                     attachmentTmpSelectedFiles = attachmentSelectedFiles[i].name;
//                 } else {
//                     attachmentTmpSelectedFiles += ', '+ attachmentSelectedFiles[i].name;
//                 }
//                 $('#attachment-selected-files').val(attachmentTmpSelectedFiles);
//             }
//             $('#'+id).css('display','none')
//             edit_inc_attachment++
//             var btn = `<input id="attachment_file_`+edit_inc_attachment+`" name="attachment_file_`+edit_inc_attachment+`" type="file" class="custom-file-input attachment_file" onchange="editattachmentFile('attachment_file_`+edit_inc_attachment+`');" accept=".pdf,image/*"><label>Upload</label>`
//             $('#'+id).parent().append(btn)
//         }
//         console.log('ookokok in change',$('#attachment_file_'+$('#change_n').val()));
//         attachment_exists_file_name = $('#attachment-selected-files').val()
//         console.log('attachment_exists_file_name-->',attachment_exists_file_name)
//     }
// }


// delete task

  
//   function task_delete(url) {
//     console.log('url--',url)
//     const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//           confirmButton: 'btn btn-success',
//           cancelButton: 'btn btn-danger',
//         },
//         buttonsStyling: false
//       })
  
//       swalWithBootstrapButtons.fire({
//           title: 'Are you sure?',
//           text: "You won't be able to revert this!",
//           type: 'warning',
//           showCancelButton: true,
//           confirmButtonText: 'Yes, delete it!',
//           cancelButtonText: 'No, cancel!',
//           reverseButtons: true
//       }).then((result) => { console.log('result--',result.value, result)
//         if (result.value) {
         
//           $.ajax({
//               url:url,
//               // type:'post',
//               data:{
//                   'deleted':true,
//               },
//               success:function(data){
//                   console.log('success delete')
//                    swalWithBootstrapButtons.fire(
//                     'Deleted!',
//                     'Your task has been deleted.',
//                     'success',
//                   )
//                   if($('.swal2-confirm').html() == 'OK') {
//                       $('.swal2-confirm').css('display', 'none');
//                   }
//                    function redirect(){
//                       window.location.href = "{% url 'task_list'  %}";
//                   }
//                   setTimeout(redirect, 2000); //2000 is equivalent to 2 seconds
//               },
              
//           });
//         } 
        
//       })
//   };

