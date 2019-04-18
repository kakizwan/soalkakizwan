/*!
* name : dlxQuiz jQuery Plugin
* author : Chyno Deluxe
* version : 1.0.0
*
* Penjelasan dan beberapa kalimat diubah kedalam bahasa Indonesia oleh saya (Moccatory)
* Penambahan score dihasil akhir, agar user yang mengerjakan quiz tau berapa nilai yang didapat
*
* copyright (c) 2016 Chyno Deluxe - http://www.chynodeluxe.com
* license MIT
*/(function($){"use strict";$.dlxQuiz=function(element,options){var plugin=this,$element=$(element),_element_id=$element.attr('id'),_element='#'+_element_id,question_index=0,quizData=options.quizData,questions=null,questionCount=null,defaults={questionCount_text:"Pertanyaan ke %current_index dari %totalQuestions pertanyaan",backButton_text:"Pertanyaan sebelumnya",nextButton_text:"Pertanyaan selanjutnya",completeButton_text:"Selesai Soal",viewResultsButton_text:"Lihat Hasil",resultsHeader_text:"Ini hasil yang kamu kerjakan tadi.",quizScore_text:"Kamu menjawab %totalScore dari %totalQuestions pertanyaan dengan benar.",quizScoreMessage_text:"",quizScoreRank_text:{a:"Nilai Sempurna!",b:"Kerja Bagus!",c:"Setidaknya kamu enggak gagal",d:"Kamu harus belajar lebih giat",f:"Kamu serius waktu ngerjain soal ini?",g:"Sedikit lagi.."},show_QuestionCount:true,showBackButton:true,showRadioButtons:true,showScoreRank:true,showScoreMessage:true,showViewResultsButton:true,randomizeQuestions:true,randomizeAnswers:true,},class_disabled="disabled",class_quizQuestions="quizQuestions",class_showQuestion="showQuestion",class_questionCount="questionCount",class_questionTitle="questionTitle",class_questionAnswers="questionAnswers",class_selectedAnswer="selectedAnswer",class_quizControls="quizControls",class_ctrlPreviousButton="ctrlPrev",class_ctrlNextButton="ctrlNext",class_ctrlCompleteButton="ctrlDone",class_quizResults="quizResults",class_quizScoreRank="quizScoreRank",class_quizScore="quizScore",class_quizScoreMessage="quizScoreMessage",class_viewResultsButton="viewResults",class_showingResults="showingResults",_questions=" ."+class_quizQuestions,_question=_questions+' > li',_answers=" ."+class_questionAnswers,_controls=" ."+class_quizControls,_ctrlPreviousButton=" ."+class_ctrlPreviousButton,_ctrlNextButton=" ."+class_ctrlNextButton,_ctrlCompleteButton=" ."+class_ctrlCompleteButton,_results=" ."+class_quizResults,_viewResultsButton=" ."+class_viewResultsButton,_showingResults=" ."+_showingResults,_quizQuestions=_element+_question,_quiz_answer=_element+_answers+' li',_quizCtrls=_element+_controls,_quizCtrlPreviousButton=_element+_ctrlPreviousButton,_quizCtrlNextButton=_element+_ctrlNextButton,_quizCompleteButton=_element+_ctrlCompleteButton,_quizViewResultsButton=_element+_viewResultsButton,_quizResults=_element+_results;plugin.config=$.extend(defaults,options);plugin.method={buildQuiz:function(data){var _quizHTML;quizData=data;questions=plugin.config.randomizeQuestions?plugin.method.randomizeArray(quizData.questions):quizData.questions;questionCount=questions.length;if(!$element.hasClass("quiz")){$element.addClass("quiz");}
_quizHTML='<ul class="'+class_quizQuestions+'">';$.each(questions,function(q){var question=questions[q];question.options=plugin.config.randomizeAnswers?plugin.method.randomizeArray(question.options):question.options;_quizHTML+='<li';_quizHTML+=(q===0?' class="'+class_showQuestion+'">':'>');if(plugin.config.show_QuestionCount){_quizHTML+='<span class="'+class_questionCount+'">';_quizHTML+=plugin.config.questionCount_text.replace('%current_index',q+1).replace('%totalQuestions',questionCount);_quizHTML+='</span>';}
_quizHTML+='<h2 class="'+class_questionTitle+'">';_quizHTML+=question.q;_quizHTML+='</h2>';_quizHTML+='<ul class="'+class_questionAnswers+'">';$.each(question.options,function(a){var _input_name=_element_id+'-q'+(q+1),_input_id=_input_name+'-a'+(a+1);_quizHTML+='<li>';_quizHTML+='<label for="'+_input_id+'">';_quizHTML+='<input ';_quizHTML+=(plugin.config.showRadioButtons?'':'class="hidden" ');_quizHTML+='type="radio" name="';_quizHTML+=_input_name+'"';_quizHTML+=' id="'+_input_id+'"';_quizHTML+=' value="'+question.options[a]+'">';_quizHTML+=question.options[a];_quizHTML+='</label>';_quizHTML+='</li>';});_quizHTML+='</ul>';_quizHTML+='</li>';q+=1;});_quizHTML+='</ul>';_quizHTML+='<div class="'+class_quizControls+'">';if(plugin.config.showBackButton){_quizHTML+='<button class="'+class_ctrlPreviousButton+'">';_quizHTML+=plugin.config.backButton_text+'</button>';}
_quizHTML+='<button class="'+class_ctrlNextButton+' '+class_disabled+'">';_quizHTML+=plugin.config.nextButton_text+'</button>';_quizHTML+='<button class="'+class_ctrlCompleteButton+' '+class_disabled+'">';_quizHTML+=plugin.config.completeButton_text+'</button>';_quizHTML+='</div>';$element.append(_quizHTML);plugin.events.init();},randomizeArray:function(array){var m=array.length,t,i;while(m){i=Math.floor(Math.random()*m--);t=array[m];array[m]=array[i];array[i]=t;}
return array;},buildQuizResults:function(){var resultsHTML='',correctAnswerCount=0,totalScore;function _checkAnswers(){$.each(questions,function(index){questions[index].answerCorrect=questions[index].selected===questions[index].a?true:false;if(questions[index].answerCorrect){correctAnswerCount+=1;}else{correctAnswerCount=correctAnswerCount;}});totalScore=(correctAnswerCount/questionCount)*100;}
_checkAnswers();resultsHTML+='<div class="'+class_quizResults+'">';resultsHTML+='<h1 class="'+class_quizScoreRank+'">';if(totalScore==100){resultsHTML+=totalScore+" - "+plugin.config.quizScoreRank_text.a;}else if(totalScore>80){resultsHTML+=totalScore+" - "+plugin.config.quizScoreRank_text.g;}else if(totalScore>60){resultsHTML+=totalScore+" - "+plugin.config.quizScoreRank_text.b;}else if(totalScore>40){resultsHTML+=totalScore+" - "+plugin.config.quizScoreRank_text.c;}else if(totalScore>20){resultsHTML+=totalScore+" - "+plugin.config.quizScoreRank_text.d;}else{resultsHTML+=totalScore+" - "+plugin.config.quizScoreRank_text.f;}
resultsHTML+='</h1>';resultsHTML+='<p class="'+class_quizScore+'">';resultsHTML+=plugin.config.quizScore_text.replace('%totalScore',correctAnswerCount).replace('%totalQuestions',questionCount);resultsHTML+='</p>';if(plugin.config.showScoreMessage){resultsHTML+='<p class="'+class_quizScoreMessage+'">';resultsHTML+=plugin.config.quizScoreMessage_text;resultsHTML+='</p>';}
if(plugin.config.showViewResultsButton){resultsHTML+='<button class="'+class_viewResultsButton+'">';resultsHTML+=plugin.config.viewResultsButton_text;resultsHTML+='</button>';}
$element.append(resultsHTML);if(plugin.config.showViewResultsButton){plugin.events.resultsButton();}}};plugin.events={init:function(){this.controls.init();this.answerQuestion();this.checkQuestion();},controls:{DOM:function(){this.plugin=plugin.events;this.questionCount=questionCount-1;this.$previous=$(_quizCtrlPreviousButton);this.$next=$(_quizCtrlNextButton);this.$complete=$(_quizCompleteButton);this.$buttons=this.$previous.add(this.$next).add(this.$complete);},init:function(){this.DOM();var $buttons=this.$buttons,_this=this;$buttons.on('click',function(){var $button=$(this);if(_this.isNotDisabled($button)){switch($button.attr('class')){case class_ctrlPreviousButton:_this.plugin.previousQuestion();break;case class_ctrlNextButton:_this.plugin.nextQuestion();break;case class_ctrlCompleteButton:$(_element+' '+_questions).add(_quizCtrls).remove();plugin.method.buildQuizResults();break;}}});},isNotDisabled:function(button){return!button.hasClass(class_disabled)?true:false;},resetDisabled:function(){var totalAnswered=0;switch(question_index){case 0:this.$previous.addClass(class_disabled);this.$complete.hide();this.$next.show();break;case this.questionCount:this.$next.addClass(class_disabled).hide();this.$previous.removeClass(class_disabled);this.$complete.show();break;default:this.$previous.removeClass(class_disabled);this.$next.show();this.$complete.hide();break;}
this.$next=questions[question_index].selected!==undefined?this.$next.removeClass(class_disabled):this.$next.addClass(class_disabled);$.each(questions,function(i){totalAnswered=questions[i].selected?totalAnswered+=1:totalAnswered=totalAnswered;});if(totalAnswered===questionCount){this.$complete.removeClass(class_disabled);}}},nextQuestion:function(){question_index+=1;this.checkQuestion();},previousQuestion:function(){question_index-=1;this.checkQuestion();},checkQuestion:function(){this.controls.resetDisabled();$(_quizQuestions).removeClass(class_showQuestion);$($(_quizQuestions)[question_index]).addClass(class_showQuestion);},answerQuestion:function(){function resetAnswerGroup(input){var _grpName=$('input:radio[name="'+input.prop("name")+'"]'),_inputParent=_grpName.parent().parent();_inputParent.removeClass(class_selectedAnswer);}
$(_quiz_answer+' input').on('click',function(e){var _$answer=$(this),_answerParent=_$answer.parent().parent();resetAnswerGroup(_$answer);_answerParent.addClass(class_selectedAnswer);questions[question_index].selected=_$answer.val();plugin.events.checkQuestion();});},resultsButton:function(){$(_quizViewResultsButton).on('click',function(){var resultsHTML;$(_quizViewResultsButton).remove();resultsHTML='<h2>'+plugin.config.resultsHeader_text+'</h2>';resultsHTML+='<ul class="'+class_showingResults+'">';$.each(questions,function(index){resultsHTML+='<li class="';resultsHTML+=questions[index].answerCorrect?'answeredCorrect':'answeredWrong';resultsHTML+='">';resultsHTML+='<h3 class="questionTitle">';resultsHTML+=(index+1)+". "+questions[index].q;resultsHTML+='</h3>';resultsHTML+='<p>';if(!questions[index].answerCorrect){resultsHTML+='<strong>Jawabanmu: </strong>';resultsHTML+=questions[index].selected+'<br>';}
resultsHTML+='<strong>Jawaban yang benar: </strong>';resultsHTML+=questions[index].a+'<br>';resultsHTML+='</p>';resultsHTML+='</li>';});resultsHTML+='</ul>';$(_quizResults).append(resultsHTML);});}};if(quizData){if(typeof quizData==="string"){$.getJSON(quizData).then(function(data){plugin.method.buildQuiz(data);});}else if(typeof options.quizData==="object"){plugin.method.buildQuiz(quizData);}else{quizData=null;throw "Error: Check quizData for - "+_element;}}};$.fn.dlxQuiz=function(options){return this.each(function(){var plugin=new $.dlxQuiz(this,options);});};}(jQuery));
