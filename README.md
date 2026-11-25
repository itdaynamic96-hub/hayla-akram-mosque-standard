# সাকছিপাড়া শায়লা আকরাম কেন্দ্রীয় জামে মসজিদ ও ফাউন্ডেশন

A separate 20-module mosque and foundation website.

## ২০টি মডিউল

### মসজিদ — ১৩টি
1. হোমপেজ
2. মসজিদের পরিচিতি
3. মসজিদের ইতিহাস
4. নামাজের সময়সূচি
5. আজানের সময়সূচি
6. জুমার নামাজের সময়
7. ইমাম ও খতিব পরিচিতি
8. পরিচালনা কমিটি
9. নোটিশ বোর্ড
10. অনুষ্ঠানসূচি
11. ফটো গ্যালারি
12. ভিডিও গ্যালারি
13. জুমার খুতবা আর্কাইভ

### ফাউন্ডেশন — ৭টি
14. ফাউন্ডেশন পরিচিতি
15. লক্ষ্য ও উদ্দেশ্য
16. দরিদ্র পরিবার সহায়তা
17. এতিম সহায়তা
18. শিক্ষাবৃত্তি ব্যবস্থাপনা
19. চিকিৎসা সহায়তা
20. দুর্যোগ ও ত্রাণ কার্যক্রম

## Implemented

- Responsive Bengali public homepage.
- Exactly 20 module links and module detail routes.
- Appwrite client configuration placeholder for a **new, separate project**.
- Admin login page restricted in code to members of a configured Appwrite Team.
- Admin dashboard provides a distinct, purpose-built data-entry form for each of the 20 modules. URL fields are separate from image-upload fields. Public media uploads use a dedicated Appwrite Storage bucket (`mosque20_media`) with public-read files and admin-team-only writes. Images are limited to 8 MB each; the video gallery accepts direct MP4/WebM uploads up to 50 MB each and YouTube/external video URLs.
- Homepage displays published introduction, prayer schedule, notices, events, and foundation programme summaries from Appwrite.
- Public module pages load published text content from Appwrite.
- Setup guide: [APPWRITE_SETUP_BN.md](APPWRITE_SETUP_BN.md).

## Appwrite setup status

- The separate Appwrite Project, Database, Table, columns, Admin Team, admin membership, table permissions, and public client configuration have been created.
- The GitHub Pages hostname `itdaynamic96-hub.github.io` is already registered as an Appwrite Web platform and was verified by the public API/CORS smoke test.
- No real prayer times, historical facts, contact details, or other factual mosque content have been invented.
- See [APPWRITE_SETUP_BN.md](APPWRITE_SETUP_BN.md) for the current state and the one remaining Console step.
- Direct image and video uploads are supported by the admin code. Configure the existing `mosque20_media` Storage bucket for a 50 MB maximum and allow `jpg,jpeg,png,webp,gif,mp4,webm`; the admin code separately limits images to 8 MB and videos to 50 MB. See `APPWRITE_SETUP_BN.md`.
- Public aid/scholarship/medical application intake, case review, donation/payment processing, accounting, and staff role management require separate private tables, permissions, and workflows; they are not enabled yet.

## Security notes

- Never put an Appwrite API key or server secret in browser files or GitHub.
- Public users receive read-only access. Only the configured Appwrite Admin Team should receive create/update/delete permissions.
- Do not reuse the old 15-module or 60-module project credentials or databases.

## Local preview

Open `index.html` in a browser. Appwrite-backed pages require the Appwrite setup steps above and a web origin registered in Appwrite.
