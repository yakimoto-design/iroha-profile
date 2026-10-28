(() => {
'use strict';
const form=document.getElementById('inquiry');if(!form)return;
const source=document.getElementById('form-source-url');if(location.protocol==='https:')source.value=location.href.split(/[?#]/)[0];
const next=form.querySelector('[name="_next"]');if(location.hostname==='irohacs.com'||location.hostname==='www.irohacs.com')next.value=location.origin+'/thanks.html';else if(location.hostname==='127.0.0.1'||location.hostname==='localhost')next.remove();
const id=new URLSearchParams(location.search).get('service');const service=(window.IROHA_CATALOG?.services||[]).find(s=>s.id===id&&s.status==='published');const field=form.querySelector('[name="message"]');if(service&&!field.value)field.value=service.name+'について相談したいです。\n';
if(service){const topic=form.elements.topic;const match=[...topic.options].find(o=>o.value===service.name);if(match)topic.value=match.value;}
const review=document.getElementById('contact-review'),back=document.getElementById('review-back'),send=document.getElementById('review-send'),status=document.getElementById('form-status');let confirmed=false;
form.addEventListener('submit',event=>{
 for(const name of ['name','email','message']){const input=form.elements[name];input.value=input.value.trim();input.setCustomValidity(input.value?'':'入力してください。');}
 if(!form.checkValidity()){event.preventDefault();form.reportValidity();confirmed=false;return;}
 if(confirmed){const topic=form.elements.topic.value;const knownTopics=[...form.elements.topic.options].map(o=>o.value);const subject=form.querySelector('[name="_subject"]');if(subject)subject.value='【iroha】新しいお問い合わせ'+(knownTopics.includes(topic)?'（'+topic+'）':'');send.disabled=true;send.textContent='送信画面へ移動しています…';try{localStorage.setItem('iroha-inquiry-pending',String(Date.now()));}catch{}window.irohaTrack?.('contact_submit',{service_id:service?.id||'general'});return;}
 event.preventDefault();
 const dl=document.getElementById('review-fields');dl.replaceChildren();for(const [label,name] of [['お名前・会社名','name'],['メールアドレス','email'],['ご相談のテーマ','topic'],['相談したいこと','message']]){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=form.elements[name].value;dl.append(dt,dd);}
 form.hidden=true;review.hidden=false;document.getElementById('review-heading').focus();window.irohaTrack?.('contact_review',{service_id:service?.id||'general'});
});
for(const input of form.querySelectorAll('input,textarea'))input.addEventListener('input',()=>input.setCustomValidity(''));
back.addEventListener('click',()=>{confirmed=false;review.hidden=true;form.hidden=false;form.elements.name.focus();});
send.addEventListener('click',()=>{confirmed=true;form.requestSubmit();});
window.addEventListener('pageshow',()=>{send.disabled=false;send.textContent='この内容で送信する';confirmed=false;if(status)status.textContent='';});
})();
