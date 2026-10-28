(() => {
'use strict';
const measurementId='G-SBD6L6QFZ4',production=['irohacs.com','www.irohacs.com'];
const key='iroha-analytics-disabled';const stored=()=>{try{return localStorage.getItem(key)==='true';}catch{return true;}};
const isProduction=location.protocol==='https:'&&production.includes(location.hostname)&&!location.pathname.includes('/editor');
const disabled=stored();window['ga-disable-'+measurementId]=disabled;
const button=document.getElementById('analytics-toggle'),status=document.getElementById('analytics-status');
if(button){button.textContent=disabled?'アクセス解析を有効にする':'アクセス解析を停止する';if(status)status.textContent=disabled?'このブラウザでの計測を停止しています。':'本番サイトで計測が有効になる設定です。';button.addEventListener('click',()=>{try{localStorage.setItem(key,String(!disabled));}catch{if(status)status.textContent='ブラウザの保存設定をご確認ください。';return;}location.reload();});}
window.irohaTrack=()=>{};if(!isProduction||disabled)return;
window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments);};
const services=(window.IROHA_CATALOG?.services||[]).filter(s=>s.status==='published'),contents=(window.IROHA_CATALOG?.contents||[]).filter(s=>s.status==='published');
const input=new URL(location.href),service=input.searchParams.get('service')||input.searchParams.get('product')||(location.pathname.includes('/video/')?'service-video':null),item=input.searchParams.get('item');const clean=new URL(location.origin+location.pathname);if(services.some(s=>s.id===service))clean.searchParams.set('service',service);if(contents.some(c=>c.id===item))clean.searchParams.set('item',item);
let ref='';try{ref=new URL(document.referrer).origin+'/';}catch{}
gtag('js',new Date());gtag('set',{page_location:clean.href,page_referrer:ref});gtag('config',measurementId,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:clean.href,page_referrer:ref});
const safeParams=params=>{const result={};if(params?.service_id==='general'||services.some(s=>s.id===params?.service_id))result.service_id=params.service_id;if(params?.content_id&&contents.some(c=>c.id===params.content_id))result.content_id=params.content_id;return result;};
window.irohaTrack=(event,params={})=>{if(['view_service','contact_click','contact_review','contact_submit','contact_return','view_content'].includes(event))gtag('event',event,safeParams(params));};
gtag('event','page_view',{page_location:clean.href,page_referrer:ref,page_title:document.title});
if(service&&services.some(s=>s.id===service))irohaTrack('view_service',{service_id:service});if(item&&contents.some(c=>c.id===item))irohaTrack('view_content',{content_id:item});
document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(a&&a.getAttribute('href').includes('contact.html'))irohaTrack('contact_click',{service_id:service||'general'});});
if(location.pathname.endsWith('/thanks.html')){try{const pending=Number(localStorage.getItem('iroha-inquiry-pending'));localStorage.removeItem('iroha-inquiry-pending');if(pending&&Date.now()-pending>=0&&Date.now()-pending<3600000)irohaTrack('contact_return');}catch{}}
const tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+measurementId;document.head.append(tag);
})();
