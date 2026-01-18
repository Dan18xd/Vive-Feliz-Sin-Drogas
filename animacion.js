/* ===============================
   ELEMENTOS BASE
================================ */
const toggleBtn = document.querySelector('.toggle-menu');
const sidebar   = document.querySelector('.sidebar');
const banner    = document.getElementById('banner');
const iframe    = document.getElementById('main-iframe');
const links     = document.querySelectorAll('a[target="contentFrame"]');

/* ===============================
   OVERLAY (NO TOCA EL MENÚ)
================================ */
const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

/* ===============================
   TOGGLE MENÚ (MISMA LÓGICA)
================================ */
function toggleMenu(){
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

toggleBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

/* ===============================
   LINKS (SIN AFECTAR HOVER)
================================ */
links.forEach(link => {
    link.addEventListener('click', () => {

        /* Animación iframe */
        iframe.style.opacity = "0";
        iframe.style.transform = "translateY(20px) scale(.98)";

        setTimeout(() => {
            iframe.style.opacity = "1";
            iframe.style.transform = "translateY(0) scale(1)";
        }, 300);

        /* Banner SOLO en inicio */
        if (link.id === "link-inicio") {
            banner.style.display = "flex";
            banner.classList.remove('banner-out');
            banner.classList.add('banner-in');
        } else {
            banner.classList.remove('banner-in');
            banner.classList.add('banner-out');
            setTimeout(() => {
                banner.style.display = "none";
            }, 400);
        }

        /* Cerrar menú solo en móvil */
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

/* ===============================
   CSS DINÁMICO (NO TOCA COLORES)
================================ */
const style = document.createElement('style');
style.innerHTML = `
.menu-overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.6);
    opacity:0;
    pointer-events:none;
    transition:.3s;
    z-index:90;
}
.menu-overlay.active{
    opacity:1;
    pointer-events:auto;
}

/* NO se toca hover del menú */
.sidebar{
    z-index:100;
}

/* Banner */
.banner-in{
    animation:bannerFadeIn .6s ease forwards;
}
.banner-out{
    animation:bannerFadeOut .4s ease forwards;
}

@keyframes bannerFadeIn{
    from{opacity:0; transform:translateY(-20px) scale(.95);}
    to{opacity:1; transform:translateY(0) scale(1);}
}
@keyframes bannerFadeOut{
    from{opacity:1; transform:translateY(0) scale(1);}
    to{opacity:0; transform:translateY(-20px) scale(.95);}
}
`;
document.head.appendChild(style);

/* ===============================
   SEGURIDAD AL REDIMENSIONAR
================================ */
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
});
