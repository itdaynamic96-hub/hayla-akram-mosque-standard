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
function parse(raw){try{const d=JSON.parse(raw||"{}");return d&&typeof d==="object"?d:{details:raw||""};}catch{return {details:raw||""};}}
function fillText(id,value){const el=document.getElementById(id);if(el&&value)el.textContent=value;}
function titleText(value,fallback=""){return Array.isArray(value)?(value.filter(Boolean).join(" ")||fallback):(value||fallback)}
function card(parent,icon,title,description,href){const a=document.createElement("a");a.className="info-card";a.href=href;const i=document.createElement("span");i.textContent=icon;const h=document.createElement("h3");h.textContent=title;const p=document.createElement("p");p.textContent=description;a.append(i,h,p);parent.append(a);}
async function loadHomepage(){
 const cfg=window.MOSQUE_APPWRITE_CONFIG||{};if(!cfg.projectId||!cfg.databaseId||!cfg.tableId)return;
 try{
  const {Client,TablesDB}=await import("https://cdn.jsdelivr.net/npm/appwrite@29.2.0/+esm");
  const db=new TablesDB(new Client().setEndpoint(cfg.endpoint).setProject(cfg.projectId));
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