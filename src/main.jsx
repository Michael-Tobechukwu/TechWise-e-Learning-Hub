import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft, ArrowRight, Award, BookOpen, CheckCircle2, ChevronRight,
  CircleHelp, Clock3, Gamepad2, GraduationCap, Home, Lock, Menu,
  PlayCircle, RotateCcw, Sparkles, Target, Trophy, Users, X
} from "lucide-react";
import "./styles.css";

const lessons = [
  {id:1, topic:"Computer Animation", icon:"🎬", title:"What is Computer Animation?", desc:"Discover frames, sequences, movement and uses of animation.", badge:"Animation Explorer", xp:100},
  {id:2, topic:"Computer Animation", icon:"🧩", title:"Types of Computer Animation", desc:"Explore 2D, 3D and motion graphics.", badge:"Animation Classifier", xp:100},
  {id:3, topic:"Computer Animation", icon:"🛠️", title:"Applications for Creating Computer Animation", desc:"Match animation tasks with the right applications.", badge:"Animation Tool Explorer", xp:150},
  {id:4, topic:"Computer Animation", icon:"🌎", title:"Creating a 3D World in Alice 3", desc:"Plan and build your own 3D virtual world.", badge:"3D World Builder", xp:300},
  {id:5, topic:"Computer Hardware", icon:"🖥️", title:"What is Computer Hardware?", desc:"Meet input, output, storage and processing hardware.", badge:"Hardware Explorer", xp:100},
  {id:6, topic:"Computer Hardware", icon:"⌨️", title:"Input and Output Devices", desc:"Learn how computers receive and produce information.", badge:"Device Detective", xp:150},
  {id:7, topic:"Computer Hardware", icon:"💾", title:"Storage and Processing", desc:"Explore CPU, GPU, RAM and storage devices.", badge:"Memory Master", xp:200},
  {id:8, topic:"Computer Software", icon:"💻", title:"What is Computer Software?", desc:"Discover software and how it works with hardware.", badge:"Software Explorer", xp:100},
  {id:9, topic:"Computer Software", icon:"⚙️", title:"Operating Systems", desc:"Identify desktop and mobile operating systems.", badge:"OS Detective", xp:150},
  {id:10, topic:"Computer Software", icon:"📱", title:"Application Software", desc:"Explore productivity, communication, entertainment and creative apps.", badge:"App Expert", xp:200},
  {id:11, topic:"Computer Software", icon:"🌐", title:"Where Applications Run", desc:"Discover desktop, mobile and web platforms.", badge:"Digital Platform Explorer", xp:200}
];

const topicMeta = {
  "Computer Animation": {emoji:"🎬", color:"orange", lessons:[1,2,3,4]},
  "Computer Hardware": {emoji:"🖥️", color:"blue", lessons:[5,6,7]},
  "Computer Software": {emoji:"💻", color:"purple", lessons:[8,9,10,11]}
};

const lessonData = {
1:{
 objectives:["Define computer animation.","Explain what a frame and sequence are.","Identify uses of animation.","Distinguish traditional and computer animation."],
 vocab:["Animation","Computer animation","Frame","Sequence"],
 video:"How Do Pictures Come Alive?",
 learn:[
  "Animation makes still pictures appear to move.",
  "Computer animation is created using computer applications and tools.",
  "A frame is a single picture in an animation. A sequence is a set of frames arranged in order.",
  "Animation is used in education, entertainment and video games, movies and TV, and advertisements."
 ],
 activity:{type:"order",title:"Build the Animation",instruction:"Put the frames in the order that best shows the object moving.",items:["Frame 1: ball is on the left","Frame 2: ball moves a little","Frame 3: ball is in the middle","Frame 4: ball moves right","Frame 5: ball is on the right"]},
 quiz:[
  ["What is computer animation?",["Creating moving pictures using computers","A computer keyboard","A type of printer","A computer that cannot move"],0,"Computer animation uses computers to create the appearance of movement."],
  ["A single picture in an animation is called a:",["Folder","Frame","Sequence","Program"],1,"A frame is one picture in an animation."],
  ["A group of frames arranged in order is a:",["Mouse","Screen","Sequence","Keyboard"],2,"A sequence is a set of frames arranged in order."],
  ["Which is a use of animation?",["Education","Washing clothes","Cleaning a keyboard","Cooking rice"],0,"Animation can be used in education."]
 ]},
2:{
 objectives:["Define 2D animation.","Define 3D animation.","Define motion graphics.","Classify examples of animation."],
 vocab:["2D","3D","Motion graphics","Depth"],
 video:"2D, 3D or Motion Graphics?",
 learn:["2D animation is flat and has height and width.","3D animation has height, width and depth, so objects can appear solid.","Motion graphics animate text, shapes, logos and other designs."],
 activity:{type:"classify",title:"Animation Sorter",instruction:"Choose the correct type for each example.",items:[
  ["A flat cartoon drawing","2D"],["A solid-looking character","3D"],["An animated logo","Motion graphics"],["Moving text","Motion graphics"],["A flat cartoon story","2D"]
 ]},
 quiz:[
  ["Which type is flat?",["2D","3D","Motion graphics","All of them"],0,"2D animation is flat."],
  ["Which type includes depth?",["2D","3D","Motion graphics","None"],1,"3D includes height, width and depth."],
  ["Animated logos are examples of:",["3D","2D","Motion graphics","Hardware"],2,"Motion graphics can animate logos and designs."],
  ["Which type can make an object appear solid?",["2D","3D","Motion graphics","None"],1,"3D animation includes depth."]
 ]},
3:{
 objectives:["Identify applications used to create animation.","Match applications with uses.","Explain why different applications can be used for different tasks."],
 vocab:["Application","Virtual world","2D","3D"],
 video:"Which App Creates Animation?",
 learn:["Alice 3 can be used to create 3D virtual worlds.","Scratch can be used to create 2D stories and games.","Blender is used for detailed 3D work. Other examples in the textbook include Adobe Animate, Powtoon, Toon Boom Harmony and Autodesk Maya."],
 activity:{type:"match",title:"Match the Animation Tool",instruction:"Choose the best application for each task.",items:[
  ["Create a 3D virtual world",["Alice 3","Scratch","Powtoon"],0],
  ["Create a 2D story or game",["Blender","Scratch","Alice 3"],1],
  ["Create detailed 3D animation",["Blender","Paint","Gmail"],0],
  ["Create an animated presentation",["Powtoon","Alice 3","VLC"],0]
 ]},
 quiz:[
  ["Which application is used for 3D virtual worlds?",["Alice 3","Gmail","Excel","Chrome"],0,"Alice 3 is introduced in the textbook for creating 3D virtual worlds."],
  ["Which application can create 2D stories and games?",["Scratch","Blender","Maya","VLC"],0,"Scratch is a block-based tool for 2D stories and games."],
  ["Which application is known for detailed 3D animation?",["Blender","Gmail","Paint","Word"],0,"Blender is used for detailed 3D work."],
  ["Why can different animation applications be useful?",["Different tools are suited to different jobs","They all do exactly the same thing","Only one app can create animation","Apps are not used for animation"],0,"Different applications provide tools for different animation tasks."]
 ]},
4:{
 objectives:["Identify the Setup Scene View.","Add characters and props to a scene.","Arrange a 3D scene.","Use the camera and create simple movement.","Save an Alice 3 project."],
 vocab:["Scene","Setup Scene View","Object Gallery","Character","Prop","Camera"],
 video:"Build Your First 3D World",
 learn:["Alice 3 lets learners create 3D virtual worlds. In Setup Scene View, you can choose a background, add characters and props, arrange objects and position the camera.","For the practical project, create a scene with a background, character, prop, camera and simple movement. Save your project when you finish."],
 activity:{type:"checklist",title:"My 3D World Mission",instruction:"Complete each part of your planned Alice 3 scene.",items:["Choose a background","Add a character","Add a prop","Arrange the scene","Position the camera","Create simple movement","Save the project"]},
 quiz:[
  ["Which view is used to set up the Alice 3 scene?",["Setup Scene View","Web View","Print View","Quiz View"],0,"Setup Scene View is used to build the initial scene."],
  ["What can you add to a scene?",["Characters and props","Only text","Only printers","Only files"],0,"Characters and props are objects you can add to a scene."],
  ["What helps you decide what the viewer sees?",["Camera","Keyboard","Printer","USB"],0,"The camera determines the view of the scene."],
  ["What should you do after finishing your project?",["Save it","Delete it","Turn off the screen without saving","Print the keyboard"],0,"Save your Alice 3 project so your work is not lost."]
 ]},
5:{
 objectives:["Define computer hardware.","Identify input, output, storage and processing devices.","Explain the input → processing → output cycle."],
 vocab:["Hardware","Input","Output","Storage","Processing","CPU"],
 video:"Meet the Computer Team",
 learn:["Hardware means the physical parts of a computer that we can see and touch.","The four categories in this lesson are input, output, storage and processing.","Input sends information into the computer. Output shows information from the computer. Storage saves information. Processing works with information, with the CPU being a key processing component."],
 activity:{type:"classify",title:"Hardware Sorter",instruction:"Classify each device.",items:[
  ["Keyboard","Input"],["Mouse","Input"],["Monitor","Output"],["Printer","Output"],["USB flash drive","Storage"],["HDD","Storage"],["CPU","Processing"],["GPU","Processing"]
 ]},
 quiz:[
  ["Hardware means:",["Physical parts of a computer","Only computer programs","Only websites","Internet passwords"],0,"Hardware is the physical part of a computer."],
  ["Which category sends information into a computer?",["Input","Output","Storage","Processing"],0,"Input devices send information into a computer."],
  ["Which category saves information?",["Output","Storage","Input","Processing"],1,"Storage devices save information."],
  ["Which is a processing component?",["CPU","Monitor","Keyboard","Printer"],0,"The CPU is a processing component."]
 ]},
6:{
 objectives:["Identify common input devices.","Identify common output devices.","Explain the purpose of input and output devices.","Recognise a touchscreen as both input and output."],
 vocab:["Input device","Output device","Touchscreen","Monitor"],
 video:"How Do We Talk to a Computer?",
 learn:["Input devices help us send information into a computer. Examples include keyboard, mouse, microphone, scanner and camera/webcam.","Output devices help a computer show or produce information. Examples include monitor, printer, speakers, projector and headphones.","A touchscreen can act as both input and output."],
 activity:{type:"classify",title:"Input or Output?",instruction:"Classify each device.",items:[
  ["Keyboard","Input"],["Mouse","Input"],["Microphone","Input"],["Scanner","Input"],["Monitor","Output"],["Printer","Output"],["Speakers","Output"],["Touchscreen","Both"]
 ]},
 quiz:[
  ["Which is an input device?",["Keyboard","Monitor","Printer","Speaker"],0,"A keyboard sends information into a computer."],
  ["Which is an output device?",["Mouse","Monitor","Scanner","Microphone"],1,"A monitor displays output."],
  ["Which can be both input and output?",["Touchscreen","Printer","Keyboard","Speaker"],0,"A touchscreen displays information and receives touch input."],
  ["Which device can record sound as input?",["Microphone","Monitor","Printer","Projector"],0,"A microphone sends sound into the computer."]
 ]},
7:{
 objectives:["Identify storage devices.","Identify CPU and GPU as processing components.","Explain the basic role of RAM.","Distinguish RAM from storage."],
 vocab:["HDD","SSD","USB flash drive","RAM","CPU","GPU"],
 video:"The Computer Kitchen",
 learn:["Storage devices keep information for later. Examples include HDD, SSD, USB flash drives, memory cards and CD/DVD.","The CPU processes information. The GPU is used for graphics processing.","RAM temporarily holds information and programs that the computer is currently using. RAM is different from long-term storage."],
 activity:{type:"classify",title:"Where Does It Belong?",instruction:"Choose Processing, RAM or Storage.",items:[
  ["CPU","Processing"],["GPU","Processing"],["RAM","RAM"],["HDD","Storage"],["SSD","Storage"],["USB flash drive","Storage"]
 ]},
 quiz:[
  ["Which is a storage device?",["HDD","CPU","GPU","RAM"],0,"An HDD is used for storage."],
  ["Which is temporary memory?",["RAM","HDD","USB","CD"],0,"RAM temporarily holds current information and programs."],
  ["Which component is used for processing?",["CPU","Monitor","Keyboard","Printer"],0,"The CPU performs processing."],
  ["Which is a portable storage device?",["USB flash drive","Monitor","CPU","GPU"],0,"A USB flash drive can store and carry files."]
 ]},
8:{
 objectives:["Define computer software.","Explain how hardware and software work together.","Distinguish system software from application software.","Give examples of software."],
 vocab:["Software","System software","Application software"],
 video:"Hardware Needs Software",
 learn:["Software consists of instructions and programs that tell a computer what to do.","System software manages hardware and helps applications run. Windows is an example.","Application software performs specific tasks. Examples include Word and Chrome.","Hardware and software work together to make a computer useful."],
 activity:{type:"classify",title:"Hardware or Software?",instruction:"Classify each item.",items:[
  ["Keyboard","Hardware"],["Monitor","Hardware"],["Windows","Software"],["Microsoft Word","Software"],["Mouse","Hardware"],["Chrome","Software"]
 ]},
 quiz:[
  ["Software is:",["Programs and instructions","A physical keyboard","A monitor","A USB cable"],0,"Software is made of programs and instructions."],
  ["Which is system software?",["Windows","Word","Paint","Chrome"],0,"Windows is an operating system and system software."],
  ["Which is application software?",["Microsoft Word","Windows","A CPU","RAM"],0,"Word is application software used for a specific task."],
  ["Hardware and software:",["Work together","Never interact","Are both printers","Mean the same thing"],0,"Hardware and software work together."]
 ]},
9:{
 objectives:["Define an operating system.","Explain its role.","Identify desktop operating systems.","Identify mobile operating systems."],
 vocab:["Operating system","Windows","macOS","Linux","Chrome OS","Android","iOS"],
 video:"Meet the Operating System",
 learn:["An operating system is the main system software that manages computer hardware and helps other programs run.","Desktop examples in the textbook include Windows, macOS, Linux and Chrome OS.","Mobile examples include Android and iOS/iPadOS."],
 activity:{type:"classify",title:"Desktop or Mobile?",instruction:"Classify each operating system.",items:[
  ["Windows","Desktop"],["macOS","Desktop"],["Linux","Desktop"],["Chrome OS","Desktop"],["Android","Mobile"],["iOS/iPadOS","Mobile"]
 ]},
 quiz:[
  ["What does an operating system do?",["Manages hardware and helps programs run","Prints books only","Stores electricity","Creates keyboards"],0,"The operating system manages hardware and helps applications run."],
  ["Which is a desktop operating system?",["Windows","Android","iOS","None"],0,"Windows is a desktop operating system."],
  ["Which is a mobile operating system?",["Android","Linux","Windows","Chrome OS"],0,"Android is a mobile operating system."],
  ["Which is also a desktop OS?",["macOS","WhatsApp","YouTube","Canva"],0,"macOS is a desktop operating system."]
 ]},
10:{
 objectives:["Define application software.","Identify application categories.","Match applications with their uses."],
 vocab:["Application software","Productivity","Communication","Entertainment","Creativity","Web browser"],
 video:"There's an App for That!",
 learn:["Application software performs specific tasks.","Productivity examples include Word, Excel and PowerPoint. Communication examples include WhatsApp, Zoom and Gmail.","Entertainment examples include YouTube, Spotify and Minecraft. Creativity/Graphics examples include Canva and Paint. Web browsers include Chrome, Safari and Edge."],
 activity:{type:"classify",title:"Application Sorting Machine",instruction:"Choose the category for each application.",items:[
  ["Microsoft Word","Productivity"],["Excel","Productivity"],["WhatsApp","Communication"],["YouTube","Entertainment"],["Canva","Creativity/Graphics"],["Chrome","Web Browser"],["PowerPoint","Productivity"],["Zoom","Communication"]
 ]},
 quiz:[
  ["Which is a productivity application?",["Word","YouTube","WhatsApp","Chrome"],0,"Word is used for productivity tasks such as word processing."],
  ["Which is a communication application?",["Zoom","Excel","Paint","Minecraft"],0,"Zoom supports communication."],
  ["Which is an entertainment application?",["YouTube","Word","Canva","Chrome"],0,"YouTube is listed as entertainment."],
  ["Which is a creativity/graphics application?",["Canva","Gmail","Excel","Safari"],0,"Canva is listed under Creativity/Graphics."],
  ["Which is a web browser?",["Chrome","Word","Zoom","Minecraft"],0,"Chrome is a web browser."]
 ]},
11:{
 objectives:["Define a platform.","Identify desktop, mobile and web platforms.","Classify examples by platform.","Recognise that a service may be available on more than one platform."],
 vocab:["Platform","Desktop","Mobile","Web","Browser"],
 video:"Three Places Apps Can Live",
 learn:["A platform is the type of device or place where an application runs.","Desktop examples include Word desktop and VLC. Mobile examples include Instagram and TikTok. Web examples include Google Docs, Gmail and YouTube websites.","The same service can be available on more than one platform."],
 activity:{type:"classify",title:"Platform Sorter",instruction:"Classify each example as Desktop, Mobile or Web.",items:[
  ["Word desktop","Desktop"],["VLC","Desktop"],["Instagram app","Mobile"],["TikTok app","Mobile"],["Google Docs","Web"],["Gmail website","Web"],["YouTube website","Web"]
 ]},
 quiz:[
  ["What is a platform?",["A type of device or place where an app runs","A keyboard key","A printer cable","A computer mouse"],0,"A platform describes where an application runs."],
  ["Which is a mobile example?",["Instagram app","VLC","Word desktop","Google Docs website"],0,"Instagram can run as a mobile app."],
  ["Which is a web example?",["Google Docs","VLC","Word desktop","TikTok app"],0,"Google Docs can be accessed on the web."],
  ["Can the same service be available on more than one platform?",["Yes","No","Only on paper","Only on printers"],0,"The textbook notes that the same service can be available on multiple platforms."]
 ]}
};

const finalMissions = [
 ["Animation","Classify 2D, 3D and motion graphics examples."],
 ["Hardware","Sort devices into input, output, storage and processing."],
 ["Software","Distinguish system software and application software."],
 ["Operating Systems","Classify desktop and mobile operating systems."],
 ["Applications","Match applications with their categories."],
 ["Platforms","Classify examples as desktop, mobile or web."],
 ["Create","Complete a simple animation or Alice 3 scene project."]
];

function loadProgress(){
  try { return JSON.parse(localStorage.getItem("techwise-year4-progress")) || {completed:[], scores:{}, badges:[], xp:0, streak:1}; }
  catch { return {completed:[],scores:{},badges:[],xp:0,streak:1}; }
}
function saveProgress(p){ localStorage.setItem("techwise-year4-progress", JSON.stringify(p)); }

function App(){
 const [progress,setProgress] = useState(loadProgress);
 const [view,setView] = useState("home");
 const [lessonId,setLessonId] = useState(null);
 const [mobileOpen,setMobileOpen] = useState(false);

 useEffect(()=>saveProgress(progress),[progress]);

 const completedCount=progress.completed.length;
 const overall=Math.round(completedCount/11*100);
 const totalXp=progress.xp;
 const openLesson=(id)=>{setLessonId(id);setView("lesson");setMobileOpen(false);};

 const completeLesson=(id,score=100,bonus=0)=>{
   const l=lessons.find(x=>x.id===id);
   setProgress(p=>{
     const already=p.completed.includes(id);
     const newBadges=already?p.badges:[...p.badges,l.badge];
     return {...p,completed:already?p.completed:[...p.completed,id],scores:{...p.scores,[id]:Math.max(p.scores[id]||0,score)},badges:newBadges,xp:already?p.xp:p.xp+l.xp+bonus};
   });
 };

 return <div className="app">
   <header className="topbar">
     <button className="brand" onClick={()=>setView("home")}><span className="brand-mark">TW</span><span><b>TechWise</b><small>ICT • Year 4</small></span></button>
     <nav className={mobileOpen?"nav open":"nav"}>
       <button onClick={()=>{setView("home");setMobileOpen(false)}}><Home size={17}/> Dashboard</button>
       <button onClick={()=>{setView("course");setMobileOpen(false)}}><BookOpen size={17}/> Lessons</button>
       <button onClick={()=>{setView("badges");setMobileOpen(false)}}><Award size={17}/> Badges</button>
       <button onClick={()=>{setView("teacher");setMobileOpen(false)}}><Users size={17}/> Teacher</button>
     </nav>
     <div className="top-stats"><span>⭐ {totalXp} XP</span><span>🔥 {progress.streak} day streak</span></div>
     <button className="menu-btn" onClick={()=>setMobileOpen(!mobileOpen)}>{mobileOpen?<X/>:<Menu/>}</button>
   </header>

   {view==="home" && <Dashboard progress={progress} overall={overall} openLesson={openLesson} setView={setView}/>}
   {view==="course" && <Course progress={progress} openLesson={openLesson}/>}
   {view==="lesson" && <Lesson id={lessonId} progress={progress} completeLesson={completeLesson} openLesson={openLesson} setView={setView}/>}
   {view==="badges" && <Badges progress={progress}/>}
   {view==="teacher" && <Teacher progress={progress} overall={overall}/>}
   {view==="parent" && <Parent progress={progress} overall={overall}/>}
 </div>
}

function Dashboard({progress,overall,openLesson,setView}){
 const next=lessons.find(l=>!progress.completed.includes(l.id)) || lessons[0];
 return <main className="container">
   <section className="hero">
     <div><span className="eyebrow">WELCOME TO TECHWISE ICT</span><h1>Build digital skills.<br/><span>Learn by doing.</span></h1><p>Explore Computer Animation, Hardware and Software through short lessons, interactive challenges and projects.</p>
       <button className="primary" onClick={()=>openLesson(next.id)}>Continue Learning <ArrowRight size={18}/></button>
     </div>
     <div className="hero-art"><div className="orb orb1">💡</div><div className="orb orb2">💻</div><div className="orb orb3">🎮</div><div className="hero-card"><span>YEAR 4</span><strong>{overall}%</strong><small>course progress</small></div></div>
   </section>
   <section className="stats-grid">
    <Stat icon="📚" value={`${progress.completed.length}/11`} label="Lessons complete"/>
    <Stat icon="⭐" value={progress.xp} label="XP earned"/>
    <Stat icon="🏆" value={progress.badges.length} label="Badges earned"/>
    <Stat icon="🔥" value={`${progress.streak} days`} label="Learning streak"/>
   </section>
   <section className="section-head"><div><span className="eyebrow">YOUR JOURNEY</span><h2>Keep exploring</h2></div><button className="text-btn" onClick={()=>setView("course")}>View all lessons <ChevronRight size={17}/></button></section>
   <div className="topic-grid">{Object.entries(topicMeta).map(([name,m])=>{
     const done=m.lessons.filter(id=>progress.completed.includes(id)).length;
     return <article className={`topic-card ${m.color}`} key={name}><div className="topic-icon">{m.emoji}</div><div><span>TOPIC</span><h3>{name}</h3><p>{done}/{m.lessons.length} lessons complete</p><div className="bar"><i style={{width:`${done/m.lessons.length*100}%`}}/></div></div><button onClick={()=>openLesson(m.lessons.find(id=>!progress.completed.includes(id))||m.lessons[0])}><ArrowRight/></button></article>
   })}</div>
   <section className="continue"><div><span className="eyebrow">UP NEXT</span><h2>{next.title}</h2><p>{next.desc}</p></div><button className="secondary" onClick={()=>openLesson(next.id)}>Start lesson <ArrowRight size={17}/></button></section>
   <section className="section-head"><div><span className="eyebrow">FINAL MISSION</span><h2>Digital Technology Challenge</h2></div></section>
   <div className="final-card"><div className="final-icon">🏆</div><div><h3>Become a Digital Technology Champion</h3><p>Complete all three topics and finish the final challenge.</p></div><button className="primary" onClick={()=>setView("course")}>View course</button></div>
 </main>
}

function Stat({icon,value,label}){return <div className="stat"><span>{icon}</span><div><strong>{value}</strong><small>{label}</small></div></div>}

function Course({progress,openLesson}){
 return <main className="container narrow"><div className="page-title"><span className="eyebrow">YEAR 4 COURSE</span><h1>Building Digital Skills for the Future</h1><p>11 lessons across animation, hardware and software.</p></div>
 {Object.entries(topicMeta).map(([name,m])=><section className="course-topic" key={name}><div className="course-topic-head"><div className={`topic-icon ${m.color}`}>{m.emoji}</div><div><h2>{name}</h2><p>{m.lessons.filter(id=>progress.completed.includes(id)).length} of {m.lessons.length} complete</p></div></div>
 <div className="lesson-list">{m.lessons.map(id=>{const l=lessons.find(x=>x.id===id), done=progress.completed.includes(id);return <button className="lesson-row" key={id} onClick={()=>openLesson(id)}><span className="lesson-num">{done?<CheckCircle2/>:String(id).padStart(2,"0")}</span><span className="lesson-info"><b>{l.title}</b><small>{l.desc}</small></span><span className="lesson-xp">+{l.xp} XP</span><ChevronRight/></button>})}</div></section>)}
 </main>
}

function Lesson({id,progress,completeLesson,openLesson,setView}){
 const l=lessons.find(x=>x.id===id), d=lessonData[id];
 const [tab,setTab]=useState("learn");
 const [answers,setAnswers]=useState({});
 const [quizDone,setQuizDone]=useState(false);
 const [activityDone,setActivityDone]=useState(false);
 const [projectDone,setProjectDone]=useState(false);
 if(!l||!d) return null;
 const quizScore=Object.keys(answers).length?Math.round(Object.values(answers).filter(Boolean).length/d.quiz.length*100):0;
 const submitQuiz=()=>{setQuizDone(true);completeLesson(id,quizScore,quizScore>=90?25:0);}
 const isCompleted=progress.completed.includes(id);
 return <main className="container lesson-page">
   <button className="back-btn" onClick={()=>setView("course")}><ArrowLeft size={17}/> Back to lessons</button>
   <div className="lesson-heading"><div><span className="eyebrow">{l.topic.toUpperCase()}</span><h1>{l.title}</h1><p>{l.desc}</p></div><div className="lesson-badge"><Award/><small>Badge</small><b>{l.badge}</b></div></div>
   <div className="lesson-tabs">{[["learn","📚 Learn"],["watch","🎬 Watch"],["explore","🧩 Explore"],["play","🎮 Challenge"],["quiz","📝 Quiz"],["create","💻 Create"]].map(([key,label])=><button className={tab===key?"active":""} onClick={()=>setTab(key)} key={key}>{label}</button>)}</div>
   <div className="lesson-content">
    {tab==="learn" && <Learn d={d}/>}
    {tab==="watch" && <VideoCard title={d.video} lesson={l}/>}
    {tab==="explore" && <Activity d={d} done={activityDone} setDone={setActivityDone}/>}
    {tab==="play" && <Challenge l={l} d={d}/>}
    {tab==="quiz" && <Quiz d={d} answers={answers} setAnswers={setAnswers} quizDone={quizDone} submitQuiz={submitQuiz} score={quizScore}/>}
    {tab==="create" && <Create id={id} l={l} done={projectDone} setDone={setProjectDone} complete={()=>completeLesson(id,100,50)}/>}
   </div>
   <div className="lesson-footer"><span>{isCompleted?<><CheckCircle2 size={18}/> Lesson completed</>:<>Complete the quiz to record your progress.</>}</span>
   <div>{id>1&&<button className="secondary small" onClick={()=>openLesson(id-1)}>Previous</button>} {id<11&&<button className="primary small" onClick={()=>openLesson(id+1)}>Next lesson <ArrowRight size={16}/></button>}</div></div>
 </main>
}

function Learn({d}){return <div className="learn-grid"><section className="content-card"><span className="eyebrow">LEARNING OBJECTIVES</span><h2>By the end of this lesson, you can…</h2><ul className="objectives">{d.objectives.map(x=><li key={x}><CheckCircle2 size={18}/>{x}</li>)}</ul></section><section className="content-card"><span className="eyebrow">KEY IDEAS</span><h2>Let's learn</h2>{d.learn.map((x,i)=><p className="learn-p" key={i}>{x}</p>)}</section><section className="content-card vocab"><span className="eyebrow">VOCABULARY</span><div>{d.vocab.map(x=><span key={x}>{x}</span>)}</div></section></div>}

function VideoCard({title,lesson}){return <div className="video-card"><div className="video-screen"><div className="play-circle"><PlayCircle size={52}/></div><span>VIDEO STORYBOARD</span><b>{title}</b><small>2–4 minute instructional video • Ready for production</small></div><div className="video-notes"><span className="eyebrow">VIDEO PLAN</span><h2>{title}</h2><p>This MVP includes the storyboard area for the lesson video. Replace it later with your hosted video while keeping the same lesson flow.</p><ol><li>Hook with a simple real-world question.</li><li>Explain the key idea using visual examples.</li><li>Show the concept in action.</li><li>End with a quick learner challenge.</li></ol></div></div>}

function Activity({d,done,setDone}){
 const [selected,setSelected]=useState({});
 const items=d.activity.items;
 if(d.activity.type==="checklist") return <div className="activity-card"><span className="eyebrow">INTERACTIVE ACTIVITY</span><h2>{d.activity.title}</h2><p>{d.activity.instruction}</p><div className="check-list">{items.map((x,i)=><button key={x} className={selected[i]?"checked":""} onClick={()=>setSelected(s=>({...s,[i]:!s[i]}))}><span>{selected[i]?<CheckCircle2/>:<span className="empty-circle"/>}</span>{x}</button>)}</div><ActivityComplete count={Object.values(selected).filter(Boolean).length} total={items.length} done={done} setDone={setDone}/></div>;
 return <div className="activity-card"><span className="eyebrow">INTERACTIVE ACTIVITY</span><h2>{d.activity.title}</h2><p>{d.activity.instruction}</p><div className="activity-items">{items.map((item,i)=><div className="activity-item" key={i}><b>{item[0]}</b><div className="choices">{(d.activity.type==="match"?item[1]:["Input","Output","Storage","Processing","RAM","2D","3D","Motion graphics","Hardware","Software","Desktop","Mobile","Web","Both"]).slice(0,d.activity.type==="match"?item[1].length:14).map(choice=><button className={selected[i]===choice?"selected":""} onClick={()=>setSelected(s=>({...s,[i]:choice}))} key={choice}>{choice}</button>)}</div></div>)}</div><ActivityComplete count={Object.keys(selected).length} total={items.length} done={done} setDone={setDone} answers={items}/></div>
}

function ActivityComplete({count,total,done,setDone,answers}) {
 const correct=answers?answers.every((x,i)=>answers[i][1]===undefined || answers[i][1]===undefined || true):true;
 return <div className="activity-result"><div><strong>{count}/{total}</strong><span> completed</span></div><button className="primary small" disabled={count<total} onClick={()=>setDone(true)}>{done?"Completed ✓":"Complete activity"}</button></div>
}

function Challenge({l,d}){return <div className="challenge"><div className="challenge-banner"><Gamepad2 size={34}/><div><span className="eyebrow">MINI CHALLENGE</span><h2>{l.badge} Mission</h2></div><span className="xp-pill">+30 XP</span></div><p>Use what you learned to solve a quick challenge. The challenge can later be expanded into a timed game with sounds, levels and a leaderboard.</p><div className="challenge-box"><Sparkles size={22}/><b>{d.activity.instruction}</b><p>Try the interactive activity first, then challenge yourself to complete it faster or explain your choices to a teacher.</p></div></div>}

function Quiz({d,answers,setAnswers,quizDone,submitQuiz,score}){
 return <div className="quiz"><div className="quiz-head"><div><span className="eyebrow">KNOWLEDGE CHECK</span><h2>Quick Quiz</h2><p>{d.quiz.length} questions • Select the best answer.</p></div>{quizDone&&<div className="score-ring"><b>{score}%</b><small>score</small></div>}</div>
 {d.quiz.map((q,i)=><div className="question" key={i}><span>QUESTION {i+1}</span><h3>{q[0]}</h3><div className="option-grid">{q[1].map((o,j)=><button className={answers[i]!==undefined&&answers[i]===j?"selected":""} onClick={()=>!quizDone&&setAnswers(a=>({...a,[i]:j}))} key={o}>{String.fromCharCode(65+j)}. {o}</button>)}</div>{quizDone&&<p className={answers[i]===q[2]?"feedback good":"feedback bad"}>{answers[i]===q[2]?"✓ Correct! ":"✗ Not quite. "}{q[3]}</p>}</div>)}
 {!quizDone?<button className="primary" disabled={Object.keys(answers).length<d.quiz.length} onClick={submitQuiz}>Submit quiz <CheckCircle2 size={18}/></button>:<button className="secondary" onClick={()=>{setAnswers({});location.reload()}}><RotateCcw size={17}/> Try again</button>}
 </div>
}

function Create({id,l,done,setDone,complete}){
 const project=id===4?"My 3D World":id===3?"Scratch Movement Challenge":id===1?"Animation Frame Challenge":"Digital Technology Practice";
 const instructions=id===4?["Choose a background.","Add one character.","Add one prop.","Arrange your scene.","Position the camera.","Create simple movement.","Save the project."]:["Complete the practical task using the lesson instructions.","Record or save your finished work.","Be ready to explain what you created."];
 return <div className="project-card"><div className="project-head"><div className="project-icon">💻</div><div><span className="eyebrow">CREATE</span><h2>{project}</h2><p>Make something with what you learned.</p></div></div><div className="project-body"><h3>Project checklist</h3>{instructions.map((x,i)=><div className="project-step" key={x}><span>{i+1}</span>{x}</div>)}<div className="project-note"><Target/> <div><b>How the MVP handles projects</b><p>For tools such as Alice 3, the platform records the learner's project completion. The actual Alice 3 project is created in Alice 3 and can later be uploaded for teacher review.</p></div></div><button className="primary" onClick={()=>{setDone(true);complete()}}>{done?"Project completed ✓":"Mark project complete"}</button></div></div>
}

function Badges({progress}){
 return <main className="container narrow"><div className="page-title"><span className="eyebrow">ACHIEVEMENTS</span><h1>Your Badge Collection</h1><p>Every completed lesson unlocks a new achievement.</p></div><div className="badge-grid">{lessons.map(l=>{const earned=progress.badges.includes(l.badge);return <div className={`badge-card ${earned?"earned":""}`} key={l.id}><div className="badge-art">{earned?"🏆":"🔒"}</div><b>{l.badge}</b><small>Lesson {l.id} • +{l.xp} XP</small><span>{earned?"Earned":"Locked"}</span></div>})}</div><div className="champion"><Trophy size={40}/><div><span className="eyebrow">FINAL BADGE</span><h2>Digital Technology Champion</h2><p>Complete all 11 lessons and the final challenge.</p></div></div></main>
}

function Teacher({progress,overall}){
 return <main className="container"><div className="page-title"><span className="eyebrow">TEACHER DASHBOARD</span><h1>Year 4 Class Overview</h1><p>MVP analytics preview — ready to connect to real learner accounts and a database.</p></div><div className="stats-grid"><Stat icon="👩‍🎓" value="24" label="Learners"/><Stat icon="📈" value={`${overall}%`} label="Class progress"/><Stat icon="📝" value={Object.values(progress.scores).length?`${Math.round(Object.values(progress.scores).reduce((a,b)=>a+b,0)/Object.values(progress.scores).length)}%`:"—"} label="Recorded quiz average"/><Stat icon="🏆" value={progress.badges.length} label="Badges earned"/></div><div className="dashboard-panels"><section className="content-card"><span className="eyebrow">TOPIC PERFORMANCE</span>{Object.entries(topicMeta).map(([name,m])=>{const pct=Math.round(m.lessons.filter(id=>progress.completed.includes(id)).length/m.lessons.length*100);return <div className="metric" key={name}><div><b>{m.emoji} {name}</b><span>{pct}%</span></div><div className="bar"><i style={{width:`${pct}%`}}/></div></div>})}</section><section className="content-card"><span className="eyebrow">LEARNER VIEW</span><h2>Demo Learner</h2><p>Progress is stored locally in this MVP. When authentication is connected, this panel can show individual learners, weak areas, quiz performance and project submissions.</p><div className="learner-demo"><span>Progress</span><b>{overall}%</b><span>Badges</span><b>{progress.badges.length}/11</b><span>XP</span><b>{progress.xp}</b></div></section></div></main>
}

function Parent({progress,overall}){return <main className="container narrow"><div className="page-title"><span className="eyebrow">PARENT / GUARDIAN VIEW</span><h1>Learning Progress</h1><p>Read-only progress area planned for the next phase.</p></div><div className="parent-card"><GraduationCap size={42}/><h2>Year 4 ICT</h2><div className="big-progress">{overall}%</div><p>{progress.completed.length} of 11 lessons completed</p><div className="bar"><i style={{width:`${overall}%`}}/></div><div className="parent-grid"><div><b>{progress.xp}</b><span>XP earned</span></div><div><b>{progress.badges.length}</b><span>Badges</span></div><div><b>{progress.streak}</b><span>Day streak</span></div></div></div></main>}

createRoot(document.getElementById("root")).render(<App/>);
