const prayers=[["ফজর","৫:০০"],["জোহর","১:১৫"],["আসর","৪:১৫"],["মাগরিব","৫:৩০"],["এশা","৭:৩০"]];
const foundation=[["♡","লক্ষ্য ও উদ্দেশ্য","মানবিক সহায়তা, শিক্ষা ও সামাজিক কল্যাণে কাজ করা।"],["♧","দরিদ্র পরিবার সহায়তা","অসহায় ও নিম্নআয়ের পরিবারের পাশে দাঁড়ানো।"],["☼","এতিম সহায়তা","এতিম শিশুদের যত্ন ও সহযোগিতার উদ্যোগ।"],["▤","শিক্ষাবৃত্তি","মেধাবী ও অসচ্ছল শিক্ষার্থীদের সহায়তা।"],["✚","চিকিৎসা সহায়তা","প্রয়োজনীয় চিকিৎসা সহায়তায় পাশে থাকা।"],["⌁","দুর্যোগ ও ত্রাণ","দুর্যোগে জরুরি সহায়তা ও পুনর্বাসন।"]];
document.getElementById("prayerGrid").innerHTML=prayers.map(([n,t])=>`<div class="prayer-card"><b>${n}</b><strong>${t}</strong></div>`).join("");
document.getElementById("foundationCards").innerHTML=foundation.map(([i,n,d])=>`<article class="info-card"><span>${i}</span><h3>${n}</h3><p>${d}</p></article>`).join("");
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));