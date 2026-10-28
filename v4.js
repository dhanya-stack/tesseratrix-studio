/* Tesseratrix V4 additive refinements; loaded after existing scripts. */
(()=> {
 const nested=location.pathname.includes('/products/');
 const base=nested?'../':'';
 const css=document.createElement('link');css.rel='stylesheet';css.href=base+'v4.css';document.head.append(css);
 // Verified public website URLs can be added here; never link customers to GitHub source.
 const SITES={
   'Space Daily':'https://dhanya-stack.github.io/Space-Daily/#today',
   'Semi & AI Radar':'https://dhanya-stack.github.io/Tech-intelligence-dashboard/',
   'Toolbox':'https://dhanya-stack.github.io/DansToolBox/',
   'Learning Lab':'https://dhanya-stack.github.io/The-Learning-Workshop/index.html'
 };
 const icon=base+'assets/tesseratrix-symbol.png';
 document.querySelectorAll('.brand').forEach(a=>{
   a.setAttribute('aria-label','Tesseratrix Studio — Home');
   const mark=a.querySelector('.mark');if(mark){
     mark.textContent='';const img=document.createElement('img');
     img.src=icon;img.alt='';img.className='brand-icon';mark.append(img);
   }
   const label=a.querySelector('span:last-child');if(label)label.textContent='TESSERATRIX STUDIO';
 });
 document.querySelectorAll('.header-note,.hero-list').forEach(e=>e.remove());
 document.querySelectorAll('header nav').forEach(nav=>{
   if(!nav.querySelector('a[href$="index.html"]')&&!nav.querySelector('a[href="#top"]')){
     const home=document.createElement('a');home.href=base+'index.html';home.textContent='Home';nav.prepend(home);
   }
 });
 document.querySelectorAll('a[href*="github.com"]').forEach(a=>{
   if(!a.closest('.brand'))a.remove();
 });
 document.querySelectorAll('.hero h1').forEach(h=>h.innerHTML='Ideas made useful.<br>Curiosity made real.');
 document.querySelectorAll('.hero .intro').forEach(p=>p.textContent='Independent software and engineering studio creating applications, digital platforms, educational games and simulations — shaped by curiosity and built for people.');
 document.querySelectorAll('.hero .eyebrow').forEach(p=>p.textContent='Independent technology & engineering studio');
 document.querySelectorAll('.home-studio h2').forEach(h=>h.innerHTML='Where curiosity<br>becomes creation.');
 document.querySelectorAll('.home-studio>p').forEach(p=>{
   p.innerHTML='Our work moves between engineering, software and learning. We start with questions, build things that work, and refine them with care. <a class="text-link" href="studio.html">Read our story →</a>';
 });
 // Remove duplicate, generic background art overlay. Keep approved imagery.
 document.querySelectorAll('.visual,.detail-art').forEach(el=>el.classList.add('v4-visual'));
 // Product image stays as a real image from V3; status label only describes availability.
 const daily=document.querySelector('a.daily[href*="space-daily"]');
 if(daily){const s=daily.querySelector('small');if(s)s.textContent='Digital platform · Available online';}
 function siteLink(name,url,holder){
   if(!url)return;
   const a=document.createElement('a');a.href=url;a.textContent='Visit website ↗';a.target='_blank';a.rel='noopener noreferrer';a.className='button visit-button';holder.append(a);
 }
 const detail=document.querySelector('main.detail');
 if(detail){
   const name=detail.querySelector('h1')?.textContent.trim();
   if(['Space Daily','Semi & AI Radar','Toolbox','Learning Lab'].includes(name)){
     let status=detail.querySelector('.status-note');if(!status){status=document.createElement('p');status.className='status-note';detail.append(status)}status.textContent=name==='Space Daily'?'Published online · Ongoing improvements':'Available online';
     const crumb=detail.querySelector('.eyebrow');if(crumb)crumb.textContent=crumb.textContent.replace(/In development|Planned/i,'Available online');
   }
   const foot=detail.querySelector('.detail-foot')||detail;
   // Ensure no public repository CTA appears.
   foot.querySelectorAll('a').forEach(a=>{if(a.href.includes('github.com'))a.remove()});
   if(SITES[name])siteLink(name,SITES[name],foot);
 }
 const catalogue=document.querySelector('.catalogue');
 if(catalogue){
   const apps=catalogue.querySelector('[data-category="applications"] .catalogue-grid');
   const engineering=catalogue.querySelector('[data-category="engineering"] .catalogue-grid');
   function addCard(target,name,tag,desc,url,cls){
     if(!target||[...target.querySelectorAll('h2')].some(x=>x.textContent.trim()===name))return;
     const a=document.createElement('a');a.className='catalogue-card '+cls;a.href=url;
     a.innerHTML='<span class="visual"><span class="visual-monogram" aria-hidden="true"></span></span><h2></h2><p></p><small></small>';
     a.querySelector('h2').textContent=name;a.querySelector('p').textContent=desc;a.querySelector('small').textContent=tag;target.append(a);
   }
   addCard(apps,'Writing Assistant','In development','A local, non-generative Python writing companion for clearer language and vocabulary.','products/writing-assistant.html','writing');
   addCard(engineering,'Toolbox','Project details','A collection of practical tools and utilities.','products/toolbox.html','toolbox');
   const dailyCard=[...document.querySelectorAll('.catalogue-card')].find(a=>a.querySelector('h2')?.textContent==='Space Daily');
   if(dailyCard){
     dailyCard.querySelector('small').textContent='Available online';
     dailyCard.querySelector('p').textContent='Daily space stories, NASA imagery, discoveries and guided learning.';
   }
   const radar=[...document.querySelectorAll('.catalogue-card')].find(a=>a.querySelector('h2')?.textContent.includes('Radar'));
   if(radar)radar.querySelector('p').textContent='A curated view of developments in semiconductor technology and artificial intelligence.';
 }
 // Contact page/section: no GitHub address; do not invent email or LinkedIn URLs.
 document.querySelectorAll('#contact').forEach(s=>{
   s.innerHTML='<p class="eyebrow">Contact</p><h2>Connect with the studio.</h2><p>For future collaborations and enquiries, our contact channels will appear here.</p><div class="contact-pending"><span>Email — coming soon</span><span>LinkedIn — coming soon</span></div>';
 });
 const isStudio=location.pathname.endsWith('studio.html');
 if(isStudio){
   const story=document.querySelector('.story-grid');
   if(story){
     const sections=story.querySelectorAll('section');
     sections.forEach(sec=>{
       sec.querySelectorAll('p').forEach(p=>p.style.maxWidth='68ch');
       // Remove unnecessarily self-referential privacy policy from public biography.
       if(sec.querySelector('h2')?.textContent==='The Founder'){
         const ps=sec.querySelectorAll('p'); if(ps[1])ps[1].textContent='This engineering perspective informs the way the studio develops clear, useful and approachable technology.';
       }
     });
   }
 }
})();
