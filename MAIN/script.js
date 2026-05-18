<script>
  // Custom cursor
  const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  (function tick(){cur.style.left=mx+'px';cur.style.top=my+'px';rx+=(mx-rx)*.13;ry+=(my-ry)*.13;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(tick);})();
  document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ring.style.width='50px';ring.style.height='50px';ring.style.borderColor='rgba(196,149,106,.6)';});
    el.addEventListener('mouseleave',()=>{ring.style.width='32px';ring.style.height='32px';ring.style.borderColor='rgba(196,149,106,.5)';});
  });
 
  // Scroll reveal + skill bar animation
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      e.target.classList.add('visible');
      e.target.querySelectorAll('.skill-fill').forEach((bar,i)=>{
        const w=bar.getAttribute('data-w')||'0.8';
        setTimeout(()=>{bar.style.transform=`scaleX(${w})`;bar.classList.add('animate');},200+i*80);
      });
      io.unobserve(e.target);
    });
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(r=>io.observe(r));
 
  // Floating seeds
  const sc=document.getElementById('seedsContainer');
  for(let i=0;i<22;i++){
    const s=document.createElement('div');s.className='seed';
    s.style.cssText=`left:${Math.random()*100}%;--twist:${(Math.random()-.5)*200}deg;animation-duration:${9+Math.random()*14}s;animation-delay:${Math.random()*16}s;width:${1.5+Math.random()*2}px;height:${1.5+Math.random()*2}px;`;
    sc.appendChild(s);
  }
 
  // Theme toggle
  const toggleBtn=document.getElementById('themeToggle');
  const toggleLabel=document.getElementById('toggleLabel');
  const html=document.documentElement;
  // Load saved preference
  if(localStorage.getItem('dmc-theme')==='light'){html.classList.add('light');toggleLabel.textContent='Light';}
  toggleBtn.addEventListener('click',()=>{
    const isLight=html.classList.toggle('light');
    toggleLabel.textContent=isLight?'Light':'Dark';
    localStorage.setItem('dmc-theme',isLight?'light':'dark');
  });
  
// Active nav highlight
  const secs=document.querySelectorAll('section[id]'),nls=document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',()=>{
    let cur='';secs.forEach(s=>{if(window.scrollY>=s.offsetTop-220)cur=s.id;});
    nls.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
  });
  </script>