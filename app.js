const foundation=[
["♡","লক্ষ্য ও উদ্দেশ্য","মানবিক সহায়তা, শিক্ষা ও সামাজিক কল্যাণে কাজ করার প্রত্যয়।",15],
["♧","দরিদ্র পরিবার সহায়তা","অসহায় ও নিম্নআয়ের পরিবারের পাশে দাঁড়ানোর উদ্যোগ।",16],
["☼","এতিম সহায়তা","এতিম শিশুদের শিক্ষা ও কল্যাণে সহযোগিতার লক্ষ্য।",17],
["▤","শিক্ষাবৃত্তি","শিক্ষার্থীদের পাশে দাঁড়ানোর পরিকল্পনা।",18],
["✚","চিকিৎসা সহায়তা","অসচ্ছল মানুষের চিকিৎসা সহায়তার উদ্যোগ।",19],
["⌁","দুর্যোগ ও ত্রাণ","দুর্যোগে জরুরি সহায়তা ও পুনর্বাসনের প্রত্যয়।",20]
];
const prayerGrid=document.getElementById("prayerGrid");
function showPrayerMessage(message){prayerGrid.replaceChildren();const card=document.createElement("div");card.className="prayer-card";card.style.gridColumn="1 / -1";card.style.textAlign="left";const h=document.createElement("b");h.textContent="নামাজের সময়সূচি";const p=document.createElement("p");p.textContent=message;p.style.whiteSpace="pre-wrap";p.style.margin="8px 0 0";card.append(h,p);prayerGrid.append(card);}
function parse(raw){const value=Array.isArray(raw)?(raw[0]||"{}"):(raw||"{}");try{const d=JSON.parse(value);return d&&typeof d==="object"?d:{details:value};}catch{return {details:value};}}
function fillText(id,value){const el=document.getElementById(id);if(el&&value)el.textContent=value;}
function titleText(value,fallback=""){return Array.isArray(value)?(value.filter(Boolean).join(" ")||fallback):(value||fallback)}
function card(parent,icon,title,description,href){const a=document.createElement("a");a.className="info-card";a.href=href;const i=document.createElement("span");i.textContent=icon;const h=document.createElement("h3");h.textContent=title;const p=document.createElement("p");p.textContent=description;a.append(i,h,p);parent.append(a);}

const moduleNames=["হোমপেজ","মসজিদের পরিচিতি","মসজিদের ইতিহাস","নামাজের সময়সূচি","আজানের সময়সূচি","জুমার নামাজের সময়","ইমাম ও খতিব পরিচিতি","পরিচালনা কমিটি","নোটিশ বোর্ড","অনুষ্ঠানসূচি","ফটো গ্যালারি","ভিডিও গ্যালারি","জুমার খুতবা আর্কাইভ","ফাউন্ডেশন পরিচিতি","লক্ষ্য ও উদ্দেশ্য","দরিদ্র পরিবার সহায়তা","এতিম সহায়তা","শিক্ষাবৃত্তি ব্যবস্থাপনা","চিকিৎসা সহায়তা","দুর্যোগ ও ত্রাণ কার্যক্রম"];
const fieldNames={intro:"পরিচিতি",summary:"সারসংক্ষেপ",details:"বিস্তারিত",effectiveDate:"কার্যকর তারিখ",fajr:"ফজর",sunrise:"সূর্যোদয়",dhuhr:"যোহর",asr:"আসর",maghrib:"মাগরিব",isha:"এশা",subject:"বিষয়",noticeDate:"তারিখ",noticeBody:"বিজ্ঞপ্তি",deadline:"শেষ তারিখ",eventName:"অনুষ্ঠান",eventDate:"তারিখ",startTime:"শুরুর সময়",venue:"স্থান",eventDetails:"বিবরণ",albumTitle:"অ্যালবাম",photoDate:"ছবির তারিখ",photoCaption:"বিবরণ",videoTitle:"ভিডিও",videoDate:"ভিডিওর তারিখ",videoDescription:"বিবরণ",mission:"পরিচিতি",vision:"লক্ষ্য",objectives:"উদ্দেশ্য",principles:"নীতিমালা",programmeName:"কর্মসূচি",eligibility:"যোগ্যতা",applicationSteps:"আবেদনের ধাপ",supportTypes:"সহায়তার ধরন",scholarshipName:"বৃত্তির নাম",amount:"সহায়তার পরিমাণ",medicalProgramme:"চিকিৎসা কর্মসূচি",coveredTreatment:"চিকিৎসার ধরন",reliefCampaign:"ত্রাণ কর্মসূচি",reliefItems:"ত্রাণসামগ্রী",affectedArea:"ক্ষতিগ্রস্ত এলাকা",personName:"নাম",role:"দায়িত্ব",phone:"যোগাযোগ"};
function appendFeedValue(host,label,value){
 const line=document.createElement("p");line.className="published-field";const b=document.createElement("b");b.textContent=label+": ";line.append(b);
 if(/^https?:\/\//i.test(value)){const a=document.createElement("a");a.href=value;a.target="_blank";a.rel="noopener noreferrer";a.textContent="লিংক দেখুন";line.append(a)}else line.append(document.createTextNode(value));
 host.append(line);
}
async function loadPublishedFeed(db,storage,cfg,Query){
 const host=document.getElementById("publishedFeed");if(!host)return;
 try{
  const result=await db.listRows({databaseId:cfg.databaseId,tableId:cfg.tableId,queries:[Query.equal("published",true),Query.orderDesc("$updatedAt"),Query.limit(500)]});
  const posts=(result.rows||[]).filter(r=>r.published).sort((a,b)=>String(b.$updatedAt||"").localeCompare(String(a.$updatedAt||"")));
  host.replaceChildren();
  if(!posts.length){const empty=document.createElement("p");empty.className="empty-state";empty.textContent="এখনো কোনো তথ্য প্রকাশ করা হয়নি।";host.append(empty);return}
  const liveModules=new Set(posts.map(r=>Number(r.moduleId)));
  const sampleModules=moduleNames.map((name,index)=>({$id:"sample-"+(index+1),moduleId:index+1,title:["নমুনা তথ্য — "+name],content:[JSON.stringify({sampleLabel:"নমুনা তথ্য",details:"এই বিভাগে "+name+" সংক্রান্ত যাচাইকৃত তথ্য প্রশাসক প্রকাশ করবেন। এটি কেবল প্রদর্শন ও কনটেন্ট প্রস্তুতির নমুনা; কোনো বাস্তব ঘটনা, ব্যক্তি, সময়সূচি বা আর্থিক হিসাব নয়।"})],published:true,$updatedAt:""})).filter(r=>!liveModules.has(r.moduleId));
  posts.push(...sampleModules);
  for(const row of posts){
   const n=Number(row.moduleId)||1,d=parse(row.content),article=document.createElement("article");article.className="published-card";
   const tag=document.createElement("span");tag.className="published-category";tag.textContent=moduleNames[n-1]||"প্রকাশিত তথ্য";article.append(tag);
   const h=document.createElement("h3");h.textContent=titleText(row.title,moduleNames[n-1]||"প্রকাশিত তথ্য");article.append(h);
   const date=d.photoDate||d.videoDate||d.noticeDate||d.eventDate||d.distributionDate||d.sermonDate||d.effectiveDate||"";
   if(date){const time=document.createElement("small");time.className="published-date";time.textContent="তারিখ: "+date;article.append(time)}
   let fields=0;
   for(const [key,value] of Object.entries(d)){
    if(!value||key==="videoFile"||key==="photos"||key==="thumbnail"||key==="fieldPhotos"||key==="eventPoster"||key==="noticeImage"||key==="foundationLogo"||key==="programmeImage"||key==="programmePhoto"||key==="committeePhoto"||key==="photoDate"||key==="videoDate"||key==="noticeDate"||key==="eventDate"||key==="distributionDate"||key==="sermonDate")continue;
    if(Array.isArray(value)){if(value.every(x=>x&&x.fileId))continue;const txt=value.filter(x=>typeof x==="string").join(", ");if(txt){appendFeedValue(article,fieldNames[key]||key,txt);fields++}continue}
    if(typeof value==="string"||typeof value==="number"||typeof value==="boolean"){appendFeedValue(article,fieldNames[key]||key,String(value));fields++}
   }
   const media=Object.values(d).flat().filter(x=>x&&x.fileId&&x.mimeType);
   for(const file of media){
    try{const url=storage.getFileView({bucketId:cfg.storageBucketId,fileId:file.fileId});
     if(file.mimeType.startsWith("image/")){const img=document.createElement("img");img.className="published-image";img.src=url;img.alt=file.name||"প্রকাশিত ছবি";img.loading="lazy";article.append(img)}
     else if(file.mimeType.startsWith("video/")){const video=document.createElement("video");video.className="published-video";video.src=url;video.controls=true;video.preload="metadata";video.playsInline=true;article.append(video)}
    }catch(e){/* Keep text available if a media preview cannot load. */}
   }
   const link=document.createElement("a");link.className="published-more";link.href="module.html?id="+n;link.textContent="বিস্তারিত দেখুন →";article.append(link);host.append(article);
  }
 }catch(e){host.replaceChildren();const err=document.createElement("p");err.className="empty-state";err.textContent="প্রকাশিত তথ্য এখন লোড করা যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।";host.append(err);console.error("Homepage published feed:",e)}
}

async function loadHomepage(){
 const cfg=window.MOSQUE_APPWRITE_CONFIG||{};if(!cfg.projectId||!cfg.databaseId||!cfg.tableId)return;
 try{
  const {Client,TablesDB,Storage,Query}=await import("https://cdn.jsdelivr.net/npm/appwrite@29.2.0/+esm");
  const client=new Client().setEndpoint(cfg.endpoint).setProject(cfg.projectId);
  const db=new TablesDB(client),storage=new Storage(client);
  await loadPublishedFeed(db,storage,cfg,Query);
  const ids=[1,4,9,10,14,15,16,17,18,19,20];
  const records=await Promise.all(ids.map(async n=>{try{return await db.getRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:"module-"+String(n).padStart(2,"0")});}catch{return null;}}));
  const byId=new Map(records.filter(x=>x&&x.published).map(x=>[x.moduleId||Number(x.$id.slice(-2)),x]));
  const intro=byId.get(1);if(intro){const d=parse(intro.content);fillText("homeIntro",d.intro||d.summary||d.details);if(intro.title)fillText("homeIntroTitle",titleText(intro.title));}
  const prayer=byId.get(4);if(prayer){const d=parse(prayer.content);const schedule=[["fajr","ফজর"],["sunrise","সূর্যোদয়"],["dhuhr","যোহর"],["asr","আসর"],["maghrib","মাগরিব"],["isha","এশা"]].filter(([k])=>d[k]).map(([k,n])=>n+": "+d[k]);showPrayerMessage([d.effectiveDate,...schedule,d.scheduleNote].filter(Boolean).join("\n")||"সময় সংক্রান্ত তথ্য এখনো দেওয়া হয়নি।");}
  const notice=byId.get(9),noticeHost=document.getElementById("noticeContent");if(notice&&noticeHost){const d=parse(notice.content);noticeHost.textContent=[d.subject,d.noticeDate,d.noticeBody,d.deadline].filter(Boolean).join("\n")||"নতুন ঘোষণা প্রকাশিত হলে এখানে দেখা যাবে।";}
  const event=byId.get(10),eventHost=document.getElementById("eventContent");if(event&&eventHost){const d=parse(event.content);eventHost.textContent=[d.eventName,d.eventDate,d.startTime,d.venue,d.eventDetails].filter(Boolean).join("\n")||"আসন্ন আয়োজনের তথ্য প্রকাশিত হলে এখানে দেখা যাবে।";}
  const foundationHost=document.getElementById("foundationCards");if(foundationHost){foundationHost.replaceChildren();for(const [ic,name,desc,n] of foundation){const row=byId.get(n),d=row?parse(row.content):{};card(foundationHost,ic,titleText(row?.title,name),d.mission||d.vision||d.programmeName||d.scholarshipName||desc,"module.html?id="+n);}}
 }catch(e){/* Safe static placeholders remain visible when the service is unavailable. */}
}
document.getElementById("foundationCards").replaceChildren();foundation.forEach(([i,n,d,id])=>card(document.getElementById("foundationCards"),i,n,d,"module.html?id="+id));
showPrayerMessage("প্রকৃত স্থানীয় জামাতের সময় প্রশাসক যাচাই করে প্রকাশ করলে এখানে দেখা যাবে।");
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
loadHomepage();