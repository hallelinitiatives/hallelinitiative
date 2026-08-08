(() => {
const $=(s)=>document.querySelector(s), $$=(s)=>document.querySelectorAll(s);
const menu=$(".menu"), nav=$("#nav-menu"), header=$(".header"), back=$(".back-top");
function closeMenu(){nav?.classList.remove("open");menu?.setAttribute("aria-expanded","false");}
menu?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open);});
$$(".nav-link").forEach(a=>a.addEventListener("click",closeMenu));
window.addEventListener("scroll",()=>back?.classList.toggle("show",scrollY>500),{passive:true});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(x=>io.observe(x));

const counterIO=new IntersectionObserver(es=>es.forEach(e=>{
if(!e.isIntersecting)return; const el=e.target,target=+el.dataset.target||0,start=performance.now();
function tick(now){const p=Math.min((now-start)/1100,1);el.textContent=Math.floor(target*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(tick)}
requestAnimationFrame(tick);counterIO.unobserve(el);
}),{threshold:.6});
$$("[data-target]").forEach(x=>counterIO.observe(x));

const lightbox=$("#lightbox"), lbImg=$("#lightbox-image"), lbCap=$("#lightbox-caption");
function closeLightbox(){lightbox?.classList.remove("open");lightbox?.setAttribute("aria-hidden","true");}
$$(".gallery-item").forEach(item=>{
const path=item.dataset.image,img=new Image();img.src=path;
img.onload=()=>{item.style.backgroundImage=`url("${path}")`;item.dataset.ready="1"};
item.addEventListener("click",()=>{
if(item.dataset.ready!=="1"){alert("Add this photo to assets/images to view it.");return}
lbImg.src=path;lbImg.alt=item.dataset.caption||"Gallery image";lbCap.textContent=item.dataset.caption||"";
lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");
});
});
$("#close-lightbox")?.addEventListener("click",closeLightbox);
lightbox?.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeMenu();closeLightbox()}});

const form=$("#volunteer-form"),status=$("#form-status");
form?.addEventListener("submit",e=>{
e.preventDefault();status.className="status";
if(!form.checkValidity()){status.textContent="Please complete all required fields.";status.classList.add("error");form.reportValidity();return}
status.textContent="Your application has been validated. Connect this form to a backend such as Formspree before collecting submissions.";status.classList.add("success");form.reset();
});
const news=$("#newsletter-form"),newsStatus=$("#newsletter-status");
news?.addEventListener("submit",e=>{
e.preventDefault();newsStatus.className="status";
if(!news.checkValidity()){newsStatus.textContent="Please enter a valid email address.";newsStatus.classList.add("error");news.reportValidity();return}
newsStatus.textContent="Thank you. Connect this form to an email service to store subscribers.";newsStatus.classList.add("success");news.reset();
});
})();