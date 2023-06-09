// --------------------------------------------------------------------------

//  Mobile Menu

const btnMobile = document.querySelector('#btnMobile');

let btnMobileChanged = false;
const toggleMobile = () => {
    document.querySelector('header .regions').classList.toggle('mobile');
    btnMobileChanged = !btnMobileChanged;
    if(btnMobileChanged) {
        btnMobile.innerHTML = "<i class='bx bx-x'></i>";
        document.body.style.overflow = 'hidden';
    } else {
        btnMobile.innerHTML = "<i class='bx bx-menu'></i>";
        document.body.style.overflow = 'auto';
    }
}
const closeMobile = () => {
    document.querySelector('header .regions').classList.remove('mobile');
    btnMobileChanged = false;
    document.body.style.overflow = 'auto';
    btnMobile.innerHTML = "<i class='bx bx-menu'></i>";
}

export { toggleMobile, closeMobile }

// --------------------------------------------------------------------------

// Scroll to Top

const btnScroll = document.querySelector('#btnScroll');

const verifyTop = () => {
    if(window.scrollY > 20) {
        btnScroll.style.display = 'block';
    } else {
        btnScroll.style.display = 'none';
    }
}
const scrollTop = () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
}

export { verifyTop, scrollTop }

// -------------------------------------------------------------------------- 