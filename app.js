const foundation=[
["♡","লক্ষ্য ও উদ্দেশ্য","মানবিক সহায়তা, শিক্ষা ও সামাজিক কল্যাণে কাজ করা।"],
["♧","দরিদ্র পরিবার সহায়তা","অসহায় ও নিম্নআয়ের পরিবারের পাশে দাঁড়ানো।"],
["☼","এতিম সহায়তা","এতিম শিশুদের যত্ন ও সহযোগিতার উদ্যোগ।"],
["▤","শিক্ষাবৃত্তি","মেধাবী ও অসচ্ছল শিক্ষার্থীদের সহায়তা।"],
["✚","চিকিৎসা সহায়তা","প্রয়োজনীয় চিকিৎসা সহায়তায় পাশে থাকা।"],
["⌁","দুর্যোগ ও ত্রাণ","দুর্যোগে জরুরি সহায়তা ও পুনর্বাসন।"]
];

const prayerGrid=document.getElementById("prayerGrid");
function showPrayerMessage(message){
  prayerGrid.replaceChildren();
  const card=document.createElement("div");
  card.className="prayer-card";
  card.style.gridColumn="1 / -1";
  card.style.textAlign="left";
  const heading=document.createElement("b");
  heading.textContent="যাচাইকৃত নামাজের সময়সূচি";
  const body=document.createElement("p");
  body.textContent=message;
  body.style.whiteSpace="pre-wrap";
  body.style.margin="8px 0 0";
  card.append(heading,body);
  prayerGrid.append(card);
}
showPrayerMessage("প্রকৃত স্থানীয় জামাতের সময় প্রশাসক যাচাই করে প্রকাশ করলে এখানে দেখা যাবে।");

async function loadPrayerSchedule(){
  const cfg=window.MOSQUE_APPWRITE_CONFIG||{};
  if(!cfg.endpoint||!cfg.projectId||!cfg.databaseId||!cfg.tableId)return;
  try{
    const {Client,TablesDB}=await import("https://cdn.jsdelivr.net/npm/appwrite@17.0.0/+esm");
    const client=new Client().setEndpoint(cfg.endpoint).setProject(cfg.projectId);
    const db=new TablesDB(client);
    const row=await db.getRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:"module-04"});
    if(row.published&&typeof row.content==="string"&&row.content.trim()){
      showPrayerMessage(row.content.trim());
    }
  }catch(error){
    // Keep the safe placeholder if Appwrite is not connected or the row is not published.
  }
}
loadPrayerSchedule();

document.getElementById("foundationCards").innerHTML=foundation.map(([i,n,d])=>`<article class="info-card"><span>${i}</span><h3>${n}</h3><p>${d}</p></article>`).join("");
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
