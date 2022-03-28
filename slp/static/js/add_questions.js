var maxField = 25; //Input fields increment limitation
var q_a = 1;

function add_question(){
if(q_a <= maxField && $('.ques-one').length < maxField){ 
q_a++;
var op = 1
var question_html = ` <div class="ques-one">
<div class="row">
<div class="col-xl-12 col-lg-12 col-sm-12">
<div class="form-group add-ques-boxs">
<div class="clearfix">
<label class="question_no">Question: <span style="color:red;">*</span><a href="#"><i class="icofont icofont-trash" onclick="delete_question($(this),'question_`+q_a+`') "></i></a><a href="#"><i id="add_questions" onclick="add_question()" style="display: none;" class="icofont icofont-plus-circle add_questions"></i></a></label>
</div>
<input type="text" id="question_`+q_a+`" name="question_`+q_a+`" required="" class="form-control question" onchange="question('question_`+q_a+`')" onfocus="question1('question_`+q_a+`')" style="text-transform: uppercase">
</div>
</div>
</div>
<div class="row" id="ques_option_`+q_a+`">
<div class="col-xl-6 col-lg-6 col-sm-12">
<div class="form-group">
<label>Option 1: <span style="color:red;">*</span></label>
<input type="text" name="a_`+q_a+`" required="" class="form-control option" id=option_`+q_a+`_`+op+` onchange="check1('option_`+q_a+`_`+op+`','answer_`+q_a+`')" onfocus="check2('option_`+q_a+`_`+op+`','answer_`+q_a+`')">
</div>
</div>
<div class="col-xl-6 col-lg-6 col-sm-12">
<div class="form-group">
<label>Option 2: <span style="color:red;">*</span></label>
<input type="text" name="b_`+q_a+`" required="" class="form-control option" id=option_`+q_a+`_`+(op+1)+` onchange="check1('option_`+q_a+`_`+(op+1)+`','answer_`+q_a+`')"
onfocus="check2('option_`+q_a+`_`+(op+1)+`','answer_`+q_a+`')">
</div>
</div>
<div class="col-xl-6 col-lg-6 col-sm-12">
<div class="form-group">
<label>Option 3: <span style="color:red;">*</span></label>
<input type="text" name="c_`+q_a+`" required="" class="form-control option" id=option_`+q_a+`_`+(op+2)+` onchange="check1('option_`+q_a+`_`+(op+2)+`','answer_`+q_a+`')"
onfocus="check2('option_`+q_a+`_`+(op+2)+`','answer_`+q_a+`')">
</div>
</div>
<div class="col-xl-6 col-lg-6 col-sm-12">
<div class="form-group">
<label>Option 4: <span style="color:red;">*</span></label>
<input type="text" name="d_`+q_a+`" required="" class="form-control option" id=option_`+q_a+`_`+(op+3)+` onchange="check1('option_`+q_a+`_`+(op+3)+`','answer_`+q_a+`')"
onfocus="check2('option_`+q_a+`_`+(op+3)+`','answer_`+q_a+`')">
</div>
</div>
</div>
<div class="row">
<div class="col-xl-12 col-lg-12 col-sm-12">
<div class="form-group">
<label>Correct Answer: <span style="color:red;">*</span></label>
<input type="text" name="answer_`+q_a+`" onchange="ans1('answer_`+q_a+`')" onfocus="ans2('answer_`+q_a+`')" required="" class="form-control corr_ans" id=answer_`+q_a+`>
</div>
</div>
</div>
</div>`

$('.ques-list').append(question_html)
$('#add_questions').remove()

$('#question_'+q_a).focus()

// $("button").click(function() { 
$("html, body").animate({ 
scrollTop: $( 
'html, body').get(0).scrollHeight 
}, 2000); 
// });


} else{
// alert('you cannot add more than 25 questions')
swal("error","you cannot add more than 25 questions","error")

}
}

function delete_question(element,id){
// var text = document.getElementsByClassName('question')[0].id
// if(id == ''){
// console.log('id null-------')
// id = $('.icofont-trash').parents('.question_no').parent().next().attr('id')
// var tempSplitId = id.split('_')
// tempSplitId = parseInt(tempSplitId[1])-1
// id='question_'+tempSplitId
// }
console.log('-----',$('#add_questions'))
$('#add_questions').attr('disabled',false)
console.log('text112345678',id)
if(id == 'question_1'){
console.log('id===================',id)
// alert('you cannot delete this question')
swal("error","You cannot delete this question.","error") 
return false; 
}
else{
// console.log('id in else=====',id)
// var tmpHtml = `<a href="#"><i id="add_questions" onclick="add_question()" class="icofont icofont-plus-circle"></i></a>`;
// console.log('jjjjjjjjjj---------------',$(element).parents('.ques-one').prev().children().find('.question_no').children().siblings()[2]);
// var add = $(element).parents('.ques-one').prev().children().find('.question_no').children().siblings()[2]
// add.remove()
// console.log('===============>');
// console.log($(element).parents('.question_no').children())
// $(element).parents('.question_no').children().append(tmpHtml)
// console.log($(element).parents('.question_no').children())
// console.log('----------')
// $(element).parents('.ques-one').remove();
console.log('----------',element.parent().siblings().find('#add_questions').length)
if(element.parent().siblings().find('#add_questions').length >= 0){

$(element).parents('.ques-one').remove();
console.log('==================',$(element).parents('.ques-one'))

var remainingDivLength = $('.question_no').length - 1;
// console.log('remainingDivLength============',remainingDivLength)
var labelElem = $('.question_no');
// console.log('labelElem---------------',labelElem)
i = 0;
labelElem.each(function(index) {
// console.log('')
i = index + 1;
var tmpHtml = `<a href="#"><i class="icofont icofont-trash" onclick="delete_question($(this),'question_1')"></i></a>`;
// console.log('tmpHtml666666666666666666666',tmpHtml)
if(index == remainingDivLength) {
// console.log('index == remainingDivLength==============',index , remainingDivLength)
tmpHtml += `<a href="#"><i id="add_questions" onclick="add_question()" class="icofont icofont-plus-circle"></i></a>`;
// console.log('tmpHtml1111111111111111111',tmpHtml)
}
$(this).html("Question:"+tmpHtml);
console.log('666666666666666666',$(this).html("Question:"+tmpHtml))
});

console.log('id-------',id)
var splitId = id.split('_')
console.log('splitId-------',splitId[1])
console.log('final_option_list.length----',final_option_list.length, 'parseInt(splitId[1])----',parseInt(splitId[1]))
console.log('all_ques_list.length---',all_ques_list.length,'parseInt(splitId[1])---',parseInt(splitId[1]))
console.log('final_ans_list.length---',final_ans_list.length, 'parseInt(splitId[1])---',parseInt(splitId[1]))
if(final_option_list.length >= parseInt(splitId[1]) || all_ques_list.length >= parseInt(splitId[1]) || final_ans_list.length >= parseInt(splitId[1])){
final_option_list.splice(parseInt(splitId[1])-1,1)
all_ques_list.splice(parseInt(splitId[1])-1,1)
final_ans_list.splice(parseInt(splitId[1])-1,1)
console.log('final option---',final_option_list)
console.log('final questions---',all_ques_list)
console.log('final answers---',final_ans_list)

}
// final_option_list = []
// allOption = []
// all_ques_list = []
// final_ans_list = []
}
}
}

function add_question_edit(quiz_id){
var op = 1
var textall = $('.question_text').text()
console.log(textall)
var textall_split = textall.split('n')
console.log(textall_split)
q_a = textall_split[textall_split.length-1]
console.log(q_a)
var btn = `<button type="button" class="btn btn-success" id="add_questions" onclick="add_question_edit('`+quiz_id+`')"><i class="icofont icofont-plus"></i></button>`
if(q_a < maxField && $('.ques-one').length < maxField){ 
q_a++;
var question_html_edit = `<form data-url="/edit_questions/0/" method="POST" id="edit_add_ques_form_`+q_a+`"> 
<div class="ques-one">
<div class="delete-q-one">
                 <a href="#" onclick="delete_question($(this),'question_`+q_a+`') " class="tabledit-edit-button btn btn-primary waves-light waves-effect"><i class="icofont icofont-trash"></i> </a>
                  </div>
<div class="row">
<div class="col-xl-12 col-lg-12 col-sm-12">
<div class="form-group add-ques-boxs">
<div class="clearfix">
<label class='question_text'>Question `+q_a+`</label>
</div>
<input type="hidden" name="quiz_id" value="`+quiz_id+`" id="quiz_id">
<input type="text" id="question_`+q_a+`" name="question_`+q_a+`" required="" class="form-control question" onchange="edit_question('question_`+q_a+`')" onfocus="question1('question_`+q_a+`')">
</div>
</div>
</div>
<div class="row">
<div class="col-xl-6 col-lg-6 col-sm-12">
<div class="form-group">
<label>Option 1:</label>
<input type="text" name="a_`+q_a+`" required="" class="form-control option" id=option_`+q_a+`_`+op+` onchange="edit_check1('option_`+q_a+`_`+op+`','answer_`+q_a+`')" onfocus="check2('option_`+q_a+`_`+op+`','answer_`+q_a+`')">
</div>
</div>
<div class="col-xl-6 col-lg-6 col-sm-12">
<div class="form-group">
<label>Option 2:</label>
<input type="text" name="b_`+q_a+`" required="" class="form-control option" id=option_`+q_a+`_`+(op+1)+` onchange="edit_check1('option_`+q_a+`_`+(op+1)+`','answer_`+q_a+`')" onfocus="check2('option_`+q_a+`_`+(op+1)+`','answer_`+q_a+`')">
</div>
</div>
<div class="col-xl-6 col-lg-6 col-sm-12">
<div class="form-group">
<label>Option 3:</label>
<input type="text" name="c_`+q_a+`" required="" class="form-control option" id=option_`+q_a+`_`+(op+2)+` onchange="edit_check1('option_`+q_a+`_`+(op+2)+`','answer_`+q_a+`')" onfocus="check2('option_`+q_a+`_`+(op+2)+`','answer_`+q_a+`')">
</div>
</div>
<div class="col-xl-6 col-lg-6 col-sm-12">
<div class="form-group">
<label>Option 4:</label>
<input type="text" name="d_`+q_a+`" required="" class="form-control option" id=option_`+q_a+`_`+(op+3)+` onchange="edit_check1('option_`+q_a+`_`+(op+3)+`','answer_`+q_a+`')" onfocus="check2('option_`+q_a+`_`+(op+3)+`','answer_`+q_a+`')">
</div>
</div>
</div>
<div class="row">
<div class="col-xl-12 col-lg-12 col-sm-12">
<div class="form-group">
<label>Correct Answer:</label>
<input type="text" name="answer_`+q_a+`" onchange="edit_ans1('answer_`+q_a+`')" onfocus="ans2('answer_`+q_a+`')" required="" class="form-control corr_ans" id=answer_`+q_a+`>
</div>
</div>
</div>
<div class="text-right p-b-15">
<button type="button" class="btn btn-success" id="ques_save_btn" onclick="edit_add_ques('1','edit_add_ques_form_`+q_a+`','ques_save_btn')">Add</button> </form>
</div>
</div>`

$('.ques-list').append(question_html_edit)
$('#add_questions').remove()
$('.view-ques-section').append(btn)
$('#add_questions').attr('disabled',true)

}else{
// alert('you cannot add more than 25 questions')
swal("error","you cannot add more than 25 questions","error")
}
}

var final_option_list = []
var tempFinalOptionList = []
var allOption = []
var tempAllOption;
var thisvalue = ''
var splitId;

function check2(id,ansId){
console.log('id',id)
thisvalue = $('#'+id).val()
console.log('thisvalue',thisvalue)
splitId = id.split('_')
console.log('final option list----',final_option_list[(parseInt(splitId[1]))-1])
}
function check1 (lastId, ansId){
console.log('allOption-----',allOption)
console.log('lastId-----option-Id-----',lastId)
console.log('ansId--------',ansId)
var option = $('#'+lastId).val();
option = option.trim()
option = option.toLowerCase()
var ans = $('#'+ansId).val();
console.log('option-----',option)
console.log('ans-----',ans, parseInt(splitId[1]))
if(thisvalue != '' && final_option_list.length >= parseInt(splitId[1])){
console.log('this value is not null---------------')
console.log('option is as below: --------------------------------------',final_option_list.length)
console.log(option)
if(final_option_list[(parseInt(splitId[1]))-1].includes(option)){
// alert('bhai hai')
swal("error","Option already exists","error")
$('#'+ansId).attr('disabled', true)
$('#ques_submit').attr('disabled', true)
$('.add_questions').css('display', 'none')
$('.option').attr('disabled', true)
var splitLastId = lastId.split('_')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).removeAttr('disabled')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).attr('title','First change this option value')
}else{
final_option_list[parseInt(splitId[1])-1][parseInt(splitId[2])-1] = option
console.log('replace-------------123---------------------------')
console.log('final option list---123-',final_option_list)
$('#'+ansId).attr('disabled', false)
$('#ques_submit').attr('disabled', false)
$('.add_questions').css('display', 'block')
$('.option').attr('disabled', false)
var splitLastId = lastId.split('_')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).removeAttr('title') 
}
}else{
console.log('this value null naina') // naina
if(allOption.includes(option)) {
// console.log('allOption null')
// alert('match')
swal("error","Option already exists","error")
$('#'+ansId).attr('disabled', true)
$('#ques_submit').attr('disabled', true)
$('.add_questions').css('display', 'none')
$('.option').attr('disabled', true)
var splitLastId = lastId.split('_')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).removeAttr('disabled')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).attr('title','First change this option value')
}else{
allOption.push(option)
console.log('push allOption-----',allOption)
$('.option').attr('disabled', false)
var splitLastId = lastId.split('_')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).removeAttr('disabled')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).removeAttr('title')

}
console.log('lastid------------',lastId)
var splitLastId = lastId.split('_')
console.log('spillted optionssss==============',splitLastId)
var splitLastId1 = splitLastId[0].split('n')

console.log('splitLastId1----',splitLastId1[-1])

var splitansId = ansId.split('_')
console.log('splitansId---',splitansId)

if(allOption.length == 4 && splitansId[-1] == splitLastId1[-1]){
tempAllOption = allOption
final_option_list.push(allOption)
console.log('final_option_list',final_option_list)
allOption = []
$('#'+ansId).attr('disabled', false)
$('#ques_submit').attr('disabled', false)
$('.add_questions').css('display', 'block')
$('.option').attr('disabled', false)
var splitLastId = lastId.split('_')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).removeAttr('disabled')
$('#option_'+splitLastId[1]+'_'+(splitLastId[2])).removeAttr('title')
}
}
}
var final_ans_list = []
var thisAnsValue = ''
var splitAnsId;
function ans2(id){
thisAnsValue = $('#'+id).val()
splitAnsId = id.split('_')
}
function ans1(id){
console.log('ifdd--',id)
console.log('allOption-----',allOption, '-----final option list--------',final_option_list)
var splitTempId = id.split('_')
var tempAns = $('#'+id).val()
tempAns = tempAns.trim()
tempAns = tempAns.toLowerCase()
console.log('tempAns=====',tempAns)
if(thisAnsValue != '' && final_ans_list.length >= parseInt(splitAnsId[1])){
if(final_ans_list.includes(thisAnsValue)){
final_ans_list[parseInt(splitAnsId[1])-1] = tempAns
console.log('final ans list----',final_ans_list)
}
for(var i=0; i<final_ans_list.length; i++){
console.log('i---',i)
for(var j=0; j<final_option_list.length; j++){
console.log('j------',j)
console.log('final_option_list['+j+']--',final_option_list[j])
console.log('final_ans_list['+i+']--',final_ans_list[i])

if(!final_option_list[j].includes(final_ans_list[i])){
// alert('change answer '+i)
swal("error","Answer must be similar to above options","error")
$('#ques_submit').attr('disabled', true)
$('.add_questions').css('display', 'none')
return false;
}
else{
$('#ques_submit').attr('disabled', false)
$('.add_questions').css('display', 'block')
return false;
}
}
j=0
}
}else{
if(final_ans_list.length >= 0){
final_ans_list.push(tempAns)
console.log('final_ans_list---------------',final_ans_list)
console.log('splitTempId-----',splitTempId, 'splitTempId[1]---',splitTempId[1])
console.log('********',final_option_list[parseInt(splitTempId[1])-1])
if(!final_option_list[parseInt(splitTempId[1])-1].includes(tempAns)) {
// alert('ans must be similar to above options')
swal("error","Answer must be similar to above options","error")
$('#ques_submit').attr('disabled', true)
$('.add_questions').css('display', 'none')
}
}else{
final_ans_list[(parseInt(splitTempId[1]))-1] = tempAns
console.log('final ans list---push-',final_ans_list)
$('#ques_submit').attr('disabled', false)
$('.add_questions').css('display', 'block')
}
}
// }
}
var all_ques_list = []
var thisQuesValue = ''
var splitQuesId;
function question1(id){
thisQuesValue = $('#'+id).val()
console.log('thisQuesValue------',thisQuesValue)
splitQuesId = id.split('_')
}
function question(id){
console.log('ques--id---',id)
var temp_ques = $('#'+id).val()
temp_ques = temp_ques.trim()
temp_ques = temp_ques.toLowerCase()
console.log('1111111111111111111',temp_ques)
if(thisQuesValue != '' && all_ques_list.length >= parseInt(splitQuesId[1])){
if(all_ques_list.includes(thisQuesValue) && !all_ques_list.includes(temp_ques)){
all_ques_list[parseInt(splitQuesId[1])-1] = temp_ques
console.log('final ques list----',all_ques_list)
$('.option').attr('disabled',false)
$('#ques_submit').attr('disabled', false)
$('.corr_ans').attr('disabled', false)
}else{
// alert('ques already exists')
swal("error","Question already exists","error")
all_ques_list[parseInt(splitQuesId[1])-1] = ''
console.log('all_ques_list-----', all_ques_list)
$('.option').attr('disabled','true')
$('#ques_submit').attr('disabled', true)
$('.corr_ans').attr('disabled', true)
return false;
}
}else{
if(all_ques_list.includes(temp_ques)) {
// alert('ques already exists')
swal("error","Question already exists","error")
$('.option').attr('disabled','true')
$('#ques_submit').attr('disabled', true)
$('.corr_ans').attr('disabled', true)
}else{
all_ques_list.push(temp_ques)
console.log('all_ques_list============',all_ques_list)
for(var i=0; i<all_ques_list.length; i++){
console.log('---all_ques_list[i]', all_ques_list[i])
}
$('.option').removeAttr('disabled')
$('#ques_submit').attr('disabled', false)
$('.corr_ans').attr('disabled', false)
}
} 

}


// var all_editques_list = []
// function edit_question(id){
// console.log('ques--id---',id)
// var queslist1 = $('.question_tag')
// console.log('queslist1======================',queslist1)
// var temp_ques = $('#'+id).val()
// console.log('1111111111111111111',temp_ques)
// if(all_ques_list.includes(temp_ques)) {
// alert('ques already exists')
// $('.option').attr('disabled','true')
// $('#ques_submit').attr('disabled', true)
// $('.corr_ans').attr('disabled', true)
// }else{
// all_ques_list.push(temp_ques)
// console.log('all_ques_list============',all_ques_list)
// for(var i=0; i<all_ques_list.length; i++){
// console.log('---all_ques_list[i]', all_ques_list[i])
// }
// $('.option').removeAttr('disabled')
// $('#ques_submit').attr('disabled', false)
// $('.corr_ans').attr('disabled', false)
// }
// }


// for(var i=0; i<all_ques_list.length; i++){
// console.log('---all_ques_list[i]', all_ques_list[i])
//}


$('.addquestion').click(function(){
// alert('1')
console.log('final option list-----',final_option_list)
console.log('ans list---',final_ans_list)
console.log('question list---',all_ques_list)
console.log('final_ans_list.length----',final_ans_list.length)
console.log('final_option_list.length----',final_option_list.length)
if(final_ans_list.length != 0 && final_ans_list.length == final_option_list.length){
for(var i=0; i<final_ans_list.length; i++){
console.log('i---',i)
for(var j=0; j<final_option_list.length; j++){
console.log('j------',j)
console.log('final_option_list['+i+']--',final_option_list[i])
console.log('final_ans_list['+i+']--',final_ans_list[i])

if(!final_option_list[i].includes(final_ans_list[i])){
// alert('ans must be similar to above options')
i++
swal("error","Answer must be similar to one of the given choices kindly change answer of question "+i,"error")
i--
$('#ques_submit').attr('disabled', false)
return false;
}
}
j=0
}
}else{
// alert('ans must be similar to above options')
swal("error","Answer must be similar to above options","error")
$('#ques_submit').attr('disabled', true)
return false;
}


})

$('.reset').click(function(){
final_option_list = []
allOption = []

all_ques_list = []
final_ans_list = []
$('.option').removeAttr('disabled')
$('#ques_submit').attr('disabled', false)
$('.corr_ans').attr('disabled', false)

})



// edit questions
var edit_ques_list = []
var edit_ans_list = []
var final_edit_option_list = []


for(var i=1; i<=$('.ques-one').length; i++){
    console.log('iiiiiiiiiiii',i)
    console.log($('#question_'+i).val())
    edit_ques_list.push($('#question_'+i).val().toLowerCase())
    console.log(edit_ques_list)

    console.log('ans',$('#answer_'+i).val())
    edit_ans_list.push($('#answer_'+i).val().toLowerCase())
    console.log(edit_ans_list)
    var edit_temp_list = []
    for(var j=1; j<=4; j++){
        console.log('option',$('#option_'+i+'_'+j).val())
        edit_temp_list.push($('#option_'+i+'_'+j).val().toLowerCase())
    }
    j=1;
    final_edit_option_list.push(edit_temp_list)
    console.log(final_edit_option_list)
    console.log(edit_temp_list)
    edit_temp_list = []
    console.log(edit_temp_list)

}

function edit_question(id){
    console.log('edit ques id',id)
    var edit_temp_ques = $('#'+id).val()
    var splitId = id.split('_')
    edit_temp_ques = edit_temp_ques.trim()
    edit_temp_ques = edit_temp_ques.toLowerCase()
    console.log('---edit_ques_list-----',edit_ques_list)
    console.log('edit ques',edit_temp_ques)
    if(edit_ques_list.includes(edit_temp_ques)){
    	$('.swal-overlay--show-modal').css('display','block')
        swal('error','Question already exists','error')
        $('.option').attr('disabled' , true)
        $('.corr_ans').attr('disabled' , true)
        $('#ques_update_'+splitId[1]).attr('disabled' , true)
        edit_ques_list[parseInt(splitQuesId[1])-1] = ''
        console.log('before change',edit_ques_list)
    }else{
        $('.option').attr('disabled' , false)
        $('.corr_ans').attr('disabled' , false)
        $('#ques_update_'+splitId[1]).attr('disabled' , false)
        var split_temp_edit_ques = id.split('_')
        edit_ques_list[parseInt(split_temp_edit_ques[1])-1] = edit_temp_ques
        console.log('after edit change1111111111111',edit_ques_list)
    }
}
var edit_allOption = []
// var edit_final_option_list = []

function edit_check1 (lastId, ansId){
    console.log('--------------edit----------------',thisvalue)
    var edit_lastId = lastId
    var edit_ansId = ansId
    console.log('edit allOption-----',edit_allOption)
    console.log('edit_ lastId-----option-Id-----',edit_lastId)
    console.log('edit ansId--------',edit_ansId)
    var edit_option = $('#'+edit_lastId).val();
    edit_option = edit_option.trim()
    edit_option = edit_option.toLowerCase()
    var edit_ans = $('#'+edit_ansId).val();
    console.log('edit_option-----',edit_option)
    console.log('edit_ans-----',edit_ans, parseInt(splitId[1]),parseInt(splitId[1])-1)
    if(thisvalue != '' && final_edit_option_list.length >= parseInt(splitId[1])){
        console.log('edit_  this value is not null---------------')
        console.log('edit    option is as below: --------------------------------------',splitId,final_edit_option_list[parseInt(splitId[1])],final_edit_option_list)
        console.log(edit_option,final_edit_option_list)
        console.log('111111111111111111111111111111111111111111111111111111111111111111111111111111',parseInt(splitId[1]),final_edit_option_list)

        if(final_edit_option_list[parseInt(splitId[1])-1].includes(edit_option)){
            swal("error","Option already exists","error")
            $('#'+edit_ansId).attr('disabled', true)
            $('.corr_ans').attr('disabled' , true)
            $('#ques_submit').attr('disabled', true)
            $('.add_questions').css('display', 'none')
            $('.option').attr('disabled', true)
            var edit_splitLastId = edit_lastId.split('_')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).removeAttr('disabled')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).attr('title','First change this option value')
            console.log('-------',edit_splitLastId,parseInt(edit_splitLastId[1]),parseInt(edit_splitLastId[2]))
            final_edit_option_list[parseInt(edit_splitLastId[1])-1][parseInt(edit_splitLastId[2])-1] = ''
            console.log('final option list---123 for phlke-editttttttttttttttt',final_edit_option_list)

        }else{
            final_edit_option_list[parseInt(splitId[1])-1][parseInt(splitId[2])-1] = edit_option
            console.log('replace----ediitttttttttt---------123---------------------------')
            console.log('final option list---123-editttttttttttttttt',final_edit_option_list)
            $('#'+edit_ansId).attr('disabled', false)
            $('.corr_ans').attr('disabled' , false)
            $('#ques_save_btn').attr('disabled', false)
            $('.add_questions').css('display', 'block')
            $('.option').attr('disabled', false)
            var edit_splitLastId = edit_lastId.split('_')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).removeAttr('title') 
        }
    }else{
        console.log('this value null naina') // naina
        if(edit_allOption.includes(edit_option)) {
            console.log('edit_allOption null')
            // alert('match')
            swal("error","Option already exists","error")
            $('#'+edit_ansId).attr('disabled', true)
            $('#ques_submit').attr('disabled', true)
            $('.add_questions').css('display', 'none')
            $('.option').attr('disabled', true)
            var edit_splitLastId = edit_lastId.split('_')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).removeAttr('disabled')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).attr('title','First change this option value')
        }else{
            edit_allOption.push(edit_option)
            console.log('push edit_allOption-----',edit_allOption)
            $('.option').attr('disabled', false)
            var edit_splitLastId = edit_lastId.split('_')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).removeAttr('disabled')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).removeAttr('title')
        
        }
        console.log('edit_lastId------------',edit_lastId)
        var edit_splitLastId = edit_lastId.split('_')
        console.log('spillted optionssss==============',edit_splitLastId)
        var edit_splitLastId1 = edit_splitLastId[1]
        
        console.log('edit_splitLastId1----',edit_splitLastId1)
        
        var edit_splitansId = edit_ansId.split('_')
        console.log('edit_splitansId---',edit_splitansId)
        console.log('edit_allOption 1111111edit_splitansId1111111',edit_allOption.length , edit_splitansId[1] )
        
        if(edit_allOption.length == 4 && edit_splitansId[1] == edit_splitLastId1){
            // if(edit_allOption.length == 4){
            tempAllOption = edit_allOption
            final_edit_option_list.push(edit_allOption)
            console.log('final_edit_option_list',final_edit_option_list)
            edit_allOption = []
            $('#'+edit_ansId).attr('disabled', false)
            $('#ques_submit').attr('disabled', false)
            $('.add_questions').css('display', 'block')
            $('.option').attr('disabled', false)
            var edit_splitLastId = edit_lastId.split('_')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).removeAttr('disabled')
            $('#option_'+edit_splitLastId[1]+'_'+(edit_splitLastId[2])).removeAttr('title')
        }
    }
}


function edit_ans1(id){
    console.log('edit ques id',id)
    console.log('thisAnsValue----',thisAnsValue)
    console.log('edit_ans_list----',edit_ans_list)
    var edit_temp_ans = $('#'+id).val()
    console.log('edit_ans_list----',edit_ans_list)
    edit_temp_ans = edit_temp_ans.trim()
    edit_temp_ans = edit_temp_ans.toLowerCase()
    edit_ans_list[parseInt(splitAnsId[1])-1] = edit_temp_ans
    console.log('edit ans',edit_temp_ans)
    if(!final_edit_option_list[parseInt(splitAnsId[1])-1].includes(edit_temp_ans)){
        swal('error','Answer must be similar to one of the above options','error')
        $('#ques_save_btn').attr('disabled' , true)
    }else{
        $('#ques_save_btn').attr('disabled' , false)
        edit_ans_list[parseInt(splitAnsId[1])-1] = edit_temp_ans
        console.log('after edit change1111111111111',edit_ans_list)

    }
}


function edit_add_ques(number,formId,btnId){
	// var formData = $('#'+d).serialize()
	console.log('formId------',formId)
	console.log('btnId------',btnId)
	var splitFormId = formId.split('_')

	console.log('----******---1-', $('#'+formId).find($('#ques_save_btn')))
	console.log('----******--2--', $('#'+formId).find($('#'+btnId)))

	console.log('--------------start------',$('#ques_save_btn'))
    $('#ques_save_btn').attr('disabled', true).val("Please Wait...")
	// $('#ques_save_btn').val("Please Wait...")
	console.log('number----1--',number, typeof(number))
	number = parseInt(number)
	console.log('number---2---',number, typeof(number))
	var formObj = {};
	var formDataNull = 0; // NOT NULL
    var inputs = $('#'+formId).serializeArray();
    $.each(inputs, function (i, input) {
    	console.log('input----1----',input.value)
    	if(input.value == ""){
        	formDataNull = 1 // Null
        	console.log('1111111---',formDataNull)
    	}
        formObj[input.name] = input.value;
        console.log('input--2---',formObj[input.name])
    });
	if(formDataNull == 0 ){
		number = 0;
		console.log('number=-------3---',number)
	}
 	console.log('edit add final edit option list-----',final_edit_option_list)
    console.log('edit add ans list---',edit_ans_list)
    console.log('edit add question list---',edit_ques_list)
    console.log('edit add edit_ans_list.length----',edit_ans_list.length)
    console.log('edit add final_edit_option_list.length----',final_edit_option_list.length)
    console.log('formDataNull-----enter-----',formDataNull)
    console.log('parseInt(splitFormId[4])-1-------',splitFormId,splitFormId[4],parseInt(splitFormId[4])-1)
    if(edit_ans_list.length != 0 && edit_ans_list.length == final_edit_option_list.length && formDataNull == 0 && number == 0){
		// number = 1;
		// console.log('number-----4-----',number)

        for(var i=0; i<edit_ans_list.length; i++){
        	console.log('i---',i)
        	if(i == parseInt(splitFormId[4])-1){
	            for(var j=0; j<final_edit_option_list.length; j++){
	                console.log('j------',j)
	                console.log('final_edit_option_list['+i+']--',final_edit_option_list[i])
	                console.log('edit_ans_list['+i+']--',edit_ans_list[i],parseInt(splitFormId[4])-1)
	    
	                if(!final_edit_option_list[parseInt(splitFormId[4])-1].includes(edit_ans_list[i])){
	                    // alert('ans must be similar to above options')
	                    i++
	                    $('.swal-overlay--show-modal').css('display','block')
	                    swal("error","Answer must be similar to one of the given choices kindly change answer of question "+i,"error")
	                    i--
	                    // $('#ques_save_btn').attr('disabled', true)
	                    return false;
	                }else{
	                	console.log('--------============',$('#'+formId).attr('data-url'))
	                	var url = $('#'+formId).attr('data-url')
		                edit_add_quiz_id = $('#quiz_id').val()
	                	console.log('url------',url)
	                	$('#'+formId).find($('#'+btnId)).text('Please Wait...');
						$('#'+formId).find($('#'+btnId)).attr('disabled',true);
	                	$.ajax({
				            url:url,
				            type:'POST',
				            data:inputs,
				            success:function(data){
		               			// $('#ques_save_btn').attr('disabled', true)
		               			// $('#ques_save_btn').val("Please Wait...")
		               			
				                $('.swal-overlay--show-modal').css('display','block')
				               	swal({
				                    title: "Success!",
				                    text: "Question has been successfully Saved.",
				                    icon: "success",
				                    buttons: false
				                  })
				                function redirect(){
				                	console.log('..............',$('#'+formId).closest($('#ques_save_btn')).length)
				                	$('.swal-overlay--show-modal').hide()
				                	if($('#'+formId).find($('#ques_save_btn')).length != 0){
				                		console.log('if--------')
				                   		window.location.href = "/edit_questions/"+edit_add_quiz_id+"/";
				                	}else{
				                		console.log('else------------')
				                		$('#'+formId).find($('#'+btnId)).text('Update');
										$('#'+formId).find($('#'+btnId)).attr('disabled',false);
				                   		window.location.href = "#";
				                	}
				                   console.log("success");
				                   formDataNull = 1;
									$('#add_questions').attr('disabled',false)
									inputs =''
									return true;
				                   
				                }

				                 setTimeout(redirect, 3000); //2000 is equivalent to 2 seconds

				                 
				            },
				          });
	                	return false;

		                // console.log('edit_add_quiz_id-------------->',edit_add_quiz_id,typeof(edit_add_quiz_id))
		                // edit_add_quiz_id = parseInt(edit_add_quiz_id)
	            	
	                }
	            }
	            j=0
        	}
        }
    }else{
        // alert('ans must be similar to above options')
        console.log('else-----1---------formDataNull---',formDataNull)
        if(formDataNull == 1){
	        swal("error","Please Fill Form","error")
        	$('#ques_save').attr('disabled', false)
        }else{
        	formDataNull = 0;
	        swal("error","Answer must be similar to above options","error")
        	$('#ques_save').attr('disabled', true)
        }
        return false;
    }
}

// $(function()
// {
// 	// alert('submit 1')
// 	console.log('------------',$('#edit_add_ques_form'))
//   $('#edit_add_ques_form').submit(function(){
//   	alert('submit 2')
//   	console.log('-------',this)
//     $("input[type='submit']", this)
//       .val("Please Wait...")
//       .attr('disabled', true);
//     return true;
//   });
// });

