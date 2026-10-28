/* Tesseratrix V3 enhancement. Designed to follow the existing script.js and v2.css. */
(()=>{
const isProduct=location.pathname.includes('/products/');
const base=isProduct?'../':'';
const stylesheet=document.createElement('link');stylesheet.rel='stylesheet';stylesheet.href=base+'v3.css';document.head.append(stylesheet);
const assets=base+'assets/';
const replaceVisual=(selector,file,alt)=>document.querySelectorAll(selector).forEach(e=>{e.innerHTML='';const im=document.createElement('img');im.src=assets+file;im.alt=alt;e.append(im)});
// Default assets retained for Space Daily and Space Game. Remove all decorative overlays in v3.css.
replaceVisual('.meal .visual,.detail-art.meal','meal-planner-concept.png','Concept illustration of a weekly meal planning interface');
replaceVisual('.pomodoro .visual,.detail-art.pomodoro','pomodoro-concept.png','Concept illustration of the tomato inside a circular focus timer');
// The saved homepage is enhanced without changing its underlying markup or navigation.
document.querySelectorAll('.brand').forEach(a=>{const t=a.querySelector('span:last-child');if(t)t.textContent='TESSERATRIX STUDIO';});
document.querySelectorAll('.header-note,.hero-list').forEach(e=>e.remove());
const hero=document.querySelector('.hero h1');if(hero)hero.innerHTML='Where engineering<br>meets imagination.';
const intro=document.querySelector('.hero .intro');if(intro)intro.textContent='An independent technology studio creating thoughtful software, interactive learning experiences, and simulations for a more curious world.';
const eyebrow=document.querySelector('.hero .eyebrow');if(eyebrow)eyebrow.textContent='Independent technology & engineering studio';
const about=document.querySelector('.home-studio h2');if(about)about.innerHTML='Curiosity leads<br>to creation.';
const aboutText=document.querySelector('.home-studio>p');if(aboutText)aboutText.innerHTML='Tesseratrix Studio brings engineering experience and creative thinking together. We build practical applications, educational platforms, and interactive simulations that turn ideas into useful experiences. <a class="text-link" href="studio.html">Our story →</a>';
const data={
 daily:['Digital platform','A fresh way to explore space through NASA discoveries, visual stories and bite-sized learning.'],
 space:['Games & simulations','Explore satellites and engineering mechanisms through interactive 3D learning.'],
 meal:['Application','Make weekly meal planning easier, with recipes, nutrition goals and shopping lists.'],
 pomodoro:['Application','A gentle focus timer, built around a cheerful tomato and calmer work sessions.']
};
document.querySelectorAll('.product-card').forEach(card=>{
 const key=Object.keys(data).find(k=>card.classList.contains(k));if(!key)return;
 card.querySelectorAll('small,.tag,.description').forEach(x=>x.remove());
 const tag=document.createElement('span');tag.className='tag';tag.textContent=data[key][0];
 const name=card.querySelector('.product-title');if(name)name.before(tag);
 const para=document.createElement('p');para.className='description';para.textContent=data[key][1];card.append(para);
});
// Legacy product detail pages vary: put the current, useful information in one consistent layout.
const specs={
 'Space Daily':{type:'Digital platform',summary:'Space science, discoveries and learning in one inviting destination.',intro:'Space Daily brings together NASA news, remarkable imagery and structured learning for anyone who wants to understand the universe, one discovery at a time.',sections:[['Explore at your own pace','Read a carefully selected daily briefing, discover space missions, and explore space imagery without needing to search across multiple sites.'],['Learn by doing','Short lessons and quizzes offer a path from curiosity to understanding, whether you are a complete beginner or returning to science.'],['What is available','NASA news, discovery stories, curated imagery, learning paths and personal topic preferences are part of the project. Features evolve as the platform develops.']],link:'https://github.com/dhanya-stack/Space-Daily',linkText:'Explore the public repository',art:'space-daily-nebula.jpg'},
 'Space Game':{type:'Games & simulations',summary:'Discover the engineering behind spacecraft through interactive exploration.',intro:'An educational 3D simulation beginning with a satellite and its deployable solar arrays. It explores how mechanical systems move, unfold and work together.',sections:[['Inspect a spacecraft','Learn the purpose of components such as the spacecraft bus, optical payload and deployable arrays through a detailed 3D model.'],['See engineering in motion','Explore the sequence and kinematics behind solar-array deployment, including hinges, folding and motion.'],['A growing learning environment','The longer-term vision includes mission planning, satellite building and other space engineering challenges. These are goals, not released features.']],art:'space-game-concept.png',concept:true},
 'Meal Planner':{type:'Application',summary:'Less daily decision-making. More organised meals.',intro:'A meal-planning concept to help people organise food choices, consider nutrition goals and prepare shopping lists with less effort.',sections:[['Plan the week','Explore meal ideas and build a more manageable weekly food routine rather than deciding what to cook each day.'],['Make food decisions simpler','The project explores food preferences, calories, protein and shopping preparation in a single, approachable interface.'],['Still being developed','The current application is a work in progress. Screens and features shown here are illustrative and may change.']],art:'meal-planner-concept.png',concept:true},
 'Pomodoro':{type:'Application',summary:'A little tomato for a calmer, more focused day.',intro:'A playful focus timer that turns work sessions into something approachable: a friendly red tomato sits inside the progress ring while time passes.',sections:[['Focus without the fuss','Start a timed focus session, take a break, and return to work with fewer distractions.'],['A friendly visual companion','The tomato and circular countdown give the timer personality without crowding the screen.'],['Made to feel gentle','Simple controls, accessible typography and a restrained interface keep attention on the task. The product is still in development.']],art:'pomodoro-concept.png',concept:true}
};
const detail=document.querySelector('main.detail');if(detail){
 const name=detail.querySelector('h1')?.textContent?.trim();const d=specs[name];if(d){
 detail.replaceChildren();
 const crumb=document.createElement('p');crumb.className='eyebrow';crumb.textContent=d.type+' · In development';detail.append(crumb);
 const heading=document.createElement('h1');heading.textContent=name;detail.append(heading);
 const summary=document.createElement('p');summary.className='intro';summary.textContent=d.summary;detail.append(summary);
 const art=document.createElement('div');art.className='detail-art';const im=document.createElement('img');im.src=assets+d.art;im.alt=d.concept?'Illustrative concept image for '+name:'Space Daily product imagery';art.append(im);detail.append(art);
 if(d.concept){const notice=document.createElement('p');notice.className='caption';notice.textContent='Concept illustration · not a screenshot of a released product';detail.append(notice)}
 const lead=document.createElement('p');lead.className='page-intro';lead.textContent=d.intro;detail.append(lead);
 const sections=document.createElement('div');sections.className='detail-section';d.sections.forEach(([h,b])=>{const sec=document.createElement('section');const heading=document.createElement('h2');heading.textContent=h;const para=document.createElement('p');para.textContent=b;sec.append(heading,para);sections.append(sec)});detail.append(sections);
 const status=document.createElement('p');status.className='status-note';status.textContent='Currently in development';detail.append(status);
 const links=document.createElement('div');links.className='detail-foot';if(d.link){const a=document.createElement('a');a.className='button';a.href=d.link;a.target='_blank';a.rel='noopener noreferrer';a.textContent=d.linkText+' ↗';links.append(a)}const back=document.createElement('a');back.className='text-link';back.href='../products.html';back.textContent='← Explore all products';links.append(back);detail.append(links);
 }
}
})();
